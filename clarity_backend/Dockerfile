FROM python:3.13-slim-trixie

COPY --from=ghcr.io/astral-sh/uv:0.13.6 /uv /usr/local/bin/uv

ENV UV_PROJECT_ENVIRONMENT=/opt/venv \
    UV_PYTHON_DOWNLOADS=never \
    UV_COMPILE_BYTECODE=1 \
    PATH="/opt/venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    STATIC_ROOT=/vol/web/static \
    MEDIA_ROOT=/vol/web/media

WORKDIR /app

# dependencies first so they stay cached when only the source changes;
# build with --build-arg WITH_DEV=1 to include the test tools
ARG WITH_DEV=0
COPY pyproject.toml uv.lock .python-version ./
RUN if [ "$WITH_DEV" = "1" ]; then uv sync --frozen --no-install-project; \
    else uv sync --frozen --no-dev --no-install-project; fi

COPY . .

RUN useradd -m -u 1000 appuser \
    && mkdir -p /vol/web/static /vol/web/media /app/databases \
    && chown -R appuser:appuser /app /vol/web
USER appuser

VOLUME /vol/web
EXPOSE 9000
CMD ["/app/scripts/run.sh"]
