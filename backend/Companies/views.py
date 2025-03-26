from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import Company
from .serializers import CompanySerializer
from rest_framework.response import Response


# Create your views here.
class CompanyListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create companies.

    list:
    Returns a list of all companies.

    create:
    Creates a new company (requires authentication).
    """

    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        """Handle GET requests for company data.

        Retrieves all companies and returns them in a serialized format.

        Args:
            request: The HTTP request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: JSON response containing the serialized company data.
        """
        company = Company.objects.all()
        company_serializer = CompanySerializer(company, many=True)
        return Response(company_serializer.data)


class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update, and delete companies.

    retrieve:
    Returns a specific company.

    update:
    Updates a company (requires authentication).

    destroy:
    Deletes a company (requires authentication).
    """

    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


class CompanyViewSet(viewsets.ModelViewSet):
    """API endpoint to manage companies."""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [AllowAny]
