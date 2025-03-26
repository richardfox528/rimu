from django.http import Http404
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics, viewsets
from rest_framework.response import Response
from .models import EmploymentHistory, Employee
from .serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class EmployeeViewSet(viewsets.ModelViewSet):
    """API endpoint to manage employees."""

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [AllowAny]


class EmploymentHistoryViewSet(viewsets.ModelViewSet):
    """API endpoint to manage work histories."""

    queryset = EmploymentHistory.objects.all()
    serializer_class = EmploymentHistorySerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [AllowAny]


class EmploymentHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update and delete work histories.

    retrieve:
    Returns a specific work history.

    update:
    Updates a work history (requires authentication).

    destroy:
    Deletes a work history (requires authentication).
    """

    queryset = EmploymentHistory.objects.all()
    serializer_class = EmploymentHistorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_object(self):
        """Obtain a specific object from the work history."""
        try:
            return super().get_object()
        except Http404:
            raise serializers.ValidationError(
                "The requested work history record was not found."
            )


class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update and delete employees.

    retrieve:
    Returns a specific employee.

    update:
    Updates an employee (requires authentication).

    destroy:
    Deletes an employee (requires authentication).
    """

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]


@api_view(["GET"])
@permission_classes([AllowAny])
def get_subcategories(request, department):
    """Obtain subcategories for a specific department."""
    if department in Employee.SUBCATEGORY_CHOICES:
        subcategories = Employee.SUBCATEGORY_CHOICES[department]
        return Response({"subcategories": subcategories})
    return Response({"subcategories": []})
