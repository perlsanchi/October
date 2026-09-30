from rest_framework.response import Response
from rest_framework import status


def success_response(data=None, message="", status_code=status.HTTP_200_OK, **extra):
    """Every success response in our API follows this shape."""
    body = {
        "success": True,
        "data": data,
        "message": message,
    }
    body.update(extra)
    return Response(body, status=status_code)


def error_response(message="", errors=None, status_code=status.HTTP_400_BAD_REQUEST, **extra):
    body = {
        "success": False,
        "data": None,
        "message": message,
        "errors": errors or {},
    }
    body.update(extra)
    return Response(body, status=status_code)