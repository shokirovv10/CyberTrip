FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN addgroup --system cybertrip && adduser --system --ingroup cybertrip cybertrip

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .
RUN mkdir -p instance && chown -R cybertrip:cybertrip /app

USER cybertrip

EXPOSE 10000
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-10000} --workers 3 --threads 2 --timeout 120 --access-logfile - --error-logfile - run:app"]
