#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env. Edit DOMAIN and passwords/secrets, then run this script again."
  exit 1
fi

if grep -q 'CHANGE_ME' .env; then
  echo "ERROR: .env still contains CHANGE_ME values. Replace them before deployment."
  exit 1
fi

docker compose build --pull
docker compose up -d
docker compose ps

echo
echo "CYBERTRIP is starting. Check: https://$(grep '^DOMAIN=' .env | cut -d= -f2)"
