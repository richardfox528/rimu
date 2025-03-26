from django.db import models
from Employees.models import Employee
from Companies.models import Company
import hashlib


# Create your models here.
class EmploymentHistory(models.Model):
    """Model representing an employment history record in the system.

    This model stores information about an employee's work history at a specific company,
    including their position, department, and employment dates.

    Attributes:
        employee (ForeignKey): The employee this history belongs to.
        company (ForeignKey): The company where the employee worked.
        department (str): Department within the company.
        position (str): Job position held.
        start_date (Date): Employment start date.
        end_date (Date): Employment end date.
        hash (str): Unique hash identifying this record.
    """

    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="employment_history_records"
    )
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="employment_history_records"
    )
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    hash = models.CharField(max_length=64, unique=True)

    def __str__(self):
        """Return a string representation of the employment history.

        Returns:
            str: A string containing employee, company, department, and position information.
        """
        return (
            f"{self.employee} at {self.company} in {self.department} as {self.position}"
        )

    def save(self, *args, **kwargs):
        """Save the employment history record.

        Generates a unique hash for the record if one doesn't exist.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.
        """
        if not self.hash:
            self.hash = self.generate_hash()
        super().save(*args, **kwargs)

    def generate_hash(self):
        """Generate a unique hash for the employment history record.

        Returns:
            str: SHA-256 hash of the record's data.
        """
        hash_input = f"{self.hash}"
        return hashlib.sha256(hash_input.encode("utf-8")).hexdigest()
