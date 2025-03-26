from django.shortcuts import render
from rest_framework import generics
from .models import DocumentCopy
from .serializers import DocumentCopySerializer


# Create your views here.
class DocumentCopyListCreateView(generics.ListCreateAPIView):
    """API view for listing and creating document copies.

    This view provides endpoints for:
    - GET: List all document copies
    - POST: Create a new document copy
    """

    queryset = DocumentCopy.objects.all()
    serializer_class = DocumentCopySerializer


class DocumentCopyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API view for retrieving, updating and deleting individual document copies.

    This view provides endpoints for:
    - GET: Retrieve a specific document copy
    - PUT/PATCH: Update a document copy
    - DELETE: Remove a document copy
    """

    queryset = DocumentCopy.objects.all()
    serializer_class = DocumentCopySerializer
