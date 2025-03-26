import os
import subprocess
import sys
from pathlib import Path


def run_servers():
    # Get the path of the current directory and required directories
    current_dir = Path(__file__).parent
    frontend_dir = current_dir / "frontend"  # Frontend directory
    django_dir = current_dir / "backend"  # Directory where manage.py is located

    try:
        # Check if we are in a Python virtual environment
        if hasattr(sys, "real_prefix") or (
            hasattr(sys, "base_prefix") and sys.base_prefix != sys.prefix
        ):
            python_cmd = "python"
        else:
            python_cmd = "py"

        # Command for the Django server
        django_cmd = f"{python_cmd} manage.py runserver"

        # Command for the React development server
        npm_cmd = "npm start"

        print("Starting Django server...")
        # Create the process for Django
        django_process = subprocess.Popen(
            django_cmd,
            shell=True,
            cwd=str(django_dir),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            bufsize=1,
        )

        print("Starting React and Tailwind server...")
        # Create the process for npm
        npm_process = subprocess.Popen(
            npm_cmd,
            shell=True,
            cwd=str(frontend_dir),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            universal_newlines=True,
            bufsize=1,
        )

        # Function to print the output of processes
        def print_output(process, prefix):
            while True:
                line = process.stdout.readline()
                if not line and process.poll() is not None:
                    break
                if line:
                    print(f"{prefix}: {line.strip()}")

        # Print output from both processes in real time
        from threading import Thread

        django_thread = Thread(target=print_output, args=(django_process, "Django"))
        npm_thread = Thread(target=print_output, args=(npm_process, "React"))

        django_thread.daemon = True
        npm_thread.daemon = True

        django_thread.start()
        npm_thread.start()

        # Wait for both processes to finish
        django_process.wait()
        npm_process.wait()

    except KeyboardInterrupt:
        print("\nStopping servers...")
        try:
            django_process.terminate()
            npm_process.terminate()
        except:
            pass
        sys.exit(0)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    print("Starting development servers...")
    print("Django will run on http://localhost:8000")
    print("React will run on http://localhost:3000")
    print("Press Ctrl+C to stop both servers")
    run_servers()
