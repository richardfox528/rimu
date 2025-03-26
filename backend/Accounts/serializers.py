from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from Accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model.

    This serializer handles the conversion between User model instances
    and JSON/dict data, including the creation and updating of users.

    Attributes:
        id: User ID
        username: Username
        email: Email address
        password: Password (write-only)
        first_name: First name
        last_name: Last name
        user_type: User type (1: Company, 2: Normal)
        is_active: User activation status
        date_joined: Date of registration
    """

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "user_type",
            "is_active",
            "date_joined",
            "phone_number",
            "country_code",
            "phone_number_national",
        ]
        read_only_fields = ["id", "date_joined"]

    def create(self, validated_data):
        """Create a new user.

        Args:
            validated_data: Validated user data.

        Returns:
            User: New user instance created.
        """
        validated_data["password"] = make_password(validated_data.get("password"))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """Update an existing user.

        Args:
            instance: User instance to update.
            validated_data: Validated user data.

        Returns:
            User: Updated user instance.
        """
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data.get("password"))
        return super().update(instance, validated_data)
