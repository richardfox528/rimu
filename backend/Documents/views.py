from django.db import IntegrityError, transaction
from django.http import JsonResponse
from django.shortcuts import render
from .models import Document, DocumentType
from .serializers import DocumentSerializer, DocumentTypeSerializer
from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .forms import DocumentForm
from .pdf_utils import create_pdf_with_metadata
from rest_framework.decorators import api_view, permission_classes
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from django.views.decorators.cache import cache_page
from django.core.cache import cache


# Create your views here.
class DocumentTypeListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create document types.

    list:
    Returns a list of all document types.

    create:
    Creates a new document type.
    """

    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


class DocumentTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update, and delete document types.

    retrieve:
    Returns a specific document type.

    update:
    Updates a document type.

    destroy:
    Deletes a document type.
    """

    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


class DocumentListCreateView(generics.ListCreateAPIView):
    """API view for listing and creating documents.

    This view provides endpoints for:
    - GET: List all documents (no authentication required)
    - POST: Create a new document (authentication required)
    """

    queryset = Document.objects.select_related('employee', 'company').all().order_by('id')
    serializer_class = DocumentSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def post(self, request, *args, **kwargs):
        """Handle POST requests to create a document.

        Creates a new document after validating the data and checking for duplicates.

        Args:
            request: The HTTP request object containing the document data.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: JSON response with the created document data or error message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():
                document_hash = serializer.validated_data.get("document_hash")
                if Document.objects.filter(document_hash=document_hash).exists():
                    return Response(
                        {"error": "Document with this hash already exists."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                self.perform_create(serializer)
        except IntegrityError:
            return Response(
                {"error": "Document with this hash already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class DocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API view for retrieving, updating, and deleting individual documents.

    This view provides endpoints for:
    - GET: Retrieve a specific document (no authentication required)
    - PUT/PATCH: Update a document (authentication required)
    - DELETE: Remove a document (authentication required)
    """

    queryset = Document.objects.select_related('employee', 'company').all()
    serializer_class = DocumentSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


def create_document(request):
    """View function for creating a new document.

    Handles both GET and POST requests:
    - GET: Returns the document creation form
    - POST: Processes the form data and creates a new document

    Args:
        request: The HTTP request object.

    Returns:
        HttpResponse: The rendered form or the created document response.
    """
    if request.method == "POST":
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            document = form.cleaned_data["document_id"]
            company_name = form.cleaned_data["company_name"]
            employee_name = form.cleaned_data["employee_name"]
            employee_id = form.cleaned_data["employee_id"]
            duration = form.cleaned_data["duration"]
            position = form.cleaned_data["position"]
            company_logo = form.cleaned_data.get("company_logo")

            # Generate the PDF with the provided data
            response = create_pdf_with_metadata(
                document,
                company_name,
                employee_name,
                employee_id,
                duration,
                position,
                company_logo,
            )
            return response
    else:
        form = DocumentForm()
    return render(request, "create_document.html", {"form": form})


@cache_page(60 * 15)
@api_view(["GET"])
@permission_classes([AllowAny])
def get_documents_by_company(request, company_id):
    """API view for retrieving all documents associated with a company.

    Args:
        request: The HTTP request object.
        company_id: The ID of the company to get documents for.

    Returns:
        Response: JSON response containing the list of documents.
    """
    documents = Document.get_documents_by_company(company_id)
    documents_data = [
        {
            "id": document.id,
            "employee": document.employee.id,
            "company": document.company.id,
            "document_hash": document.document_hash,
            "document_pdf": document.document_pdf.url,
            "document_hash_previous": document.document_hash_previous,
            "issued_date": document.issued_date,
            "unique_identifier": document.unique_identifier,
            "is_signed": document.is_signed,
            "copy_id": document.copy_id,
        }
        for document in documents
    ]
    return Response(documents_data, status=status.HTTP_200_OK)


@cache_page(60 * 15)
@api_view(["GET"])
@permission_classes([AllowAny])
def document_detail(request, identifier):
    """API view for retrieving a specific document by its identifier.

    Args:
        request: The HTTP request object.
        identifier: The unique identifier of the document.

    Returns:
        Response: JSON response containing the document data or error message.
    """
    document = Document.find_by_identifier(identifier)
    if document is None:
        return Response(
            {"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND
        )
    document_data = {
        "id": document.id,
        "employee": document.employee.id,
        "company": document.company.id,
        "document_hash": document.document_hash,
        "document_pdf": document.document_pdf.url,
        "document_hash_previous": document.document_hash_previous,
        "issued_date": document.issued_date,
        "unique_identifier": document.unique_identifier,
        "is_signed": document.is_signed,
        "copy_id": document.copy_id,
    }
    return Response(document_data, status=status.HTTP_200_OK)


class DocumentViewSet(viewsets.ModelViewSet):
    """API endpoint to manage documents."""

    queryset = Document.objects.select_related('employee', 'company').all().order_by('id')
    serializer_class = DocumentSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """Handle GET list requests, checking cache first."""
        cache_key = 'Documents:cache:viewset_list'
        cached_data = cache.get(cache_key)

        if cached_data:
            print(f"Cache hit for {cache_key}")
            return Response(cached_data)

        print(f"Cache miss for {cache_key}")
        response = super().list(request, *args, **kwargs)

        if response.status_code == 200:
            cache.set(cache_key, response.data, timeout=300)

        return response


class DocumentTypeViewSet(viewsets.ModelViewSet):
    """API endpoint to manage document types."""

    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [AllowAny]
