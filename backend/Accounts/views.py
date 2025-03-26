from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view, permission_classes, schema
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.schemas import AutoSchema
from .models import User
from .serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import jwt
from datetime import datetime, timedelta
import random
import string
from django.urls import reverse
import sys
import os
import json
import re
from django.core.cache import cache
from django.utils import timezone
import logging
import requests
import pytz
from .middleware import retry_on_db_lock

# Configurar el logger
logger = logging.getLogger(__name__)

# Rate limiting constants
MAX_VERIFICATION_ATTEMPTS = 5
VERIFICATION_TIMEOUT = 300  # 5 minutes in seconds
VERIFICATION_BLOCK_TIME = 3600  # 1 hour in seconds

# Cache constants
VERIFICATION_CACHE_TIMEOUT = 300  # 5 minutes
VERIFICATION_RESULT_CACHE_TIMEOUT = 3600  # 1 hour

# Intentar obtener la plantilla EmailVerificationTemplate desde el archivo
try:
    # Construir la ruta al archivo de la plantilla
    frontend_template_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
        "frontend",
        "src",
        "templates",
        "EmailVerification.js",
    )

    print(f"Buscando plantilla en: {frontend_template_path}")

    # Leer el contenido del archivo
    if os.path.exists(frontend_template_path):
        with open(frontend_template_path, "r", encoding="utf-8") as file:
            content = file.read()
            print(f"Contenido del archivo leído, tamaño: {len(content)} bytes")

            # Imprimir parte del contenido para depuración
            print(f"Primeros 200 caracteres: {content[:200]}")

            # Buscar la cadena exacta
            start_marker = "export const EmailVerificationTemplate = `"
            end_marker = "`;}"

            start_index = content.find(start_marker)
            if start_index >= 0:
                start_index += len(start_marker)
                end_index = content.find("`;", start_index)

                if end_index >= 0:
                    # Extraer la plantilla directamente
                    EMAIL_VERIFICATION_TEMPLATE = content[start_index:end_index]
                    print(
                        f"Plantilla extraída, tamaño: {len(EMAIL_VERIFICATION_TEMPLATE)} bytes"
                    )
                    print(
                        f"Primeros 100 caracteres de la plantilla: {EMAIL_VERIFICATION_TEMPLATE[:100]}"
                    )
                else:
                    EMAIL_VERIFICATION_TEMPLATE = None
                    print("No se encontró el marcador final de la plantilla")
            else:
                EMAIL_VERIFICATION_TEMPLATE = None
                print("No se encontró el marcador inicial de la plantilla")
    else:
        EMAIL_VERIFICATION_TEMPLATE = None
        print(f"El archivo de plantilla no existe: {frontend_template_path}")
except Exception as e:
    EMAIL_VERIFICATION_TEMPLATE = None
    print(f"Error al cargar la plantilla: {e}")
    import traceback

    traceback.print_exc()

# Si no se puede cargar la plantilla desde el archivo, usar esta plantilla estática
if EMAIL_VERIFICATION_TEMPLATE is None:
    EMAIL_VERIFICATION_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .button { display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }
    .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Email Verification</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for registering with VoxLyne. To verify your email address, please click the button below:</p>
    <p style="text-align: center;">
      <a href="{{verification_link}}" class="button" style="color: white;">Verify Email</a>
    </p>
    <p>Alternatively, you can use this verification code: <strong>{{verification_code}}</strong></p>
    <p>If you did not create an account, you can safely ignore this email.</p>
    <p>Best regards,<br>The VoxLyne Team</p>
  </div>
  <div class="footer">
    <p>This is an automatic email, please do not reply to this message.</p>
  </div>
