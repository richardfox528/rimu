from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """Create and return a regular user with the given username, email, and password."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Create and return a superuser with the given username, email, and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    USER_TYPE_CHOICES = [
        (1, "Company"),
        (2, "Normal"),
    ]
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=2)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(
        max_length=20,
        blank=False,
        null=False,
        default="3123456789",
        help_text="Number phone (ej: +34600000000)",
    )
    country_code = models.CharField(
        max_length=5,
        blank=False,
        null=False,
        default="+57",
        help_text="Country code (ej: +34)",
    )
    phone_number_national = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        default="+573123456789",
        help_text="Phone number without country code (ej: 600000000)",
    )
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    email_verification_token = models.CharField(max_length=100, blank=True, null=True)
    email_verification_token_created_at = models.DateTimeField(null=True, blank=True)
    groups = models.ManyToManyField(Group, related_name="voxlyne_user_set", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="voxlyne_user_set", blank=True
    )

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "user_type"]

    def __str__(self):
        """Return a string representation of the account."""
        return self.username
