from django.db import models
from django.core.exceptions import ValidationError
from Employees.models import Employee
from Companies.models import Company
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
import os
import logging
import hashlib
import uuid


# Create your models here.
def validate_pdf(file):
    """Validate that the uploaded file is a PDF.

    Args:
        file: The uploaded file object.

    Raises:
        ValidationError: If the file is not a PDF.
    """
    if not file.name.endswith(".pdf"):
        raise ValidationError("Only PDF files are allowed.")


class DocumentType(models.Model):
    """Model for document types in the system.

    This model stores information about the different types of documents
    that can be managed in the system.

    Attributes:
        name (str): Name of the document type.
        description (str): Detailed description of the document type.
        is_active (bool): Indicates if the document type is active.
        created_at (datetime): Date and time of creation of the document type.
        updated_at (datetime): Date and time of the last update.
    """

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Document Type"
        verbose_name_plural = "Document Types"

    def __str__(self):
        return self.name


class Document(models.Model):
    """Model representing a document in the system.

    This model stores information about documents including their content,
    metadata, and relationships with employees and companies.

    Attributes:
        document_hash (str): Unique hash of the document content.
        employee (ForeignKey): Associated employee.
        company (ForeignKey): Associated company.
        document_pdf (FileField): The actual PDF file.
        document_hash_previous (str): Hash of the previous version.
        issued_date (Date): Date when the document was issued.
        unique_identifier (str): Unique identifier for the document.
        is_signed (bool): Whether the document has been signed.
        copy_id (str): Unique identifier for document copies.
    """

    document_hash = models.CharField(
        max_length=64, unique=True, null=False, editable=False
    )
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    document_pdf = models.FileField(
        upload_to="Documents/files/", validators=[validate_pdf], null=False
    )
    document_hash_previous = models.CharField(
        max_length=64, null=True, blank=True, editable=False
    )
    issued_date = models.DateField(null=False)
    unique_identifier = models.CharField(
        max_length=100, unique=True, null=False, editable=False
    )
    is_signed = models.BooleanField(default=False)
    copy_id = models.CharField(
        max_length=100, unique=True, null=True, blank=True, editable=False
    )

    def save(self, *args, **kwargs):
        """Save the document record.

        This method handles the generation of various identifiers and metadata
        before saving the document.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.
        """
        if not self.document_hash:
            self.document_hash = self.generate_unique_document_hash()
            logging.info(f"Generated document hash: {self.document_hash}")
        if not self.unique_identifier:
            self.unique_identifier = self.generate_unique_identifier()
            logging.info(f"Generated unique identifier: {self.unique_identifier}")
        if not self.copy_id:
            self.copy_id = self.generate_copy_id()
            logging.info(f"Generated copy ID: {self.copy_id}")
        if not self.pk:
            previous_document = (
                Document.objects.filter(company=self.company).order_by("-id").first()
            )
            if previous_document:
                self.document_hash_previous = previous_document.document_hash

        self.add_metadata_to_pdf()
        super(Document, self).save(*args, **kwargs)

    @staticmethod
    def get_documents_by_company(company_id):
        """Retrieve all documents associated with a specific company.

        Args:
            company_id: The ID of the company.

        Returns:
            QuerySet: A queryset of Document objects for the company.
        """
        return Document.objects.filter(company_id=company_id).order_by("id")

    @classmethod
    def find_by_identifier(cls, identifier):
        """Find a document by its unique identifier.

        Args:
            identifier: The unique identifier to search for.

        Returns:
            Document: The found document or None if not found.
        """
        try:
            return cls.objects.get(unique_identifier=identifier)
        except cls.DoesNotExist:
            return None

    def generate_document_hash(self):
        """Generate a hash for the document content.

        Returns:
            str: The SHA-256 hash of the document content.
        """
        self.document_pdf.seek(0)
        return hashlib.sha256(self.document_pdf.read()).hexdigest()

    def generate_unique_document_hash(self):
        """Generate a unique hash for the document.

        Ensures the generated hash is unique in the system.

        Returns:
            str: A unique SHA-256 hash.
        """
        document_hash = self.generate_document_hash()
        while Document.objects.filter(document_hash=document_hash).exists():
            document_hash = hashlib.sha256(uuid.uuid4().bytes).hexdigest()
        return document_hash

    def generate_unique_identifier(self):
        """Generate a unique identifier for the document.

        Returns:
            str: A 13-character unique identifier.
        """
        return str(uuid.uuid4())[:13]

    def generate_copy_id(self):
        """Generate a unique copy ID for the document.

        Returns:
            str: A UUID-based copy identifier.
        """
        return str(uuid.uuid4())

    ## write pdf

    def add_metadata_to_pdf(self):
        """Add metadata to the PDF document.

        This method adds the document hash and unique identifier to the
        last page of the PDF document.
        """
        self.document_pdf.seek(0)
        existing_pdf = PdfReader(self.document_pdf)
        output = PdfWriter()

        packet = BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        can.setFont("Helvetica", 8)
        page_width, page_height = letter
        can.drawString(page_width / 2, 10, f"Hash: {self.document_hash}")
        can.drawString(page_width / 2, 25, f"ID: {self.unique_identifier}")
        can.save()

        packet.seek(0)
        new_pdf = PdfReader(packet)

        last_page = existing_pdf.pages[-1]
        last_page_text = last_page.extract_text()
        if (
            f"Hash: {self.document_hash}" in last_page_text
            and f"ID: {self.unique_identifier}" in last_page_text
        ):
            return

        for page_num in range(len(existing_pdf.pages)):
            page = existing_pdf.pages[page_num]
            if page_num == len(existing_pdf.pages) - 1:
                page.merge_page(new_pdf.pages[0])
            output.add_page(page)

        output_stream = BytesIO()
        output.write(output_stream)
        output_stream.seek(0)

        temp_filename = os.path.join("", f"temp_{uuid.uuid4().hex}.pdf")
        with open(temp_filename, "wb") as f:
            f.write(output_stream.read())

        self.document_pdf.save(
            os.path.basename(self.document_pdf.name), open(temp_filename, "rb")
        )

        os.remove(temp_filename)
