from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from apps.core.responses import success_response, error_response
from .serializers import LoginSerializer, UserSerializer

User = get_user_model()


def _tokens_for_user(user):
    """Generate access + refresh JWT tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """POST /api/auth/login/  { email, password } → { user, access, refresh }"""
    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return error_response(
            message="Invalid credentials.",
            errors=serializer.errors,
            status_code=400,
        )

    user = serializer.validated_data["user"]
    tokens = _tokens_for_user(user)

    return success_response(
        data={
            "user": UserSerializer(user).data,
            "access": tokens["access"],
            "refresh": tokens["refresh"],
        },
        message="Login successful",
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    """GET /api/auth/me/  → current user's info (requires auth)"""
    return success_response(data=UserSerializer(request.user).data)