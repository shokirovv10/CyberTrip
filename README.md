# CYBERTRIP.UZ — Kiberxavfsizlik Ta'lim Ekotizimi va Kiber-Poligon (Cyber Range)

**CYBERTRIP.UZ** — O'zbekistonning professional kiberxavfsizlik, axborot xavfsizligi auditi, Web Pentest va CTF musobaqalari bo'yicha keng qamrovli ta'lim platformasi.

---

## 🏗️ Arxitektura va Ekotizim

Ushbu platforma zamonaviy monorepo (Turborepo) arxitekturasida barpo etilgan:

```
cybertrip-uz/
├── apps/
│   ├── web/                    # Next.js 15 (App Router, Tailwind CSS, React 19)
│   ├── api/                    # NestJS (Prisma ORM, JWT HTTP-Only Cookies, RBAC, Zod)
│   └── lab-targets/            # Realistik zaiflik maqsadli ilovalari (Cyber Range)
│       ├── cyberbooks/         # SQL Injection (UNION, Error-based, Auth bypass)
│       ├── cyberforum/         # XSS (Stored & Reflected Cross-Site Scripting, Cookie theft)
│       ├── securedocs/         # IDOR / BOLA (Insecure Direct Object Reference)
│       ├── diagnosticpanel/    # OS Command Injection (System Diagnostics to Root RCE)
│       ├── sitepreview/        # SSRF (Server-Side Request Forgery & Cloud IAM Metadata)
│       └── mediavault/         # Unrestricted File Upload (Web-shell to RCE)
├── packages/
│   ├── database/               # Prisma Schema (42+ relyatsion jadvallar) + seed.ts
│   ├── types/                  # Umumiy TypeScript interfeyslari va turlari
│   ├── validation/             # Zod validatsiya sxemalari
│   └── i18n/                   # To'liq o'zbek tili lug'ati va tarjima tizimi
├── targets/                    # Brauzerda mustaqil ishga tushuvchi maqsadli ilovalar
├── index.html                  # Platforma boshlang'ich kiber-portali va interaktiv kiber-poligoni
├── css/style.css               # Dark cyber dizayn tizimi
├── js/script.js                # Interaktiv kiber-poligon va terminal boshqaruvchisi
├── docker-compose.yml          # PostgreSQL 16 va Redis xizmatlari
└── turbo.json                  # Turborepo build quvurlari
```

---

## 🎯 6 ta Realistik Ta'lim Laboratoriyalari (Target Apps)

Platformadagi har bir muhim zaiflik o'zining **alohida va realistik dizayndagi veb-ilovasiga** ega:

1. **CyberBooks (SQL Injection)**
   - *Zaiflik*: Qidiruv va tizimga kirish formasida filtrlanmagan SQL so'rovlari.
   - *Maqsad*: `UNION SELECT` orqali `users` va `flags` jadvallarini o'g'irlash hamda `' OR 1=1 --` bilan admin huquqini qo'lga kiritish.
2. **CyberForum (Cross-Site Scripting - XSS)**
   - *Zaiflik*: Qidiruvda Reflected XSS va izohlar maydonida Stored XSS.
   - *Maqsad*: Administrator boti tashrif buyurganda uning maxfiy sessiya cookie-faylini tutib olish.
3. **SecureDocs (IDOR / BOLA)**
   - *Zaiflik*: Ob'ekt identifikatorlarini (ID) tekshirmasdan to'g'ridan-to'g'ri ko'rsatish.
   - *Maqsad*: Begona mijozlar va boshqaruvchi direktorning #1001-sonli maxfiy audit hisobotini ochish.
4. **DiagnosticPanel (Command Injection)**
   - *Zaiflik*: Server `ping -c 3 {host}` buyrug'iga foydalanuvchi kiritmasi to'g'ridan-to'g'ri uzatilishi.
   - *Maqsad*: Buyruq ajratgichlari (`;`, `|`, `&`) orqali `/secret/flag.txt` faylini o'qish.
5. **SitePreview (SSRF & Cloud Metadata)**
   - *Zaiflik*: Server foydalanuvchi bergan manzilga ichki tarmoqdan so'rov yuborishi.
   - *Maqsad*: `169.254.169.254` bulut metadata xizmatidan AWS IAM maxfiy kalitlarini tortib olish.
6. **MediaVault (Unrestricted File Upload)**
   - *Zaiflik*: Fayl kengaytmalari va MIME turlari yetarli tekshirilmasligi.
   - *Maqsad*: `.php` yoki `.phtml` web-shell yuklab, serverda masofaviy kodni (RCE) bajarish.

---

## 💻 Brauzerdagi Linux Terminali

- Virtual fayllar tizimi (`/`, `/bin`, `/etc`, `/home/student`, `/var/log`, `/tmp`).
- Bash buyruqlari: `whoami`, `id`, `uname -a`, `ls -la`, `cat`, `grep`, `find`, `ps`, `pwd`, `cd`, `help`, `clear`.
- Klaviaturaning `↑` va `↓` tugmalari bilan buyruqlar tarixi (History).
- Real-vaqtda vazifalar bajarilishini tekshirish mexanizmi.

---

## 🚩 CTF Arena & Natijalar Jadvali

- Real flag formatlari: `FLAG{...}`.
- Dinamik ball hisoblash tizimi va birinchi yechim (First Blood) ko'rsatkichi.
- Web, Crypto, Forensics, Linux va Network toifalaridagi topshiriqlar.

---

## 🚀 Ishga Tushirish

### 1-Usul: Tezkor Ko'rish (Fayl orqali)
Brauzerda `index.html` faylini oching:
- Barcha 6 ta laboratoriya [Target Apps] to'liq ishlaydi.
- Interaktiv Linux terminali va CTF flag topshirish to'liq integratsiya qilingan.

### 2-Usul: To'liq Monorepo (Next.js + NestJS + PostgreSQL)
```bash
# 1. PostgreSQL va Redis konteynerlarini ishga tushirish
docker-compose up -d

# 2. Bog'liqliklarni o'rnatish
pnpm install

# 3. Ma'lumotlar bazasi sxemasini yaratish va seed qilish
pnpm --filter @cybertrip/database db:push
pnpm --filter @cybertrip/database db:seed

# 4. Web va API dasturlarini birgalikda ishga tushirish
pnpm dev
```
- **Next.js Web Frontend**: `http://localhost:3000`
- **NestJS API Backend**: `http://localhost:4000/api`
- **API Salomatlik holati**: `http://localhost:4000/api/health`
