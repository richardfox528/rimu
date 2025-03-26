from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from .views import DocumentCopyListCreateView, DocumentCopyDetailView

app_name = "documents_copies"

urlpatterns = [
    # API Documentation
    path(
        "docs/",
        include_docs_urls(
            title="Documents Copies API",
            description=""" 
            API for managing document copies.
            
            This API allows:
            - Listing all document copies
            - Creating new document copies
            - Viewing details of specific copies
            - Updating information of copies
            - Deleting copies
            
            Main features:
            - Document version tracking
            - Control of authorized copies
            - Change and modification logging
            - Authenticity validation
            """,
            permission_classes=[AllowAny],
            authentication_classes=[],
        ),
    ),
    # Document Copy endpoints
    path(
        "",
        DocumentCopyListCreateView.as_view(),
        name="document-copy-list-create",
    ),
    path(
        "<int:pk>/",
        DocumentCopyDetailView.as_view(),
        name="document-copy-detail",
    ),
]
