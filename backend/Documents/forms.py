from django import forms
from .models import Document
from Companies.models import Company
from Employees.models import Employee


class DocumentForm(forms.Form):
    """Form for creating and editing documents.

    This form provides fields for all necessary document information including
    relationships with employees and companies.

    Attributes:
        document_id: Field for selecting an existing document.
        company_name: Field for selecting the associated company.
        employee_name: Field for selecting the associated employee.
        employee_id: Field for selecting the employee ID.
        duration: Field for specifying the document duration.
        position: Field for specifying the employee position.
        company_logo: Optional field for uploading a company logo.
    """

    document_id = forms.ModelChoiceField(queryset=Document.objects.all(), required=True)
    company_name = forms.ModelChoiceField(queryset=Company.objects.all(), required=True)
    employee_name = forms.ModelChoiceField(
        queryset=Employee.objects.all(), required=True
    )
    employee_id = forms.ModelChoiceField(queryset=Employee.objects.all(), required=True)
    duration = forms.CharField(max_length=50, required=True)
    position = forms.CharField(max_length=100, required=True)
    company_logo = forms.ImageField(required=False)
