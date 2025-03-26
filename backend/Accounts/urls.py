from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from .views import (
    UserListCreateView,
    UserDetailView,
    DashboardView,
    login_view,
    logout_view,
    verify_token,
    register_view,
    UserInfoView,
    PasswordResetView,
    verify_email_view,
    resend_verification_email,
    get_user_by_token,
    get_recaptcha_key,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView as JWTTokenRefreshView,
)

app_name = "accounts"

urlpatterns = [
    # API Documentation
    path(
        "docs/",
        include_docs_urls(
            title="Accounts API",
            description="API endpoints for user management and authentication",
            permission_classes=[AllowAny],
            authentication_classes=[],
        ),
    ),
    # User Management endpoints
    path("users/", UserListCreateView.as_view(), name="user-list-create"),
    path("users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path("user/info/", UserInfoView.as_view(), name="user-info"),
    # Authentication endpoints
    path(
        "auth/",
        include(
            [
                path("login/", login_view, name="login"),
                path("logout/", logout_view, name="logout"),
                path("verify/", verify_token, name="verify-token"),
                path("register/", register_view, name="register"),
                path(
                    "reset-password/",
                    PasswordResetView.as_view(),
                    name="password_reset",
                ),
            ]
        ),
    ),
    # Rutas de autenticación JWT
    path("auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", JWTTokenRefreshView.as_view(), name="token_refresh"),
    # Dashboard
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    # Email verification - Ahora solo usa la versión API
    path("verify-email/", verify_email_view, name="verify-email"),
    path(
        "resend-verification-email/",
        resend_verification_email,
        name="resend-verification-email",
    ),
    path("get-user-by-token/", get_user_by_token, name="get-user-by-token"),
    path("recaptcha-key/", get_recaptcha_key, name="get-recaptcha-key"),
]
