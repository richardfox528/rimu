from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    """Serializer for the Company model.

    This serializer handles the conversion between instances of the Company model
    and JSON/dict data.
    """

    class Meta:
        model = Company
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]
