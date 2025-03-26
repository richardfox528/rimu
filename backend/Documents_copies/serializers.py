from rest_framework import serializers
from .models import DocumentCopy
from Documents.serializers import DocumentSerializer
from Employment_history.serializers import EmploymentHistorySerializer


class DocumentCopySerializer(serializers.ModelSerializer):
    """Serializer for the DocumentCopy model.

    This serializer handles the conversion between DocumentCopy model instances and JSON/dict data.
    It includes nested serializers for the document and employment history relationships.

    Attributes:
        document: Nested serializer for the associated document.
        employment_history: Nested serializer for the associated employment history.
    """

    document = DocumentSerializer()
    employment_history = EmploymentHistorySerializer()

    class Meta:
        model = DocumentCopy
        fields = "__all__"


def create(self, validated_data):
    """Create a new document copy record.

    Args:
        validated_data (dict): The validated data from the request.

    Returns:
        DocumentCopy: The newly created document copy instance.
    """
    document_data = validated_data.pop("document")
    employment_history_data = validated_data.pop("employment_history")
    document = DocumentSerializer.objects.create(**document_data)[0]
    employment_history = EmploymentHistorySerializer.objects.create(
        **employment_history_data
    )[0]
    document_data = DocumentCopy.objects.create(
        document=document, employment_history=employment_history, **validated_data
    )
    return document_data


def update(self, instance, validated_data):
    """Update an existing document copy record.

    Args:
        instance: The existing DocumentCopy instance to update.
        validated_data (dict): The validated data from the request.

    Returns:
        DocumentCopy: The updated document copy instance.
    """
    document_data = validated_data.pop("document")
    employment_history_data = validated_data.pop("employment_history")
    instance.document = DocumentSerializer.objects.update(
        instance.document, **document_data
    )[0]
    instance.employment_history = EmploymentHistorySerializer.objects.update(
        instance.employment_history, **employment_history_data
    )[0]
    instance.copy_hash = validated_data.get("copy_hash", instance.copy_hash)
    instance.issued_date = validated_data.get("issued_date", instance.issued_date)
    instance.save()
    return instance


def validate(self, data):
    """Validate the document copy data.

    Ensures that both document and employment history are provided.

    Args:
        data (dict): The data to validate.

    Returns:
        dict: The validated data.

    Raises:
        ValidationError: If required fields are missing.
    """
    if not data.get("document"):
        raise serializers.ValidationError("Document is required")
    if not data.get("employment_history"):
        raise serializers.ValidationError("Employment history is required")
    return data
