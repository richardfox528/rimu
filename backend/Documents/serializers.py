from rest_framework import serializers
from .models import Document, DocumentType
from Employees.models import Employee
from Companies.models import Company


class DocumentTypeSerializer(serializers.ModelSerializer):
    """Serializer for the DocumentType model.

    This serializer handles the conversion between DocumentType model instances
    and JSON/dict data.

    Attributes:
        id: ID of the document type.
        name: Name of the document type.
        description: Description of the document type.
        is_active: Activation status of the document type.
        created_at: Creation date.
        updated_at: Last update date.
    """

    class Meta:
        model = DocumentType
        fields = ["id", "name", "description", "is_active", "created_at", "updated_at"]
        read_only_fields = ["created_at", "updated_at"]


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for the Document model.

    This serializer handles the conversion between Document model instances and JSON/dict data.
    It includes validation for document hashes and handles relationships with employees and companies.
    """

    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta:
        model = Document
        fields = "__all__"

    def validate_document_hash(self, value):
        """Validate the uniqueness of the document hash.

        Args:
            value: The document hash to validate.

        Returns:
            str: The validated hash.

        Raises:
            ValidationError: If a document with this hash already exists.
        """
        if Document.objects.filter(document_hash=value).exists():
            raise serializers.ValidationError("Document with this hash already exists.")
        return value

    def create(self, validated_data):
        """Create and return a new Document instance.

        This method handles the creation of a new document, properly handling
        employee and company relationships.

        Args:
            validated_data (dict): The validated data from the request.

        Returns:
            Document: The newly created document instance.
        """
        employee_data = validated_data.pop("employee")
        company_data = validated_data.pop("company")
        document = Document(
            employee=employee_data, company=company_data, **validated_data
        )
        document.document_hash = document.generate_unique_document_hash()
        document.save()
        return document

    def update(self, instance, validated_data):
        """Update and return an existing Document instance.

        This method handles updating an existing document, properly handling
        employee and company relationships.

        Args:
            instance: The existing Document instance to update.
            validated_data (dict): The validated data from the request.

        Returns:
            Document: The updated document instance.
        """
        employee = validated_data.pop("employee", None)
        company = validated_data.pop("company", None)
        if employee:
            instance.employee = employee
        if company:
            instance.company = company
        instance.document_hash = validated_data.get(
            "document_hash", instance.document_hash
        )
        instance.document_pdf = validated_data.get(
            "document_pdf", instance.document_pdf
        )
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.issued_date = validated_data.get("issued_date", instance.issued_date)
        instance.is_signed = validated_data.get("is_signed", instance.is_signed)
        instance.copy_id = validated_data.get("copy_id", instance.copy_id)
        instance.save()
        return instance

    def validate(self, attrs):
        """Validate the document data.

        Performs any additional validation on the complete set of document data.

        Args:
            attrs (dict): The attributes to validate.

        Returns:
            dict: The validated attributes.
        """
        return super().validate(attrs)