</body>
</html>
"""
    print("Usando plantilla estática de respaldo")

User = get_user_model()


# Create your views here.
def send_verification_email(user, frontend_url=None, email_template=None):
    """Send verification email to user."""
    verification_code = user.email_verification_token

    print(f"Enviando email de verificación a: {user.email}")
    print(f"Código de verificación: {verification_code}")
    print(f"Frontend URL: {frontend_url}")
    print(f"¿Se proporcionó plantilla personalizada? {email_template is not None}")
    print(
        f"¿Existe plantilla de EmailVerification.js? {EMAIL_VERIFICATION_TEMPLATE is not None}"
    )

    # Prioritize frontend_url if available
    if frontend_url:
        # URL for the frontend - ONLY frontend routes, never mix with /api/
        # Include the user ID and email in the URL for more robust verification
        verification_link = f"{frontend_url}/auth/email-verification?token={verification_code}&uid={user.id}&user_id={user.id}&email={user.email}"
    else:
        # If there is no frontend_url, use default frontend URL
        # Include the user ID and email in the URL for more robust verification
        verification_link = f"http://localhost:3000/auth/email-verification?token={verification_code}&user_id={user.id}&email={user.email}"

    print(f"Enlace de verificación generado: {verification_link}")

    context = {
        "verification_code": verification_code,
        "verification_link": verification_link,
        "user_email": user.email,
        "user_id": user.id,
    }

    # Si se proporcionó una plantilla personalizada, úsala primero
    if email_template:
        print("Usando plantilla personalizada proporcionada en la solicitud")
        html_message = (
            email_template.replace("{{verification_link}}", verification_link)
            .replace("{{verification_code}}", verification_code)
            .replace("{{user_email}}", user.email)
            .replace("{{user_id}}", str(user.id))
        )
    # Si tenemos la plantilla importada de EmailVerification.js, úsala
    elif EMAIL_VERIFICATION_TEMPLATE:
        print("Usando plantilla de EmailVerification.js")
        html_message = (
            EMAIL_VERIFICATION_TEMPLATE.replace(
                "{{verification_link}}", verification_link
            )
            .replace("{{verification_code}}", verification_code)
            .replace("{{user_email}}", user.email)
            .replace("{{user_id}}", str(user.id))
        )
        print(
            f"Primeros 200 caracteres del mensaje HTML generado: {html_message[:200]}"
        )
    else:
        print("Usando plantilla predeterminada")
        # Usar directamente esta plantilla incorporada
        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
            .content {{ padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }}
            .button {{ display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }}
            .footer {{ margin-top: 20px; font-size: 12px; color: #777; text-align: center; }}
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for registering with VoxLyne. To verify your email address, please click the button below:</p>
            <p style="text-align: center;">
              <a href="{verification_link}" class="button" style="color: white;">Verify Email</a>
            </p>
            <p>Alternatively, you can use this verification code: <strong>{verification_code}</strong></p>
            <p>If you did not create an account, you can safely ignore this email.</p>
            <p>Best regards,<br>The VoxLyne Team</p>
          </div>
          <div class="footer">
            <p>This is an automatic email, please do not reply to this message.</p>
          </div>
        </body>
        </html>
        """

    plain_message = strip_tags(html_message)

    print(f"Sending email with link: {verification_link}")
    print(f"Verification token: {verification_code}")
    print(f"User ID: {user.id}")
    print(f"User Email: {user.email}")

    send_mail(
        subject="Email Verification - VoxLyne",
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
        fail_silently=False,
    )


def generate_verification_code():
    """Generate a verification code."""
    try:
        # Generar un código de 6 dígitos
        code = ''.join(random.choices('0123456789', k=6))
        # Asegurar que sea string y esté limpio
        code = str(code).strip()
        
        logger.info(f"Generando código de verificación:")
        logger.info(f"  - Código generado: '{code}'")
        logger.info(f"  - Tipo: {type(code)}")
        logger.info(f"  - Longitud: {len(code)}")
        logger.info(f"  - Bytes: {[ord(c) for c in code]}")
        
        # Verificar que el código sea válido
        if not code or len(code) != 6 or not code.isdigit():
            logger.error("Código generado inválido, generando uno nuevo")
            # Generar un código de respaldo garantizado
            backup_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
            logger.info(f"  - Código de respaldo: '{backup_code}'")
            return backup_code
            
        return code
    except Exception as e:
        logger.error(f"Error generando código de verificación: {str(e)}")
        # En caso de error, generar un código simple pero válido
        backup_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        logger.info(f"  - Código de respaldo por error: '{backup_code}'")
        return backup_code


