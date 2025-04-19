"""
URL configuration for voxlyne project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.documentation import include_docs_urls
from rest_framework.permissions import AllowAny
from Accounts.views import UserListCreateView, UserDetailView
from .views import *
from .api_docs import API_DESCRIPTIONS
import debug_toolbar

urlpatterns = [
    path("", index, name="index-view"),
    path("admin/", admin.site.urls),
    # API Documentation
    path(
        "docs/",
        include_docs_urls(
            title="VoxLyne API",
            description="""
            Complete work history and documentation management system.
            
            The system includes the following APIs:
            
            1. Accounts API
               - User management and authentication
            
            2. Employees API
               - Management of employees and their data
            
            3. Documents API
               - Document and certificate management
            
            4. Documents Copies API
               - Copy and version control
            
            5. Companies API
               - Company and organization management
            
            6. Employment History API
               - Employment history control
            """,
            permission_classes=[AllowAny],
            authentication_classes=[],
            patterns=[
                path("api/accounts/", include("Accounts.urls")),
                path("api/employees/", include("Employees.urls")),
                path("api/documents/", include("Documents.urls")),
                path("api/documents-copies/", include("Documents_copies.urls")),
                path("api/companies/", include("Companies.urls")),
                path("api/employment-history/", include("Employment_history.urls")),
            ],
        ),
    ),
    # API Endpoints with their documentation
    path(
        "api/",
        include(
            [
                path("accounts/", include("Accounts.urls")),
                path("employees/", include("Employees.urls")),
                path("companies/", include("Companies.urls")),
                path("employment-history/", include("Employment_history.urls")),
                path("documents/", include("Documents.urls")),
                path("documents-copies/", include("Documents_copies.urls")),
            ]
        ),
    ),
    # Direct User Management
    path("users/", UserListCreateView.as_view(), name="user-list-create"),
    path("users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    # Frontend Views
    path("services/", services, name="services-view"),
    path("contact/", contact, name="contact-view"),
]

if settings.DEBUG:
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        path("api-auth/", include("rest_framework.urls")),
    ]
