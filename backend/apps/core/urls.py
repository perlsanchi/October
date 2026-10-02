from django.urls import path
from .views import health_check, greeting

urlpatterns = [
    path("health/", health_check, name="health"),
    path("greeting/", greeting, name="greeting"),
]