from django.db import connection
from django.http import JsonResponse


def health(request):
    """Liveness plus a database check, for the load balancer / container health check."""
    try:
        connection.ensure_connection()
    except Exception:  # noqa: BLE001 - any failure to reach the database means "not healthy"
        return JsonResponse({"status": "unavailable"}, status=503)
    return JsonResponse({"status": "ok"})
