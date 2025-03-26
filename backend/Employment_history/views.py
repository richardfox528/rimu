from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import EmploymentHistory
from .serializers import EmploymentHistorySerializer


# Create your views here.
class EmploymentHistoryListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create employment histories.

    list:
    Returns a list of all employment histories.

    create:
    Creates a new employment history (requires authentication).
    """

    queryset = EmploymentHistory.objects.all()
    serializer_class = EmploymentHistorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        """Handle GET requests for employment history.

        Retrieves all employment history records and returns them in a serialized format.

        Args:
            request: The HTTP request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: JSON response containing the serialized employment history data.
        """
        employment_history = EmploymentHistory.objects.all()
        employment_history_serializer = EmploymentHistorySerializer(
            employment_history, many=True
        )
        return Response(employment_history_serializer.data)


class EmploymentHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update, and delete employment histories.

    retrieve:
    Returns a specific employment history.

    update:
    Updates an employment history (requires authentication).

    destroy:
    Deletes an employment history (requires authentication).
    """

    queryset = EmploymentHistory.objects.all()
    serializer_class = EmploymentHistorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]
