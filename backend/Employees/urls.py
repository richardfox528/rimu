from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, EmploymentHistoryViewSet, get_subcategories

router = DefaultRouter()
router.register(r"", EmployeeViewSet)
router.register(r"history", EmploymentHistoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "<str:department>/subcategories/", get_subcategories, name="get-subcategories"
    ),
]
