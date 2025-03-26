from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, DocumentTypeViewSet

router = DefaultRouter()
router.register(r"", DocumentViewSet)
router.register(r"types", DocumentTypeViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
