from rest_framework import serializers
from .models import EmploymentHistory, Employee


class EmployeeSerializer(serializers.ModelSerializer):
    """Serializer for the Employee model.

    This serializer handles the conversion between Employee model instances and JSON/dict data.
    It includes validation for department and subcategory relationships.

    Attributes:
        subcategory_choices: Dynamic field that returns available subcategories for the employee's department.
    """

    subcategory_choices = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = [
            "id",
            "name",
            "surname",
            "employee_id",
            "email",
            "phone_number",
            "date_of_birth",
            "current_company",
            "position",
            "start_date",
            "end_date",
            "department",
            "subcategory",
            "subcategory_choices",
            "employment_history_id",
        ]

    def get_subcategory_choices(self, obj):
        """Get subcategory choices for an employee object.

        Args:
            obj: The Employee instance being serialized.

        Returns:
            list: Available subcategories for the employee's department.
        """
        return Employee.SUBCATEGORY_CHOICES.get(obj.department, [])

    def validate(self, data):
        """Validate the employee data.

        Ensures that the selected subcategory is valid for the chosen department.

        Args:
            data (dict): The data to validate.

        Returns:
            dict: The validated data.

        Raises:
            ValidationError: If the subcategory is invalid for the department.
        """
        department = data.get("department")
        subcategory = data.get("subcategory")

        if department in Employee.SUBCATEGORY_CHOICES:
            valid_subcategories = [
                choice[0] for choice in Employee.SUBCATEGORY_CHOICES[department]
            ]
            if subcategory not in valid_subcategories:
                raise serializers.ValidationError(
                    f"Invalid subcategory for department {department}"
                )

        return data


class EmploymentHistorySerializer(serializers.ModelSerializer):
    """Serializer for the EmploymentHistory model."""

    duration = serializers.SerializerMethodField()
    employee_name = serializers.SerializerMethodField()

    class Meta:
        model = EmploymentHistory
        fields = [
            "id",
            "employee",
            "employee_name",
            "company_name",
            "position",
            "start_date",
            "end_date",
            "description",
            "duration",
        ]
        read_only_fields = ["duration", "employee_name"]

    def get_duration(self, obj):
        """Get the calculated duration of employment."""
        return obj.calculate_duration()

    def get_employee_name(self, obj):
        """Get the full name of the employee."""
        return f"{obj.employee.name} {obj.employee.surname}"
