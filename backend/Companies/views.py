from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import Company
from .serializers import CompanySerializer
from rest_framework.response import Response
from django.core.cache import cache


# Create your views here.
class CompanyListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create companies.

    list:
    Returns a list of all companies.

    create:
    Creates a new company (requires authentication).
    """

    queryset = Company.objects.select_related('user').all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update, and delete companies.

    retrieve:
    Returns a specific company.

    update:
    Updates a company (requires authentication).

    destroy:
    Deletes a company (requires authentication).
    """

    queryset = Company.objects.select_related('user').all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


class CompanyViewSet(viewsets.ModelViewSet):
    """API endpoint to manage companies."""

    queryset = Company.objects.select_related('user').all().order_by('id')
    serializer_class = CompanySerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """Handle GET list requests, checking cache first."""
        cache_key = 'Companies:cache:viewset_list'
        cached_data = cache.get(cache_key)

        if cached_data:
            print(f"Cache hit for {cache_key}")
            return Response(cached_data)

        print(f"Cache miss for {cache_key}")
        response = super().list(request, *args, **kwargs)

        if response.status_code == 200:
            cache.set(cache_key, response.data, timeout=300)

        return response
