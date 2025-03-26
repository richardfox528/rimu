from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from .views import EmploymentHistoryListCreateView, EmploymentHistoryDetailView

app_name = "employment_history"

urlpatterns = [
    # API Documentation
    path(
        "docs/",
        include_docs_urls(
            title="Employment History API",
            description=""" 
            API for managing employment history.
            
            This API allows:
            - Listing all employment history records
            - Creating new employment records
            - Viewing details of specific jobs
            - Updating employment information
            - Deleting employment records
            
            Key features:
            - Detailed record of work experience
            - Tracking of positions and roles
            - Control of employment dates
            - Management of company information
            - Validation of work experience
            """,
            permission_classes=[AllowAny],
            authentication_classes=[],
        ),
    ),
    # Employment History endpoints
    path(
        "",
        EmploymentHistoryListCreateView.as_view(),
        name="employment-history-list-create",
    ),
    path(
        "<int:pk>/",
        EmploymentHistoryDetailView.as_view(),
        name="employment-history-detail",
    ),
]
