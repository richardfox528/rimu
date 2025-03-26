from django.db import models
from Accounts.models import User


# Create your models here.
class Company(models.Model):
    """Model representing a company in the system.

    This model stores information about companies including their basic details,
    contact information, and relationship with users.

    Attributes:
        name (str): The company's name.
        address (str): The company's physical address.
        phone (str): Contact phone number.
        email (str): Contact email address.
        website (str, optional): Company's website URL.
        description (str, optional): Detailed description of the company.
        logo (ImageField, optional): Company's logo image.
        user (ForeignKey): Associated user account (can be null).
        nit (str): Unique tax identification number.
        founded_date (Date, optional): Date when the company was founded.
    """

    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    website = models.URLField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to="logos/", blank=True, null=True)
    user = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.CASCADE, related_name="companies"
    )
    nit = models.CharField(max_length=20, unique=True)
    founded_date = models.DateField(blank=True, null=True)

    def __str__(self):
        """Return a string representation of the company.

        Returns:
            str: The company's name.
        """
        return self.name
