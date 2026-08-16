#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; source .env; set +a
mkdir -p backups
STAMP=$(date +%Y%m%d_%H%M%S)
docker compose exec -T db pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom > "backups/cybertrip_${STAMP}.dump"
find backups -type f -name '*.dump' -mtime +14 -delete
echo "Backup created: backups/cybertrip_${STAMP}.dump"
