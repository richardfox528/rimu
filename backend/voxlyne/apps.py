import sys
import subprocess
import os
import time
import threading
import signal
import atexit
import getpass
from django.apps import AppConfig
from django.conf import settings

# Try to import colorama for colored terminal output
try:
    from colorama import init, Fore, Style
    # Initialize colorama
    init()
    HAS_COLORAMA = True
except ImportError:
    # Define dummy color variables if colorama is not available
    class DummyFore:
        def __getattr__(self, name):
            return ""
    class DummyStyle:
        def __getattr__(self, name):
            return ""
    Fore = DummyFore()
    Style = DummyStyle()
    HAS_COLORAMA = False


class VoxlyneConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'voxlyne'
    wsl_process = None
    # Add a flag to track if we've already run the initialization
    _initialization_complete = False
    
    def _is_docker(self):
        """Check if running inside a Docker container."""
        # Check for .dockerenv file
        if os.path.exists('/.dockerenv'):
            return True
        
        # Check docker in cgroup
        try:
            with open('/proc/self/cgroup', 'r') as f:
                return 'docker' in f.read()
        except:
            pass
            
        return False
    
    def _keep_wsl_alive(self):
        """Start a long-running WSL process to keep it alive while Django runs."""
        try:
            # Start WSL with a long-running command (sleep for a long time)
            # This will keep WSL running in the background until Django closes
            cmd = ["wsl", "bash", "-c", "echo 'WSL activated and will remain running'; sleep 999999"]
            
            # Run in background without capturing output
            startupinfo = None
            if os.name == 'nt':
                startupinfo = subprocess.STARTUPINFO()
                startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
                startupinfo.wShowWindow = 0  # SW_HIDE
                
            self.wsl_process = subprocess.Popen(
                cmd,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                stdin=subprocess.DEVNULL,
                startupinfo=startupinfo,
                creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if os.name == 'nt' else 0
            )
            
            # Don't use signals in threads to avoid the "signal only works in main thread" error
            print(f"{Fore.GREEN}--- WSL started and will remain running in background ---{Style.RESET_ALL}")
            return True
        except Exception as e:
            print(f"{Fore.RED}--- ERROR starting WSL: {e} ---{Style.RESET_ALL}")
            return False
    
    def _kill_wsl_process(self):
        """Kill the WSL process to ensure clean shutdown."""
        if self.wsl_process is not None:
            try:
                # On Windows, we need to terminate the process directly
                if os.name == 'nt':
                    self.wsl_process.terminate()
                else:
                    # On Unix, kill the process group
                    os.killpg(os.getpgid(self.wsl_process.pid), signal.SIGTERM)
                
                # Wait a moment for clean shutdown
                self.wsl_process.wait(timeout=2)
                print(f"{Fore.GREEN}--- WSL background process terminated cleanly ---{Style.RESET_ALL}")
            except Exception as e:
                # If it's still running, force kill it
                try:
                    self.wsl_process.kill()
                    print(f"{Fore.YELLOW}--- WSL background process force killed ---{Style.RESET_ALL}")
                except:
                    print(f"{Fore.RED}--- WARNING: Could not terminate WSL process: {e} ---{Style.RESET_ALL}")
    
    def _signal_handler(self, signum, frame):
        """Handle signals to properly cleanup WSL on Django shutdown."""
        print(f"\n{Fore.YELLOW}--- Received Ctrl+C, shutting down WSL and Django ---{Style.RESET_ALL}")
        self._kill_wsl_process()
        
        # Re-raise the signal to let Django's default handler take over
        # We need to restore the default handler first to avoid recursion
        signal.signal(signum, signal.SIG_DFL)
        os.kill(os.getpid(), signum)
    
    def _start_wsl_in_background(self):
        """Start WSL in a background thread to keep it running."""
        print(f"{Fore.CYAN}--- Starting WSL in background ---{Style.RESET_ALL}")
        try:
            # Main thread approach instead of a separate thread to avoid signal issues
            self._keep_wsl_alive()
            return True
        except Exception as e:
            print(f"{Fore.RED}--- ERROR starting WSL: {e} ---{Style.RESET_ALL}")
            return False

    def _check_redis_status_wsl(self):
        """Check if Redis is running in WSL."""
        print(f"{Fore.CYAN}--- Checking Redis status in WSL ---{Style.RESET_ALL}")
        try:
            process = subprocess.run(
                ["wsl", "service", "redis-server", "status"],
                stdout=subprocess.PIPE,
                stderr=subprocess.DEVNULL,
                encoding='utf-8',
                errors='replace',  # Replace invalid characters
                check=False,
                timeout=5
            )
            
            # Check if Redis is running
            if process.returncode == 0 and "active (running)" in process.stdout:
                print(f"{Fore.GREEN}--- Redis is running in WSL ---{Style.RESET_ALL}")
                return True
            else:
                print(f"{Fore.YELLOW}--- Redis is not running in WSL ---{Style.RESET_ALL}")
                return False
        except Exception as e:
            print(f"{Fore.RED}--- ERROR checking Redis status: {e} ---{Style.RESET_ALL}")
            return False
    
    def _check_redis_status_docker(self):
        """Check if Redis is running in Docker environment."""
        print(f"{Fore.CYAN}--- Checking Redis status in Docker ---{Style.RESET_ALL}")
        try:
            # In Docker, we can connect directly to Redis
            # Just check if the Redis port is open using netcat
            process = subprocess.run(
                ["nc", "-z", "redis", "6379"], 
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
                timeout=3
            )
            
            if process.returncode == 0:
                print(f"{Fore.GREEN}--- Redis is available in Docker ---{Style.RESET_ALL}")
                return True
            else:
                print(f"{Fore.YELLOW}--- Redis service is not available in Docker ---{Style.RESET_ALL}")
                return False
        except FileNotFoundError:
            # If netcat is not available, try using Python to check port
            try:
                import socket
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.settimeout(1)
                result = s.connect_ex(('redis', 6379))
                s.close()
                if result == 0:
                    print(f"{Fore.GREEN}--- Redis is available in Docker ---{Style.RESET_ALL}")
                    return True
                else:
                    print(f"{Fore.YELLOW}--- Redis service is not available in Docker ---{Style.RESET_ALL}")
                    return False
            except Exception as e:
                print(f"{Fore.RED}--- ERROR checking Redis in Docker: {e} ---{Style.RESET_ALL}")
                return False
        except Exception as e:
            print(f"{Fore.RED}--- ERROR checking Redis in Docker: {e} ---{Style.RESET_ALL}")
            return False

    def _start_redis_with_sudo(self):
        """Attempt to start Redis server with sudo in WSL, prompting for password."""
        print("\n")
        print("=" * 80)
        print(f"{Fore.YELLOW}  Redis server is not running in WSL.{Style.RESET_ALL}")
        print(f"{Fore.CYAN}  Attempting to start Redis server automatically...{Style.RESET_ALL}")
        print("=" * 80)
        
        try:
            # Prompt for sudo password with color
            print(f"\n{Fore.CYAN}Please enter your WSL sudo password to start Redis:{Style.RESET_ALL} ", end='', flush=True)
            
            # Use getpass to securely get password without echoing to screen
            password = getpass.getpass("")
            
            # Use echo to pipe the password to sudo
            # The -S flag tells sudo to read the password from stdin
            command = f"echo '{password}' | sudo -S service redis-server start"
            
            # Run the command in WSL
            process = subprocess.run(
                ["wsl", "bash", "-c", command],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                encoding='utf-8',
                errors='replace',
                check=False,
                timeout=10
            )
            
            # Clear the password from memory as soon as possible
            password = None
            
            # Check if it worked
            if process.returncode == 0:
                print(f"{Fore.GREEN}--- Redis server started successfully ---{Style.RESET_ALL}")
                
                # Verify Redis is now running
                time.sleep(2)  # Give it a moment to start up
                verify_process = subprocess.run(
                    ["wsl", "service", "redis-server", "status"],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.DEVNULL,
                    encoding='utf-8',
                    errors='replace',
                    check=False,
                    timeout=5
                )
                
                if "active (running)" in verify_process.stdout:
                    print(f"{Fore.GREEN}--- Redis server confirmed running ---{Style.RESET_ALL}")
                    return True
                else:
                    print(f"{Fore.YELLOW}--- Redis server may have started, but status check failed ---{Style.RESET_ALL}")
                    print(f"{Fore.YELLOW}--- Please verify Redis manually ---{Style.RESET_ALL}")
                    return False
            else:
                # Failed to start Redis
                print(f"{Fore.RED}--- Failed to start Redis server ---{Style.RESET_ALL}")
                if process.stderr:
                    print(f"{Fore.RED}Error: {process.stderr}{Style.RESET_ALL}")
                return False
                
        except Exception as e:
            print(f"{Fore.RED}--- ERROR starting Redis with sudo: {e} ---{Style.RESET_ALL}")
            return False

    def _prompt_start_redis_wsl(self):
        """Inform user they need to start Redis with sudo in WSL."""
        print("\n")
        print("=" * 80)
        print(f"{Fore.YELLOW}  Redis server is not running in WSL.{Style.RESET_ALL}")
        print(f"{Fore.CYAN}  To start Redis, please open a WSL terminal and run:{Style.RESET_ALL}")
        print(f"{Fore.WHITE}  sudo service redis-server start{Style.RESET_ALL}")
        print("=" * 80)
        print("\n")
        
        # Give user a chance to start Redis manually
        print(f"{Fore.CYAN}--- Django server will start in 3 seconds ---{Style.RESET_ALL}")
        print(f"{Fore.CYAN}--- You can press Ctrl+C to cancel and start Redis first ---{Style.RESET_ALL}")
        time.sleep(3)
        return False
    
    def _prompt_start_redis_docker(self):
        """Inform user about Redis not being available in Docker."""
        print("\n")
        print("=" * 80)
        print(f"{Fore.YELLOW}  Redis service is not available in Docker.{Style.RESET_ALL}")
        print(f"{Fore.CYAN}  Make sure you have Redis service defined in your docker-compose.yml:{Style.RESET_ALL}")
        print("  ")
        print(f"{Fore.WHITE}  redis:{Style.RESET_ALL}")
        print(f"{Fore.WHITE}    image: redis:latest{Style.RESET_ALL}")
        print(f"{Fore.WHITE}    ports:{Style.RESET_ALL}")
        print(f"{Fore.WHITE}      - 6379:6379{Style.RESET_ALL}")
        print("=" * 80)
        print("\n")
        
        # Give user a chance to fix the issue
        print(f"{Fore.CYAN}--- Django server will start in 3 seconds ---{Style.RESET_ALL}")
        print(f"{Fore.CYAN}--- You can press Ctrl+C to cancel and fix Redis first ---{Style.RESET_ALL}")
        time.sleep(3)
        return False

    def ready(self):
        """Called when Django apps are ready."""
        # Only run this once to prevent duplicate messages
        if hasattr(VoxlyneConfig, '_initialization_complete') and VoxlyneConfig._initialization_complete:
            return
            
        is_runserver = 'runserver' in sys.argv
        if not is_runserver or not settings.DEBUG:
            VoxlyneConfig._initialization_complete = True
            return

        # Register process cleanup at exit to ensure WSL process is terminated
        atexit.register(self._kill_wsl_process)

        # Install signal handlers in the main thread
        for sig in [signal.SIGINT, signal.SIGTERM]:
            try:
                # Only register in main thread
                if threading.current_thread() is threading.main_thread():
                    signal.signal(sig, self._signal_handler)
            except Exception:
                pass
            
        print("\n")
        print("=" * 80)
        print(f"{Fore.CYAN}  INITIALIZING ENVIRONMENT FOR DJANGO SERVER{Style.RESET_ALL}")
        print("=" * 80)
            
        # Check if we're running in Docker
        in_docker = self._is_docker()
            
        if in_docker:
            print(f"{Fore.CYAN}--- Running in Docker environment ---{Style.RESET_ALL}")
            # Check Redis status directly in Docker
            redis_running = self._check_redis_status_docker()
            if not redis_running:
                self._prompt_start_redis_docker()
        else:
            print(f"{Fore.CYAN}--- Running in WSL environment ---{Style.RESET_ALL}")
            # Start WSL in background to keep it running while Django is active
            wsl_started = self._start_wsl_in_background()
            if not wsl_started:
                print(f"{Fore.RED}--- WARNING: WSL not available. Redis may not work. ---{Style.RESET_ALL}")
                
            # Check Redis status in WSL
            redis_running = self._check_redis_status_wsl()
            if not redis_running:
                # Try to start Redis automatically with sudo
                print(f"{Fore.YELLOW}--- Attempting to start Redis automatically ---{Style.RESET_ALL}")
                redis_started = self._start_redis_with_sudo()
                
                # If automatic start failed, show manual instructions
                if not redis_started:
                    self._prompt_start_redis_wsl()
            
        print("=" * 80)
        print(f"{Fore.GREEN}  DJANGO SERVER READY{Style.RESET_ALL}")
        print("=" * 80)
        print("\n")
        
        # Mark initialization as complete to prevent duplicate messages
        VoxlyneConfig._initialization_complete = True 