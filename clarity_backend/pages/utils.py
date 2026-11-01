from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    """DRF's handler, plus the status code inside the body (``{"detail": ..., "status_code": 404}``)."""
    response = exception_handler(exc, context)
    if response is not None and isinstance(response.data, dict):
        # a validation error can be a plain list, which has nowhere to put a key
        response.data["status_code"] = response.status_code
    return response
