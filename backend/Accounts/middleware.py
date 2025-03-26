import time
import logging
from django.db import OperationalError
from django.db.transaction import atomic
from functools import wraps

logger = logging.getLogger(__name__)

def retry_on_db_lock(max_retries=3, delay=0.1):
    """
    Decorador para reintentar operaciones cuando la base de datos está bloqueada.
    
    Args:
        max_retries (int): Número máximo de reintentos
        delay (float): Tiempo de espera entre reintentos en segundos
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(*args, **kwargs):
            retries = 0
            while True:
                try:
                    with atomic():
                        return view_func(*args, **kwargs)
                except OperationalError as e:
                    if "database is locked" not in str(e).lower() or retries >= max_retries:
                        logger.error(f"Error de base de datos después de {retries} intentos: {e}")
                        raise
                    
                    retries += 1
                    logger.warning(f"Base de datos bloqueada, reintento {retries}/{max_retries}")
                    time.sleep(delay * (2 ** (retries - 1)))  # Backoff exponencial
        return wrapper
    return decorator

class DatabaseRetryMiddleware:
    """
    Middleware para manejar automáticamente los reintentos cuando la base de datos está bloqueada.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
        
    def __call__(self, request):
        @retry_on_db_lock()
        def get_response_with_retry():
            return self.get_response(request)
            
        return get_response_with_retry() 