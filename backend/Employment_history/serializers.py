from rest_framework import serializers
from .models import EmploymentHistory, Employee
from Companies.models import Company
from Employees.serializers import EmployeeSerializer
from Companies.serializers import CompanySerializer


class EmploymentHistorySerializer(serializers.ModelSerializer):
    """Serializer for the EmploymentHistory model.

    This serializer handles the conversion between EmploymentHistory model instances and JSON/dict data.
    It includes nested serializers for employee and company relationships.

    Attributes:
        employee: Nested serializer for the associated employee.
        company: Nested serializer for the associated company.
    """

    employee = EmployeeSerializer()
    company = CompanySerializer()

    class Meta:
        model = EmploymentHistory
        fields = [
            "id",
            "employee",
            "company",
            "department",
            "position",
            "start_date",
            "end_date",
            "hash",
        ]

    def create(self, validated_data):
        """Create a new employment history record.

        Args:
            validated_data (dict): The validated data from the request.

        Returns:
            EmploymentHistory: The newly created employment history instance.
        """
        employee_data = validated_data.pop("employee")
        company_data = validated_data.pop("company")
        employee = Employee.objects.get_or_create(**employee_data)[0]
        company = Company.objects.get_or_create(**company_data)[0]
        employment_history = EmploymentHistory.objects.create(
            employee=employee, company=company, **validated_data
        )
        return employment_history

    def update(self, instance, validated_data):
        """Update an existing employment history record.

        Args:
            instance: The existing EmploymentHistory instance to update.
            validated_data (dict): The validated data from the request.

        Returns:
            EmploymentHistory: The updated employment history instance.
        """
        employee_data = validated_data.pop("employee")
        company_data = validated_data.pop("company")
        instance.employee = Employee.objects.get_or_create(**employee_data)[0]
        instance.company = Company.objects.get_or_create(**company_data)[0]
        instance.department = validated_data.get("department", instance.department)
        instance.position = validated_data.get("position", instance.position)
        instance.start_date = validated_data.get("start_date", instance.start_date)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.hash = validated_data.get("hash", instance.hash)
        instance.save()
        return instance

    def validate(self, attrs):
        """Validate the employment history data.

        Args:
            attrs (dict): The attributes to validate.

        Returns:
            dict: The validated attributes.
        """
        return super().validate(attrs)
