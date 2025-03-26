from django.db import models
from Documents.models import Document
from Employment_history.models import EmploymentHistory


# Create your models here.
class DocumentCopy(models.Model):
    """Model representing a copy of a document in the system.

    This model stores information about document copies, including their relationship
    to the original document and the employment history record they are associated with.

    Attributes:
        document (ForeignKey): The original document this is a copy of.
        copy_hash (str): Unique hash identifying this copy.
        issued_date (Date): Date when the copy was issued.
        employment_history (ForeignKey): Associated employment history record.
        created_at (DateTime): Timestamp of when the copy was created.
        updated_at (DateTime): Timestamp of when the copy was last updated.
    """

    document = models.ForeignKey(
        Document, on_delete=models.CASCADE, related_name="copies"
    )
    copy_hash = models.CharField(max_length=64, unique=True, null=False, blank=False)
    issued_date = models.DateField(null=False, blank=False)
    employment_history = models.ForeignKey(
        EmploymentHistory, on_delete=models.CASCADE, related_name="document_copies"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a string representation of the document copy.

        Returns:
            str: A string containing the document and copy hash.
        """
        return f"DocumentCopy({self.document}, {self.copy_hash})"

    class Meta:
        ordering = ["-issued_date"]
        verbose_name = "Document Copy"
        verbose_name_plural = "Document Copies"
