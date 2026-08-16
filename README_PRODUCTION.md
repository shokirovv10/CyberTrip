# CYBERTRIP — Production deployment

This bundle is prepared for an Ubuntu VPS with Docker and a real `.UZ` domain.

## 1. Requirements
- Ubuntu 22.04/24.04 VPS
- 4 vCPU / 8 GB RAM recommended for the first production stage
- 40+ GB SSD; add a separate lab node when labs grow
- A registered domain such as `cybertrip.uz`
- DNS A/AAAA records pointing to the VPS

## 2. Configure
```bash
cp .env.example .env
nano .env
```
Set `DOMAIN`, `CYBERTRIP_SECRET`, `POSTGRES_PASSWORD`.
Generate secrets with:
```bash
openssl rand -hex 32
```

## 3. Install Docker on a fresh Ubuntu VPS
```bash
bash deploy/install-ubuntu.sh
```
Log out/in once if the script says the docker group changed.

## 4. Start
```bash
bash deploy/deploy.sh
```
Caddy automatically requests HTTPS after DNS is correctly pointed at the VPS.

## 5. Health check
```bash
docker compose ps
curl -I https://YOUR_DOMAIN/health
```
The JSON endpoint should report `status: ok` and `database: ok`.

## 6. Backups
Run daily with cron/systemd:
```bash
./deploy/backup.sh
```
Keep at least one copy outside the VPS as well.

## 7. Important production notes
- Do not expose PostgreSQL or Redis ports publicly.
- Keep `.env` private.
- Use a separate lab VPS/network for future Docker-based labs.
- The current local synthetic labs should not be treated as a substitute for an isolated production lab cluster.
- Review Terms, Privacy, Acceptable Use and payment/legal requirements with a qualified local lawyer before public launch.
- No deployment package can honestly guarantee zero bugs; perform a staging test and backup/restore test before launch.
