from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import EmploymentHistory
from .serializers import EmploymentHistorySerializer
from django.core.cache import cache


# Create your views here.
class EmploymentHistoryListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create employment histories.

    list:
    Returns a list of all employment histories.

    create:
    Creates a new employment history (requires authentication).
    """

    queryset = EmploymentHistory.objects.select_related('employee', 'company').all()
    serializer_class = EmploymentHistorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        """Handle GET list requests, checking cache first."""
        cache_key = 'Employment_history:cache:list_view' # Updated key format
        cached_data = cache.get(cache_key)

        if cached_data:
            print(f"Cache hit for {cache_key}")
            # See comment in Companies/views.py regarding returning cached data directly
            return Response(cached_data)

        print(f"Cache miss for {cache_key}")
        # Call the original list method
        response = super().list(request, *args, **kwargs)

        # Cache the data part of the response
        if response.status_code == 200:
            cache.set(cache_key, response.data, timeout=300)

        return response


class EmploymentHistoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to view, update, and delete employment histories.

    retrieve:
    Returns a specific employment history.

    update:
    Updates an employment history (requires authentication).

    destroy:
    Deletes an employment history (requires authentication).
    """

    # Add select_related for optimization
    queryset = EmploymentHistory.objects.select_related('employee', 'company').all()
    serializer_class = EmploymentHistorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]
