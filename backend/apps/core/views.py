from django.db import connection
from django.core.cache import cache
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .responses import success_response, error_response


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    checks = {"database": False, "cache": False}

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        checks["database"] = True
    except Exception:
        pass

    try:
        cache.set("health_ping", "pong", 5)
        checks["cache"] = cache.get("health_ping") == "pong"
    except Exception:
        pass

    healthy = all(checks.values())
    if healthy:
        return success_response(data=checks, message="All systems operational")
    return error_response(
        message="One or more dependencies are down",
        errors=checks,
        status_code=503,
    )