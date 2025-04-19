from django.shortcuts import render
from rest_framework import generics
from .models import DocumentCopy
from .serializers import DocumentCopySerializer
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# Create your views here.
class DocumentCopyListCreateView(generics.ListCreateAPIView):
    """API view for listing and creating document copies.

    This view provides endpoints for:
    - GET: List all document copies
    - POST: Create a new document copy
    """

    # Temporarily allow any user for debugging
    permission_classes = [AllowAny]

    queryset = DocumentCopy.objects.select_related('document', 'employment_history').all().order_by('-issued_date')
    serializer_class = DocumentCopySerializer

    def list(self, request, *args, **kwargs):
        """Handle GET list requests, checking cache first."""
        cache_key = 'Documents_copies:cache:list_view'
        cached_data = cache.get(cache_key)

        if cached_data:
            print(f"Cache hit for {cache_key}")
            return Response(cached_data)

        print(f"Cache miss for {cache_key}")
        response = super().list(request, *args, **kwargs)

        if response.status_code == 200:
            cache.set(cache_key, response.data, timeout=300)

        return response


class DocumentCopyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API view for retrieving, updating, and deleting individual document copies.

    This view provides endpoints for:
    - GET: Retrieve a specific document copy
    - PUT/PATCH: Update a document copy
    - DELETE: Remove a document copy
    """

    # Add select_related for optimization
    queryset = DocumentCopy.objects.select_related('document', 'employment_history').all()
    serializer_class = DocumentCopySerializer
