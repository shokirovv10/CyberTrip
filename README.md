# CYBERTRIP.UZ — Milliy Kiberxavfsizlik Ta'lim Ekotizimi va Kiber-Poligon (Cyber Range)

**CYBERTRIP.UZ** — Professional kiberxavfsizlik, axborot xavfsizligi auditi, Web Pentest va CTF musobaqalari bo'yicha keng qamrovli, ishlab chiqarishga (production) to'liq tayyor ta'lim platformasi.

---

## 🌟 Platforma Imkoniyatlari

- **6 ta Asosiy O'quv Yo'nalishi (Learning Paths)**: Web Pentest, Linux & Tizim Xavfsizligi, Tarmoq Xavfsizligi, Kiber Asoslar, SOC & Blue Team, CTF Challenge.
- **15 ta To'liq Kurs & 30 ta Modul**: Barcha darajalar (Boshlang'ichdan Toki Ekspertgacha).
- **172 ta Mukammal Dars**: Har birida amaliy MDX darslik, nazariya, kod namunalari va xulosalar.
- **172 ta Interaktiv Quiz**: Har bir dars oxirida avtomatik baholanuvchi test tizimi.
- **60 ta Amaliy Laboratoriya (Hands-on Labs)**: SQLi, XSS, SSRF, XXE, SSTI, IDOR, JWT, Race Condition, GraphQL, Websocket, Forensics va boshqalar.
- **18 ta Alohida Nishon Ilova (Target Apps)**: Realistik zaiflik muhitlari (`/targets/`).
- **Interaktiv Linux Terminali**: `nmap`, `curl`, `netstat`, `ps`, `chmod`, `cat`, `grep` kabi real vositalar bilan.
- **15 ta CTF Challenge**: Bcrypt xeshli bayroqlar (Flag) va dinamik reyting.
- **Admin Boshqaruv Paneli**: Jonli statistika, foydalanuvchilar rollarini boshqarish va bloklash, tariflar narxini sozlash va audit jurnallari.
- **To'lov & Obuna Tizimi**: Free, Pro (Pentester) va Premium (Kiber-Elita) tariflari.

---

## 🏗️ Arxitektura

```
cybertrip-uz/
├── apps/
│   ├── web/                    # Next.js 14 (React 19, Tailwind CSS, App Router)
│   └── api/                    # NestJS (Prisma ORM, JWT HTTP-Only Cookies, RBAC, Zod)
├── packages/
│   ├── database/               # Prisma Schema (PostgreSQL) + Master Seed (172 dars, 60 lab)
│   ├── types/                  # Umumiy TypeScript interfeyslari
│   ├── validation/             # Zod validatsiya sxemalari
│   └── i18n/                   # O'zbek tili lug'ati
├── nginx.conf                  # Nginx Reverse Proxy (Next.js :3000 + NestJS :4000 + SSE)
├── Dockerfile.web              # Multi-stage production build (Next.js)
├── Dockerfile.api              # Multi-stage production build (NestJS)
├── docker-compose.yml          # Postgres 16, Redis 7, Web, API
├── cybertrip-production.zip    # Serverga joylashtirish uchun tayyor toza arxiv (564 KB)
└── .env.example                # Ishlab chiqarish konfiguratsiya andozasi
```

---

## 🚀 Serverga Joylashtirish (Production Deployment)

### 1-Usul: Git orqali (Tavsiya etiladi)

```bash
# 1. Loyihani serverga yuklab olish
git clone https://github.com/shokirovv10/cybertrip.git /var/www/cybertrip-uz
cd /var/www/cybertrip-uz

# 2. Konfiguratsiya faylini sozlash
cp .env.example .env
nano .env

# 3. Docker konteynerlarini qurish va ishga tushirish
docker compose up -d --build

# 4. Ma'lumotlar bazasini generatsiya qilish va 172 dars/60 lab bilan to'ldirish
docker compose exec api npx prisma db push --schema=./packages/database/prisma/schema.prisma
docker compose exec api npx ts-node ./packages/database/prisma/seed.ts
```

### 2-Usul: ZIP Fayl orqali

Agar Git ishlatishni xohlamasangiz, omborda joylashgan `cybertrip-production.zip` arxivini yuklab olib serverga tashlang:
```bash
unzip cybertrip-production.zip -d /var/www/cybertrip-uz
cd /var/www/cybertrip-uz
cp .env.example .env
docker compose up -d --build
docker compose exec api npx prisma db push --schema=./packages/database/prisma/schema.prisma
docker compose exec api npx ts-node ./packages/database/prisma/seed.ts
```

---

## 🔐 Standart Kirish Ma'lumotlari (Seed yuklangandan so'ng)

- **Admin Paneli**: `admin@cybertrip.uz` / `CyberTrip2024!`
- **Test Talaba**: `student@test.uz` / `student123`
- **Bosh Murabbiy**: `instructor@cybertrip.uz` / `instructor123`

---

## 📄 Litsenziya
CYBERTRIP.UZ jamoasi tomonidan ishlab chiqilgan. Barcha huquqlar himoyalangan.