class UserListCreateView(generics.ListCreateAPIView):
    """API view for listing and creating user accounts."""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow registration without authentication

    def post(self, request, *args, **kwargs):
        """Create a new user."""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate verification code
            verification_code = generate_verification_code()
            user.email_verification_token = verification_code
            user.email_verification_token_created_at = datetime.now()
            user.save()

            # Send verification email
            send_verification_email(user)

            return Response(
                {
                    "detail": "User registered successfully. Please check your email to verify your account.",
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        """
        Ensure that registration is available without authentication.
        """
        if self.request.method == "POST":
            return [AllowAny()]
        return super().get_permissions()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API view for retrieving, updating, and deleting individual user accounts.

    retrieve:
    Returns the details of a specific user.

    update:
    Updates a user's data (requires authentication).

    destroy:
    Deletes a user (requires authentication).
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Allow GET without authentication, but require authentication for PUT, PATCH, and DELETE.
        """
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


class DashboardView(APIView):
    """
    get: Get dashboard information based on user type
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Get the personalized dashboard based on user type.

        Returns:
        - For companies (user_type=1): Company dashboard
        - For regular users (user_type=2): User dashboard
        """
        if request.user.user_type == 1:
            data = {
                "message": "Welcome to the company dashboard!",
                "user": UserSerializer(request.user).data,
            }
        else:
            data = {
                "message": "Welcome to the user dashboard!",
                "user": UserSerializer(request.user).data,
            }
        return Response(data)


@api_view(["POST"])
@permission_classes([AllowAny])
@schema(AutoSchema())
def login_view(request):
    """
    User login.

    Parameters:
    - username_or_email: username or email
    - password: password

    Returns:
    - token: access JWT token
    - refresh: refresh token
    - user: user data
    """
    username_or_email = request.data.get("username_or_email")
    password = request.data.get("password")

    if not username_or_email or not password:
        return Response(
            {"detail": "Please provide username/email and password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Try to authenticate first by username
    user = authenticate(username=username_or_email, password=password)

    # If it fails, try by email
    if user is None:
        try:
            user_obj = User.objects.get(email=username_or_email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

    if user is None:
        return Response(
            {"detail": "Invalid username/email or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # Check if email is verified
    if not user.is_email_verified:
        # Regenerate verification code and send email
        verification_code = generate_verification_code()
        user.email_verification_token = verification_code
        user.email_verification_token_created_at = datetime.now()
        user.save()

        # Send verification email
        send_verification_email(user)

        # Instead of returning an error, we return a specific status
        # that the frontend can use to redirect to the verification page
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
                "email_verified": False,
                "verification_required": True,
                "detail": "Please verify your email before accessing your account.",
            },
            status=status.HTTP_200_OK,
        )

    refresh = RefreshToken.for_user(user)
    return Response(
        {
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data,
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@schema(AutoSchema())
def logout_view(request):
    """
    User logout.

    Parameters:
    - refresh: refresh token to invalidate
    """
    try:
        refresh_token = request.data.get("refresh")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({"detail": "Successfully logged out."})
    except Exception:
        return Response(
            {"detail": "Error logging out."}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@schema(AutoSchema())
def verify_token(request):
    """
    Verify authentication token and get user data.
    """
    return Response(UserSerializer(request.user).data)


def check_rate_limit(email):
    """
    Check if the user has exceeded the rate limit for verification attempts.
    Returns (is_allowed, wait_time_seconds)
    """
    cache_key = f"email_verification_attempts_{email}"
    block_key = f"email_verification_blocked_{email}"
    
    # Check if user is blocked
    if cache.get(block_key):
        block_expires = cache.ttl(block_key)
        return False, block_expires
    
    # Get current attempts
    attempts = cache.get(cache_key, 0)
    
    if attempts >= MAX_VERIFICATION_ATTEMPTS:
        # Block user for 1 hour
        cache.set(block_key, True, VERIFICATION_BLOCK_TIME)
        cache.delete(cache_key)  # Reset attempts counter
        return False, VERIFICATION_BLOCK_TIME
    
    # Increment attempts
    cache.set(cache_key, attempts + 1, VERIFICATION_TIMEOUT)
    return True, 0


def cache_verification_result(user_id, success):
    """Cache the verification result for a user"""
    cache_key = f"email_verification_result_{user_id}"
    cache.set(cache_key, success, VERIFICATION_RESULT_CACHE_TIMEOUT)

def get_cached_verification_result(user_id):
    """Get cached verification result for a user"""
    cache_key = f"email_verification_result_{user_id}"
    return cache.get(cache_key)

def verify_recaptcha(token):
    """
    Verify reCAPTCHA token with Google's API
    """
    try:
        response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': settings.RECAPTCHA_PRIVATE_KEY,
                'response': token
            }
        )
        result = response.json()
        logger.info(f"reCAPTCHA verification result: {result}")
        return result.get('success', False)
    except Exception as e:
        logger.error(f"Error verifying reCAPTCHA: {e}")
        return False

@api_view(["GET"])
@permission_classes([AllowAny])
@retry_on_db_lock(max_retries=3, delay=0.2)
def verify_email_view(request):
    """Verify email with token."""
    try:
        # 1. Obtener y limpiar parámetros
        raw_token = request.GET.get("token")
        raw_email = request.GET.get("email")

        logger.info("=== Inicio de verificación de email ===")
        logger.info(f"Token recibido (raw): {raw_token}")
        logger.info(f"Email recibido (raw): {raw_email}")

        # 2. Validaciones básicas
        if not raw_token:
            return Response(
                {"error": "No se proporcionó el código de verificación."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not raw_email:
            return Response(
                {"error": "No se proporcionó el correo electrónico."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Limpiar los valores
        token = str(raw_token).strip()
        email = str(raw_email).strip()

        logger.info(f"Token limpio: '{token}'")
        logger.info(f"Email limpio: '{email}'")

        # 3. Buscar el usuario
        try:
            user = User.objects.get(email=email)
            logger.info(f"Usuario encontrado - ID: {user.id}")
            
            # Si el email ya está verificado, retornar éxito
            if user.is_email_verified:
                logger.info(f"Email ya verificado para usuario {user.id}")
                return Response({
                    "success": True,
                    "message": "Email ya verificado anteriormente.",
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "user_type": user.user_type
                    }
                })

            # 4. Validar el token almacenado
            stored_token = user.email_verification_token
            logger.info(f"Token almacenado (raw): {stored_token}")

            if stored_token is None:
                logger.warning(f"No hay token almacenado para el usuario {user.id}")
                return Response(
                    {"error": "No hay un código de verificación pendiente para este usuario."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Limpiar el token almacenado
            stored_token = str(stored_token).strip()
            logger.info(f"Token almacenado (limpio): '{stored_token}'")

            # 5. Comparar tokens
            logger.info("=== Comparación de tokens ===")
            logger.info(f"Token recibido:")
            logger.info(f"  - Valor: '{token}'")
            logger.info(f"  - Tipo: {type(token)}")
            logger.info(f"  - Longitud: {len(token)}")
            logger.info(f"  - Bytes: {[ord(c) for c in token]}")
            
            logger.info(f"Token almacenado:")
            logger.info(f"  - Valor: '{stored_token}'")
            logger.info(f"  - Tipo: {type(stored_token)}")
            logger.info(f"  - Longitud: {len(stored_token)}")
            logger.info(f"  - Bytes: {[ord(c) for c in stored_token]}")
            
            tokens_match = token == stored_token
            logger.info(f"¿Los tokens coinciden?: {tokens_match}")
            
            if not tokens_match:
                return Response(
                    {"error": "Código de verificación incorrecto."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # 6. Verificar expiración
            if user.email_verification_token_created_at:
                # Asegurar que ambas fechas tengan zona horaria
                now = timezone.now()
                token_created = user.email_verification_token_created_at
                if token_created.tzinfo is None:
                    token_created = token_created.replace(tzinfo=pytz.UTC)
                
                token_age = now - token_created
                if token_age > timedelta(hours=24):
                    logger.warning(f"Token expirado para usuario {user.id}")
                    return Response(
                        {"error": "El código de verificación ha expirado. Por favor, solicita uno nuevo."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            # 7. Verificación exitosa
            user.is_email_verified = True
            user.email_verification_token = None
            user.email_verification_token_created_at = None
            user.save()

            # Verificar que los cambios se guardaron
            user.refresh_from_db()
            logger.info(f"Verificación exitosa para usuario {user.id}")
            logger.info(f"  - Email verificado: {user.is_email_verified}")
            logger.info(f"  - Token eliminado: {user.email_verification_token is None}")

            return Response({
                "success": True,
                "message": "Email verificado correctamente.",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "user_type": user.user_type
                }
            })

        except User.DoesNotExist:
            logger.warning(f"No se encontró usuario con email: {email}")
            return Response(
                {"error": "No se encontró un usuario con ese correo electrónico."},
                status=status.HTTP_404_NOT_FOUND,
            )

    except Exception as e:
        logger.error(f"Error en la verificación: {str(e)}")
        logger.error("Traceback completo:", exc_info=True)
        return Response(
            {"error": "Error en la verificación."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
@schema(AutoSchema())
def register_view(request):
    """
    Register a new user.

    Parameters:
    - username: username
    - email: email
    - password: password
    - user_type: user type (1: Company, 2: Regular)
    """
    logger.info("Iniciando registro de usuario")
    logger.info(f"Datos recibidos: {request.data}")

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Generate verification code
        verification_code = generate_verification_code()
        logger.info(f"Código generado para nuevo usuario - Email: {user.email}, Código: '{verification_code}'")
        
        # Ensure we store it as a string and it's clean
        user.email_verification_token = str(verification_code).strip()
        user.email_verification_token_created_at = timezone.now()
        user.is_email_verified = False  # Asegurar que comienza como no verificado
        user.save()

        logger.info(f"Código almacenado en la base de datos: '{user.email_verification_token}'")
        logger.info(f"Tipo del código almacenado: {type(user.email_verification_token)}")
        logger.info(f"Longitud del código almacenado: {len(user.email_verification_token)}")

        # Send verification email with the email template from EmailVerification.js
        frontend_url = request.data.get("frontend_url")
        logger.info(f"Enviando email de verificación a {user.email} con URL frontend: {frontend_url}")
        send_verification_email(user, frontend_url)

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "detail": "User registered successfully. Please check your email to verify your account.",
                "user": UserSerializer(user).data,
                "token": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )
    
    logger.error(f"Errores de validación: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserInfoView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "put"]  # explicitly declare allowed methods

    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "user_type": user.user_type,
            "is_active": user.is_active,
            "date_joined": user.date_joined,
            "phone_number": user.phone_number,
            "country_code": user.country_code,
            "phone_number_national": user.phone_number_national,
            "is_email_verified": user.is_email_verified,
        }
        return Response(data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)

            # Generate reset token
            token_payload = {
                "user_id": user.id,
                "exp": datetime.utcnow() + timedelta(minutes=15),
            }
            reset_token = jwt.encode(
                token_payload, settings.SECRET_KEY, algorithm="HS256"
            )

            # Build the reset link
            frontend_url = request.data.get("frontend_url", "http://localhost:3000")
            reset_link = f"{frontend_url}/reset-password?token={reset_token}"

            # Get the email template from the request or use a default one
            email_template = request.data.get("email_template")
            if email_template:
                html_message = email_template.replace("{{reset_link}}", reset_link)
            else:
                html_message = render_to_string(
                    "password_reset_email.html", {"reset_link": reset_link}
                )

            # Send the email
            send_mail(
                subject="Password Reset Request",
                message=strip_tags(html_message),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                html_message=html_message,
                fail_silently=False,
            )

            return Response(
                {
                    "message": "Password reset instructions sent successfully",
                    "email": email,
                }
            )

        except User.DoesNotExist:
            # For security, we do not reveal if the email exists or not
            return Response(
                {
                    "message": "If an account exists with this email, you will receive password reset instructions."
                }
            )
        except Exception as e:
            print(f"Error sending reset email: {str(e)}")
            return Response(
                {"error": "Error sending reset email"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request):
        """Confirm password reset with the token and new password"""
        token = request.data.get("token")
        new_password = request.data.get("new_password")

        if not token or not new_password:
            return Response(
                {"error": "Token and new password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Decode and validate the token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            user = User.objects.get(id=user_id)

            # Set the new password
            user.set_password(new_password)
            user.save()

            return Response({"message": "Password reset successful"})

        except jwt.ExpiredSignatureError:
            return Response(
                {"error": "Reset token has expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        except (jwt.InvalidTokenError, User.DoesNotExist):
            return Response(
                {"error": "Invalid reset token"}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"Error resetting password: {str(e)}")
            return Response(
                {"error": "Error resetting password"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


@api_view(["POST"])
@permission_classes([AllowAny])
@schema(AutoSchema())
def resend_verification_email(request):
    """Resend verification email."""
    email = str(request.data.get("email", "")).strip()
    frontend_url = request.data.get("frontend_url")

    logger.info(f"=== Inicio de reenvío de verificación ===")
    logger.info(f"Email solicitado: '{email}'")

    if not email:
        return Response(
            {"error": "El correo electrónico es requerido.", "success": False},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email=email)
        
        # Generar nuevo código
        verification_code = generate_verification_code()
        logger.info(f"Código generado para reenvío:")
        logger.info(f"  - Valor: '{verification_code}'")
        logger.info(f"  - Tipo: {type(verification_code)}")
        logger.info(f"  - Longitud: {len(verification_code)}")
        
        # Actualizar usuario con el nuevo código
        user.email_verification_token = verification_code
        user.email_verification_token_created_at = timezone.now()
        user.save()

        # Verificar que se guardó correctamente
        user.refresh_from_db()
        logger.info(f"Código almacenado en la base de datos:")
        logger.info(f"  - Valor: '{user.email_verification_token}'")
        logger.info(f"  - Tipo: {type(user.email_verification_token)}")
        logger.info(f"  - Longitud: {len(user.email_verification_token)}")

        # Enviar email
        send_verification_email(user, frontend_url)
        logger.info(f"Email de verificación enviado a {email}")
        logger.info("=== Fin de reenvío de verificación ===")

        return Response({
            "success": True,
            "message": "Email de verificación enviado correctamente.",
            "user_id": user.id,
            "email": user.email
        })

    except User.DoesNotExist:
        logger.warning(f"Intento de reenvío para email no existente: {email}")
        return Response({
            "success": True,
            "message": "Si existe una cuenta con este email, recibirás un correo de verificación."
        })
    except Exception as e:
        logger.error(f"Error en reenvío de verificación: {str(e)}")
        logger.error("Traceback completo:", exc_info=True)
        return Response(
            {"error": "Error al enviar el email de verificación.", "success": False},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([AllowAny])
@schema(AutoSchema())
def get_user_by_token(request):
    """
    Get user information using verification token.

    Parameters:
    - token: The verification token

    Returns:
    - success: True if user was found
    - user: User information (id, email)
    - error: Error message if user was not found
    """
    token = request.GET.get("token")

    if not token:
        return Response(
            {"error": "Verification token is required.", "success": False},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Clean the token to avoid spaces and other unwanted characters
        token = token.strip().replace("\s+", "")

        # Find the user with this verification token
        user = User.objects.get(email_verification_token=token)

        # Return basic user information needed for verification
        return Response(
            {"success": True, "user": {"id": user.id, "email": user.email}},
            status=status.HTTP_200_OK,
        )
    except User.DoesNotExist:
        # Try alternative formats (trimmed or lowercase)
        try:
            # Search with the token after trimming spaces
            user_trim = User.objects.filter(
                email_verification_token=token.strip()
            ).first()
            if user_trim:
                return Response(
                    {
                        "success": True,
                        "user": {"id": user_trim.id, "email": user_trim.email},
                    },
                    status=status.HTTP_200_OK,
                )

            # Try with lowercase token
            user_lower = User.objects.filter(
                email_verification_token=token.lower()
            ).first()
            if user_lower:
                return Response(
                    {
                        "success": True,
                        "user": {"id": user_lower.id, "email": user_lower.email},
                    },
                    status=status.HTTP_200_OK,
                )
        except Exception as e:
            print(f"Error in alternative search: {str(e)}")

        return Response(
            {"error": "No user found with this verification token.", "success": False},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return Response(
            {"error": f"Error finding user: {str(e)}", "success": False},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def get_recaptcha_key(request):
    """
    Get reCAPTCHA site key
    """
    return Response({
        "key": settings.RECAPTCHA_PUBLIC_KEY
    })
