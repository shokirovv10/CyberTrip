const fs = require('fs');
const path = require('path');

const coursesDefinition = [
  // 1: Kompyuter asoslari (8)
  {
    pathSlug: 'linux-security',
    courseSlug: 'computer-fundamentals',
    courseTitle: 'Kompyuter Asoslari & Tizim Anatomiyasi',
    courseDesc: 'OS arxitekturasi, fayl tizimlari, protsessor (CPU), operativ xotira (RAM) va quyi darajadagi axborot almashinuvi.',
    level: 'BEGINNER',
    hours: 10,
    prerequisites: ['Boshlang\'ich kompyuter savodxonligi'],
    quizXp: 20,
    completionXp: 50,
    lessons: [
      { code: 'CMP-01', slug: 'computer-architecture', title: 'Kompyuter arxitekturasi va apparat komponentlari', duration: '20 min', xp: 25, lab: 'linux-file-permissions' },
      { code: 'CMP-02', slug: 'os-kernel-user-mode', title: 'Operatsion tizim: Kernel vs User mode', duration: '25 min', xp: 25, lab: 'linux-processes' },
      { code: 'CMP-03', slug: 'file-systems-ntfs-ext4', title: 'Fayl tizimlari tushunchasi (NTFS, ext4, FAT32)', duration: '25 min', xp: 30, lab: 'linux-file-permissions' },
      { code: 'CMP-04', slug: 'memory-ram-cache', title: 'Xotira iyerarxiyasi, RAM va kesh arxitekturasi', duration: '20 min', xp: 25, lab: 'linux-processes' },
      { code: 'CMP-05', slug: 'binaries-executables', title: 'Dasturiy ta\'minot va ijro jarayoni (Compilers, Binaries)', duration: '30 min', xp: 30, lab: 'linux-bash-task' },
      { code: 'CMP-06', slug: 'processes-threads', title: 'Jarayonlar (Processes) va oqimlar (Threads)', duration: '25 min', xp: 30, lab: 'linux-processes' },
      { code: 'CMP-07', slug: 'io-drivers', title: 'Kiritish-chiqarish (I/O) va drayverlar arxitekturasi', duration: '20 min', xp: 25, lab: 'linux-logs' },
      { code: 'CMP-08', slug: 'bios-uefi-boot', title: 'BIOS, UEFI va xavfsiz yuklanish (Secure Boot)', duration: '25 min', xp: 35, lab: 'linux-security-audit' },
    ]
  },

  // 2: Linux Fundamentals (12)
  {
    pathSlug: 'linux-security',
    courseSlug: 'linux-fundamentals',
    courseTitle: 'Linux Fundamentals',
    courseDesc: 'Linux operatsion tizimi, terminal, fayllar, permissions, jarayonlar va xavfsizlik audit asoslari.',
    level: 'BEGINNER',
    hours: 20,
    prerequisites: ['Kompyuter asoslari'],
    quizXp: 25,
    completionXp: 75,
    lessons: [
      { code: 'LNX-01', slug: 'linux-in-cybersecurity', title: 'Linux nima va nima uchun cybersecurity\'da ishlatiladi', duration: '20 min', xp: 25, lab: 'linux-file-permissions' },
      { code: 'LNX-02', slug: 'terminal-basics', title: 'Terminal bilan ishlash asoslari', duration: '25 min', xp: 25, lab: 'linux-file-permissions' },
      { code: 'LNX-03', slug: 'navigation-pwd-ls-cd', title: 'Fayl tizimida harakatlanish: pwd, ls, cd', duration: '20 min', xp: 25, lab: 'linux-file-permissions' },
      { code: 'LNX-04', slug: 'files-directories-mgmt', title: 'Fayl va kataloglar bilan ishlash', duration: '25 min', xp: 30, lab: 'linux-file-permissions' },
      { code: 'LNX-05', slug: 'file-ops-cp-mv-rm-mkdir', title: 'Fayl amallari: cp, mv, rm, mkdir', duration: '25 min', xp: 30, lab: 'linux-file-permissions' },
      { code: 'LNX-06', slug: 'permissions-ownership', title: 'Permissions va ownership (chmod, chown, SUID)', duration: '35 min', xp: 35, lab: 'linux-file-permissions' },
      { code: 'LNX-07', slug: 'users-groups-management', title: 'Users va groups boshqaruvi', duration: '30 min', xp: 35, lab: 'linux-users-groups' },
      { code: 'LNX-08', slug: 'processes-management', title: 'Linux jarayonlari (ps, top, kill, pgrep)', duration: '30 min', xp: 35, lab: 'linux-processes' },
      { code: 'LNX-09', slug: 'services-logs', title: 'Services (systemd) va loglar (/var/log)', duration: '35 min', xp: 40, lab: 'linux-logs' },
      { code: 'LNX-10', slug: 'pipes-redirection', title: 'Pipes va I/O redirection (|, >, >>, 2>&1)', duration: '30 min', xp: 40, lab: 'linux-find-grep' },
      { code: 'LNX-11', slug: 'grep-find-sed-awk', title: 'Fayllardan qidiruv va filtrlash: grep, find, sed, awk', duration: '40 min', xp: 45, lab: 'linux-find-grep' },
      { code: 'LNX-12', slug: 'bash-fundamentals', title: 'Bash fundamentals va avtomatlashtirish skriptlari', duration: '45 min', xp: 50, lab: 'linux-bash-task' },
    ]
  },

  // 3: Networking Fundamentals (12)
  {
    pathSlug: 'network-security',
    courseSlug: 'networking-fundamentals',
    courseTitle: 'Networking Fundamentals',
    courseDesc: 'Kompyuter tarmoqlari, TCP/IP steki, DNS, marshrutlash va tarmoq trafigi tahlili.',
    level: 'BEGINNER',
    hours: 22,
    prerequisites: ['Kompyuter asoslari'],
    quizXp: 25,
    completionXp: 75,
    lessons: [
      { code: 'NET-01', slug: 'network-basics', title: 'Network asoslari va tarmoq topologiyalari', duration: '20 min', xp: 25, lab: 'network-recon-simulation' },
      { code: 'NET-02', slug: 'osi-tcpip-models', title: 'OSI va TCP/IP modellari', duration: '30 min', xp: 25, lab: 'network-recon-simulation' },
      { code: 'NET-03', slug: 'ipv4-subnetting', title: 'IPv4 va subnet (CIDR) tushunchasi', duration: '35 min', xp: 30, lab: 'network-recon-simulation' },
      { code: 'NET-04', slug: 'mac-arp-protocol', title: 'MAC manzillar va ARP protokoli', duration: '25 min', xp: 30, lab: 'pcap-investigation' },
      { code: 'NET-05', slug: 'tcp-protocol-handshake', title: 'TCP protokoli va 3-Way Handshake mexanikasi', duration: '35 min', xp: 35, lab: 'pcap-investigation' },
      { code: 'NET-06', slug: 'udp-protocol', title: 'UDP protokoli va uning xavfsizlikka ta\'siri', duration: '25 min', xp: 35, lab: 'pcap-investigation' },
      { code: 'NET-07', slug: 'ports-services', title: 'Portlar va standart servislar (Well-known ports)', duration: '30 min', xp: 35, lab: 'network-recon-simulation' },
      { code: 'NET-08', slug: 'dns-architecture', title: 'DNS (Domain Name System) arxitekturasi va xavflari', duration: '35 min', xp: 40, lab: 'suspicious-ip-analysis' },
      { code: 'NET-09', slug: 'dhcp-protocol', title: 'DHCP protokoli va IP konfiguratsiyasi', duration: '25 min', xp: 30, lab: 'network-recon-simulation' },
      { code: 'NET-10', slug: 'routing-gateways', title: 'Routing, NAT va shlyuzlar (Gateways)', duration: '35 min', xp: 40, lab: 'network-recon-simulation' },
      { code: 'NET-11', slug: 'http-traffic-analysis', title: 'HTTP tarmoq trafigi tahlili', duration: '35 min', xp: 40, lab: 'pcap-investigation' },
      { code: 'NET-12', slug: 'network-troubleshooting', title: 'Network troubleshooting va vositalar (ping, traceroute, nmap)', duration: '40 min', xp: 50, lab: 'network-recon-simulation' },
    ]
  },

  // 4: Internet & HTTP (10)
  {
    pathSlug: 'network-security',
    courseSlug: 'internet-http',
    courseTitle: 'Internet & HTTP Protokoli Xavfsizligi',
    courseDesc: 'HTTP/HTTPS, cookie, sessiyalar, xavfsizlik sarlavhalari va client-server muloqotining chuqur tahlili.',
    level: 'BEGINNER',
    hours: 18,
    prerequisites: ['Networking asoslari'],
    quizXp: 25,
    completionXp: 75,
    lessons: [
      { code: 'INT-01', slug: 'internet-architecture', title: 'Internet anatomiyasi va Web qanday ishlaydi', duration: '20 min', xp: 25, lab: 'security-headers' },
      { code: 'INT-02', slug: 'http-evolution', title: 'HTTP protokoli evolyutsiyasi (HTTP/1.1, HTTP/2, HTTP/3)', duration: '25 min', xp: 25, lab: 'security-headers' },
      { code: 'INT-03', slug: 'http-request-response-anatomy', title: 'HTTP so\'rov va javob anatomiyasi (Headers, Body)', duration: '30 min', xp: 30, lab: 'security-headers' },
      { code: 'INT-04', slug: 'http-methods-status-codes', title: 'HTTP metodlari va status kodlari xavfsizlik prizmasida', duration: '25 min', xp: 30, lab: 'security-headers' },
      { code: 'INT-05', slug: 'cookie-mechanisms-flags', title: 'Cookie mexanizmi va xavfsizlik bayroqlari (HttpOnly, Secure, SameSite)', duration: '35 min', xp: 35, lab: 'weak-session-handling' },
      { code: 'INT-06', slug: 'sessions-tokens', title: 'Sessiyalar boshqaruvi va tokenlar (Stateful vs Stateless)', duration: '30 min', xp: 35, lab: 'weak-session-handling' },
      { code: 'INT-07', slug: 'https-tls-handshake', title: 'HTTPS va TLS/SSL shifrlash qo\'l berishi (Handshake)', duration: '35 min', xp: 40, lab: 'security-headers' },
      { code: 'INT-08', slug: 'security-headers-csp-hsts', title: 'Xavfsizlik sarlavhalari: CSP, HSTS, X-Frame-Options', duration: '35 min', xp: 40, lab: 'security-headers' },
      { code: 'INT-09', slug: 'caching-information-leak', title: 'Veb kesh siyosati va ma\'lumotlar sizishi xavfi', duration: '25 min', xp: 35, lab: 'security-headers' },
      { code: 'INT-10', slug: 'websockets-sse', title: 'WebSockets va Server-Sent Events (SSE) protokollari', duration: '30 min', xp: 45, lab: 'websocket-security' },
    ]
  },

  // 5: Cybersecurity Fundamentals (10)
  {
    pathSlug: 'cyber-fundamentals',
    courseSlug: 'cybersecurity-fundamentals',
    courseTitle: 'Kiberxavfsizlik Asoslari & Tahdidlar Manzarasi',
    courseDesc: 'CIA uchligi, tahdidlar, zaifliklar, AAA ramkasi, kriptografiya va xavfsizlik madaniyati.',
    level: 'BEGINNER',
    hours: 16,
    prerequisites: ['Umumiy kompyuter tushunchalari'],
    quizXp: 25,
    completionXp: 75,
    lessons: [
      { code: 'SEC-01', slug: 'cia-triad', title: 'Kiberxavfsizlik uchligi (CIA Triad: Maxfiylik, Yaxlitlik, Ochiqlik)', duration: '20 min', xp: 25, lab: 'security-headers' },
      { code: 'SEC-02', slug: 'threat-landscape', title: 'Kiber tahdidlar landshafti (Malware, Ransomware, Phishing, APT)', duration: '25 min', xp: 25, lab: 'osint-investigation' },
      { code: 'SEC-03', slug: 'vuln-threat-exploit', title: 'Zaiflik (Vulnerability), Eksploit (Exploit) va Tahdid (Threat) farqi', duration: '20 min', xp: 25, lab: 'security-headers' },
      { code: 'SEC-04', slug: 'aaa-framework', title: 'Autentifikatsiya, Avtorizatsiya va Buxgalteriya (AAA Framework)', duration: '30 min', xp: 30, lab: 'auth-bypass-concepts' },
      { code: 'SEC-05', slug: 'mfa-2fa-security', title: 'Ko\'p faktorli autentifikatsiya (MFA/2FA) turlari va himoyasi', duration: '25 min', xp: 30, lab: 'auth-bypass-concepts' },
      { code: 'SEC-06', slug: 'social-engineering', title: 'Ijtimoiy muhandislik (Social Engineering) psixologiyasi', duration: '25 min', xp: 30, lab: 'osint-investigation' },
      { code: 'SEC-07', slug: 'cryptography-fundamentals', title: 'Kriptografiya asoslari: Shifrlash, Xeshlash va Raqamli Imzo', duration: '35 min', xp: 35, lab: 'hash-investigation' },
      { code: 'SEC-08', slug: 'perimeter-security-firewalls', title: 'Tarmoq perimetri xavfsizligi (Firewall, IDS/IPS, DMZ)', duration: '30 min', xp: 35, lab: 'network-recon-simulation' },
      { code: 'SEC-09', slug: 'zero-trust-architecture', title: 'Zero Trust arxitekturasi va eng kam imtiyozlilik tamoyili (Least Privilege)', duration: '25 min', xp: 35, lab: 'linux-file-permissions' },
      { code: 'SEC-10', slug: 'incident-response-lifecycle', title: 'Xavfsizlik hodisalariga javob berish (Incident Response Lifecycle)', duration: '30 min', xp: 40, lab: 'incident-timeline' },
    ]
  },

  // 6: Web Fundamentals (8)
  {
    pathSlug: 'web-pentest',
    courseSlug: 'web-fundamentals',
    courseTitle: 'Web Fundamentals',
    courseDesc: 'HTML, formalar, DOM, JavaScript, SOP, CORS va brauzer xavfsizlik arxitekturasi.',
    level: 'BEGINNER',
    hours: 14,
    prerequisites: ['Internet & HTTP asoslari'],
    quizXp: 20,
    completionXp: 50,
    lessons: [
      { code: 'WEB-01', slug: 'html-structure-security', title: 'HTML va sahifa tuzilishi xavfsizlik prizmasida', duration: '20 min', xp: 20, lab: 'reflected-xss' },
      { code: 'WEB-02', slug: 'forms-input-sanitization', title: 'Veb shakllar (HTML Forms) va kiritma tekshiruvi (Input Sanitization)', duration: '25 min', xp: 25, lab: 'sqli-login' },
      { code: 'WEB-03', slug: 'browser-dom-architecture', title: 'Brauzer DOM (Document Object Model) arxitekturasi', duration: '25 min', xp: 25, lab: 'dom-xss' },
      { code: 'WEB-04', slug: 'javascript-execution-context', title: 'JavaScript ijrosi va xavfsizlik konteksti (Execution Context)', duration: '30 min', xp: 30, lab: 'reflected-xss' },
      { code: 'WEB-05', slug: 'same-origin-policy', title: 'Bir xil manba siyosati (Same-Origin Policy - SOP)', duration: '30 min', xp: 30, lab: 'cors-misconfiguration' },
      { code: 'WEB-06', slug: 'cors-misconfigurations', title: 'Cross-Origin Resource Sharing (CORS) va zaifliklar', duration: '35 min', xp: 35, lab: 'cors-misconfiguration' },
      { code: 'WEB-07', slug: 'browser-storage-security', title: 'Brauzer xotirasi (LocalStorage, SessionStorage, IndexedDB)', duration: '25 min', xp: 25, lab: 'stored-xss-comments' },
      { code: 'WEB-08', slug: 'client-server-ajax-fetch', title: 'Client-Server muloqoti va AJAX/Fetch so\'rovlar tahlili', duration: '30 min', xp: 30, lab: 'reflected-xss' },
    ]
  },

  // 7: Web Pentest Fundamentals (12)
  {
    pathSlug: 'web-pentest',
    courseSlug: 'web-pentest-fundamentals',
    courseTitle: 'Web Pentest Fundamentals',
    courseDesc: 'Veb ilovalarni penetratsion testlash metodologiyasi, hujum yuzasi, Burp Suite va razvedka.',
    level: 'BEGINNER',
    hours: 24,
    prerequisites: ['Web Fundamentals'],
    quizXp: 30,
    completionXp: 100,
    lessons: [
      { code: 'WPT-01', slug: 'web-application-mechanics', title: 'Web application qanday ishlaydi', duration: '25 min', xp: 30, lab: 'reflected-xss' },
      { code: 'WPT-02', slug: 'http-traffic-intercept', title: 'HTTP request/response tahlili', duration: '25 min', xp: 30, lab: 'security-headers' },
      { code: 'WPT-03', slug: 'methods-status-security', title: 'Methods va status codes xavfsizligi', duration: '25 min', xp: 30, lab: 'security-headers' },
      { code: 'WPT-04', slug: 'headers-manipulation', title: 'HTTP Headers tahlili va manipulyatsiyasi', duration: '30 min', xp: 30, lab: 'security-headers' },
      { code: 'WPT-05', slug: 'cookies-sessions-attacks', title: 'Cookies va sessions xavfsizligi', duration: '30 min', xp: 35, lab: 'weak-session-handling' },
      { code: 'WPT-06', slug: 'authentication-testing', title: 'Authentication mexanizmlarini testlash', duration: '35 min', xp: 35, lab: 'auth-bypass-concepts' },
      { code: 'WPT-07', slug: 'authorization-testing', title: 'Authorization va kirish huquqlarini tekshirish', duration: '35 min', xp: 35, lab: 'idor-documents' },
      { code: 'WPT-08', slug: 'attack-surface-mapping', title: 'Attack surface (Hujum yuzasi) ni xaritalash', duration: '35 min', xp: 40, lab: 'web-attack-surface' },
      { code: 'WPT-09', slug: 'input-validation-probe', title: 'Input validation va parametrlarni zaxarlash', duration: '35 min', xp: 40, lab: 'sqli-login' },
      { code: 'WPT-10', slug: 'recon-fundamentals', title: 'Recon fundamentals (Passiv va faol razvedka)', duration: '40 min', xp: 45, lab: 'web-attack-surface' },
      { code: 'WPT-11', slug: 'burp-suite-fundamentals', title: 'Burp Suite fundamentals (Proxy, Repeater, Intruder)', duration: '45 min', xp: 50, lab: 'sqli-search' },
      { code: 'WPT-12', slug: 'web-pentest-methodology', title: 'Web pentest methodology va hisobot tayyorlash', duration: '50 min', xp: 60, lab: 'final-web-pentest-assessment' },
    ]
  },

  // 8: OWASP Web Security (18)
  {
    pathSlug: 'web-pentest',
    courseSlug: 'owasp-web-security',
    courseTitle: 'OWASP Web Security (Top Zaifliklar)',
    courseDesc: 'SQLi, XSS, CSRF, IDOR, SSRF, XXE, SSTI, Path Traversal, File Upload va boshqa muhim zaifliklar.',
    level: 'INTERMEDIATE',
    hours: 36,
    prerequisites: ['Web Pentest Fundamentals'],
    quizXp: 35,
    completionXp: 125,
    lessons: [
      { code: 'OW-01', slug: 'sqli-concepts', title: 'SQL Injection concepts & mexanika', duration: '30 min', xp: 40, lab: 'sqli-login' },
      { code: 'OW-02', slug: 'sql-query-logic', title: 'SQL query logic va sintaksis sindirish', duration: '35 min', xp: 40, lab: 'sqli-search' },
      { code: 'OW-03', slug: 'auth-sqli', title: 'Authentication-related SQLi (Login bypass)', duration: '35 min', xp: 50, lab: 'sqli-login' },
      { code: 'OW-04', slug: 'search-query-sqli', title: 'Search/query SQLi va UNION hujumlari', duration: '40 min', xp: 50, lab: 'sqli-data-extraction' },
      { code: 'OW-05', slug: 'xss-concepts', title: 'Cross-Site Scripting (XSS) concepts', duration: '30 min', xp: 40, lab: 'reflected-xss' },
      { code: 'OW-06', slug: 'reflected-xss-deep', title: 'Reflected XSS va parametrlar inyeksiyasi', duration: '35 min', xp: 50, lab: 'reflected-xss' },
      { code: 'OW-07', slug: 'stored-xss-deep', title: 'Stored XSS (Doimiy) va Cookie o\'g\'irlash', duration: '40 min', xp: 50, lab: 'stored-xss-comments' },
      { code: 'OW-08', slug: 'dom-xss-deep', title: 'DOM XSS va mijoz tomonidagi xavfli sinklar', duration: '45 min', xp: 60, lab: 'dom-xss' },
      { code: 'OW-09', slug: 'csrf-deep', title: 'Cross-Site Request Forgery (CSRF)', duration: '35 min', xp: 45, lab: 'csrf-profile' },
      { code: 'OW-10', slug: 'idor-bola-deep', title: 'IDOR / BOLA (Insecure Direct Object References)', duration: '40 min', xp: 50, lab: 'idor-documents' },
      { code: 'OW-11', slug: 'ssrf-deep', title: 'Server-Side Request Forgery (SSRF)', duration: '45 min', xp: 60, lab: 'ssrf-url-preview' },
      { code: 'OW-12', slug: 'xxe-deep', title: 'XML External Entity (XXE) Injection', duration: '45 min', xp: 60, lab: 'xxe-report-import' },
      { code: 'OW-13', slug: 'ssti-deep', title: 'Server-Side Template Injection (SSTI)', duration: '45 min', xp: 60, lab: 'ssti-template' },
      { code: 'OW-14', slug: 'path-traversal-deep', title: 'Path Traversal va fayl tizimidan sizish', duration: '35 min', xp: 50, lab: 'path-traversal' },
      { code: 'OW-15', slug: 'file-upload-security', title: 'File Upload Security va Web Shell yuklash', duration: '40 min', xp: 50, lab: 'file-upload' },
      { code: 'OW-16', slug: 'command-injection-deep', title: 'Command Injection concepts va OS buyruq bajarish', duration: '45 min', xp: 60, lab: 'command-injection-concepts' },
      { code: 'OW-17', slug: 'security-misconfiguration', title: 'Security Misconfiguration va zaif defaultlar', duration: '30 min', xp: 40, lab: 'security-headers' },
      { code: 'OW-18', slug: 'business-logic-vulns', title: 'Business Logic vulnerabilities va narx manipulyatsiyasi', duration: '50 min', xp: 70, lab: 'business-logic-coupon' },
    ]
  },

  // 9: Authentication & Authorization (10)
  {
    pathSlug: 'web-pentest',
    courseSlug: 'auth-authorization',
    courseTitle: 'Authentication & Authorization Xavfsizligi',
    courseDesc: 'Parollar, sessiyalar boshqaruvi, access control, RBAC, OAuth 2.0 va JWT zaifliklari.',
    level: 'INTERMEDIATE',
    hours: 20,
    prerequisites: ['OWASP Web Security'],
    quizXp: 30,
    completionXp: 100,
    lessons: [
      { code: 'AUT-01', slug: 'password-storage-hashing', title: 'Parol xavfsizligi va xeshlash (Bcrypt, Argon2)', duration: '25 min', xp: 30, lab: 'hash-investigation' },
      { code: 'AUT-02', slug: 'brute-force-rate-limiting', title: 'Brute-force va rate limiting mexanizmlari', duration: '30 min', xp: 30, lab: 'api-rate-limit' },
      { code: 'AUT-03', slug: 'session-hijacking-fixation', title: 'Sessiyani o\'g\'irlash (Session Hijacking & Fixation)', duration: '35 min', xp: 35, lab: 'weak-session-handling' },
      { code: 'AUT-04', slug: 'cookie-security-audits', title: 'Cookie xavfsizligi va bayroqlar auditi', duration: '30 min', xp: 30, lab: 'weak-session-handling' },
      { code: 'AUT-05', slug: 'mfa-totp-webauthn', title: 'Ko\'p faktorli autentifikatsiya (TOTP, WebAuthn)', duration: '30 min', xp: 35, lab: 'auth-bypass-concepts' },
      { code: 'AUT-06', slug: 'access-control-models', title: 'Ruxsat modellari (RBAC, ABAC, Least Privilege)', duration: '30 min', xp: 30, lab: 'idor-documents' },
      { code: 'AUT-07', slug: 'idor-bola-access-control', title: 'IDOR/BOLA orqali avtorizatsiyani buzish', duration: '35 min', xp: 35, lab: 'idor-documents' },
      { code: 'AUT-08', slug: 'bfla-broken-function-level', title: 'BFLA: Funksiya darajasidagi ruxsat buzilishi', duration: '35 min', xp: 35, lab: 'idor-orders' },
      { code: 'AUT-09', slug: 'oauth2-openid-connect', title: 'OAuth 2.0 va OpenID Connect oqimlari va zaifliklari', duration: '40 min', xp: 40, lab: 'open-redirect' },
      { code: 'AUT-10', slug: 'jwt-attacks-architecture', title: 'JSON Web Tokens (JWT) arxitekturasi va hujumlari', duration: '45 min', xp: 45, lab: 'jwt-security' },
    ]
  },

  // 10: API Security (12)
  {
    pathSlug: 'web-pentest',
    courseSlug: 'api-security',
    courseTitle: 'API Security & REST / GraphQL Zaifliklari',
    courseDesc: 'REST API, OWASP API Top 10, BOLA, Mass Assignment, GraphQL introspection va himoyalanish.',
    level: 'ADVANCED',
    hours: 24,
    prerequisites: ['Authentication & Authorization'],
    quizXp: 30,
    completionXp: 100,
    lessons: [
      { code: 'API-01', slug: 'rest-api-architecture', title: 'REST API arxitekturasi va xavfsizlik tamoyillari', duration: '25 min', xp: 30, lab: 'bola-api' },
      { code: 'API-02', slug: 'owasp-api-top-10', title: 'OWASP API Security Top 10 umumiy tahlili', duration: '30 min', xp: 30, lab: 'bola-api' },
      { code: 'API-03', slug: 'bola-api-deep', title: 'Broken Object Level Authorization (BOLA) chuqur tahlili', duration: '35 min', xp: 35, lab: 'bola-api' },
      { code: 'API-04', slug: 'broken-api-authentication', title: 'Buzilgan foydalanuvchi autentifikatsiyasi', duration: '35 min', xp: 35, lab: 'jwt-security' },
      { code: 'API-05', slug: 'excessive-data-exposure', title: 'Haddan tashqari ma\'lumotlar oshkorligi', duration: '30 min', xp: 30, lab: 'bola-api' },
      { code: 'API-06', slug: 'lack-of-rate-limiting', title: 'Resurslar va cheklovlarning yetishmasligi', duration: '30 min', xp: 30, lab: 'api-rate-limit' },
      { code: 'API-07', slug: 'mass-assignment-vuln', title: 'Mass Assignment zaifligi va parametr filtratsiyasi', duration: '35 min', xp: 35, lab: 'api-mass-assignment' },
      { code: 'API-08', slug: 'api-security-misconfig', title: 'API xavfsizlik sozlamalaridagi xatolar', duration: '30 min', xp: 30, lab: 'cors-misconfiguration' },
      { code: 'API-09', slug: 'improper-assets-management', title: 'Noto\'g\'ri aktivlar boshqaruvi & Shadow APIs', duration: '35 min', xp: 35, lab: 'bola-api' },
      { code: 'API-10', slug: 'graphql-introspection-dos', title: 'GraphQL asoslari, Introspection va DoS', duration: '40 min', xp: 40, lab: 'graphql-security' },
      { code: 'API-11', slug: 'graphql-field-level-auth', title: 'GraphQL Field-Level Authorization tahlili', duration: '45 min', xp: 45, lab: 'graphql-authorization' },
      { code: 'API-12', slug: 'automated-api-testing', title: 'API xavfsizligini avtomatlashtirilgan testlash', duration: '40 min', xp: 45, lab: 'final-web-pentest-assessment' },
    ]
  },

  // 11: Advanced Web Pentest (14)
  {
    pathSlug: 'web-pentest',
    courseSlug: 'advanced-web-pentest',
    courseTitle: 'Advanced Web Pentest & Ekspluatatsiya',
    courseDesc: 'Biznes mantiq, Race Conditions, SSRF, XXE, SSTI, WebSocket va murakkab exploit zanjirlari.',
    level: 'EXPERT',
    hours: 30,
    prerequisites: ['OWASP Web Security', 'API Security'],
    quizXp: 40,
    completionXp: 150,
    lessons: [
      { code: 'AWP-01', slug: 'business-logic-flaws', title: 'Biznes mantiq (Business Logic) zaifliklari anatomiyasi', duration: '35 min', xp: 40, lab: 'business-logic-coupon' },
      { code: 'AWP-02', slug: 'price-tampering-invoices', title: 'Narx manipulyatsiyasi va hisob-faktura buzilishlari', duration: '40 min', xp: 45, lab: 'business-logic-payment' },
      { code: 'AWP-03', slug: 'coupon-voucher-replay', title: 'Chegirma kuponlari va vaucherlarni takroriy qo\'llash', duration: '35 min', xp: 40, lab: 'business-logic-coupon' },
      { code: 'AWP-04', slug: 'race-conditions-limit-overrun', title: 'Poyga sharoitlari (Race Conditions: Limit Overrun)', duration: '45 min', xp: 50, lab: 'race-condition' },
      { code: 'AWP-05', slug: 'single-packet-attack', title: 'Single-Packet hujum metodologiyasi (HTTP/2)', duration: '45 min', xp: 50, lab: 'race-condition' },
      { code: 'AWP-06', slug: 'advanced-ssrf-cloud', title: 'Server-Side Request Forgery (SSRF) chuqur tahlili', duration: '45 min', xp: 50, lab: 'ssrf-internal-service' },
      { code: 'AWP-07', slug: 'cloud-metadata-ssrf', title: 'Bulutli metadata (AWS/Azure/GCP) xizmatlariga SSRF', duration: '50 min', xp: 55, lab: 'ssrf-internal-service' },
      { code: 'AWP-08', slug: 'blind-xxe-exfiltration', title: 'XML External Entity (XXE) va Blind XXE hujumlari', duration: '45 min', xp: 50, lab: 'xxe-report-import' },
      { code: 'AWP-09', slug: 'ssti-template-engines', title: 'Server-Side Template Injection (SSTI) Jinja2, Twig', duration: '45 min', xp: 50, lab: 'ssti-template' },
      { code: 'AWP-10', slug: 'ssti-to-rce', title: 'SSTI orqali masofaviy kod bajarish (RCE)', duration: '55 min', xp: 60, lab: 'ssti-advanced' },
      { code: 'AWP-11', slug: 'cswsh-websocket-hijack', title: 'WebSockets xavfsizligi va CSWSH', duration: '45 min', xp: 50, lab: 'websocket-security' },
      { code: 'AWP-12', slug: 'http-request-smuggling', title: 'HTTP Request Smuggling (CL.TE, TE.CL) asoslari', duration: '50 min', xp: 55, lab: 'security-headers' },
      { code: 'AWP-13', slug: 'insecure-deserialization', title: 'Insecure Deserialization (Python pickle, PHP)', duration: '50 min', xp: 55, lab: 'ssti-advanced' },
      { code: 'AWP-14', slug: 'pentest-reporting-remediation', title: 'Katta veb pentest hisoboti va remediation strategiyasi', duration: '60 min', xp: 60, lab: 'final-web-pentest-assessment' },
    ]
  },

  // 12: Recon & OSINT (10)
  {
    pathSlug: 'cyber-fundamentals',
    courseSlug: 'recon-osint',
    courseTitle: 'Recon & OSINT (Kiber Razvedka)',
    courseDesc: 'Ochiq manbalar razvedkasi (OSINT), passiv va faol qidiruv, subdomenlar, Shodan va metadata tahlili.',
    level: 'INTERMEDIATE',
    hours: 20,
    prerequisites: ['Networking Fundamentals'],
    quizXp: 25,
    completionXp: 100,
    lessons: [
      { code: 'OSN-01', slug: 'recon-fundamentals-passive-active', title: 'Passiv va faol razvedka farqi (Reconnaissance)', duration: '20 min', xp: 25, lab: 'osint-investigation' },
      { code: 'OSN-02', slug: 'domain-dns-recon', title: 'Domen va DNS razvedkasi (Whois, DNS records)', duration: '25 min', xp: 25, lab: 'osint-investigation' },
      { code: 'OSN-03', slug: 'subdomain-enumeration', title: 'Subdomain enumeration (crt.sh, amass, subfinder)', duration: '35 min', xp: 30, lab: 'web-attack-surface' },
      { code: 'OSN-04', slug: 'google-dorking-deep', title: 'Web qidiruv tizimlari dorkingi (Google Dorks)', duration: '30 min', xp: 30, lab: 'metadata-osint' },
      { code: 'OSN-05', slug: 'shodan-censys-scans', title: 'Shodan, Censys va ochiq tarmoq qurilmalari qidiruvi', duration: '35 min', xp: 35, lab: 'network-recon-simulation' },
      { code: 'OSN-06', slug: 'github-leaks-trufflehog', title: 'GitHub omborlarida maxfiy kalitlarni aniqlash', duration: '30 min', xp: 30, lab: 'osint-investigation' },
      { code: 'OSN-07', slug: 'exif-file-metadata-recon', title: 'Fayllar metadatasi (EXIF) orqali kiber razvedka', duration: '25 min', xp: 25, lab: 'file-metadata-investigation' },
      { code: 'OSN-08', slug: 'human-osint-social-media', title: 'Inson omili OSINT (LinkedIn, ijtimoiy tarmoqlar)', duration: '30 min', xp: 30, lab: 'osint-investigation' },
      { code: 'OSN-09', slug: 'tech-stack-fingerprinting', title: 'Web texnologiyalar stackini aniqlash (Wappalyzer)', duration: '25 min', xp: 25, lab: 'web-attack-surface' },
      { code: 'OSN-10', slug: 'attack-surface-mapping-recon', title: 'Hujum yuzasini xaritalash (Attack Surface Mapping)', duration: '35 min', xp: 35, lab: 'web-attack-surface' },
    ]
  },

  // 13: CTF Fundamentals (12)
  {
    pathSlug: 'ctf-challenge',
    courseSlug: 'ctf-fundamentals',
    courseTitle: 'CTF Fundamentals & Musobaqalar Taktikasi',
    courseDesc: 'Jeopardy vs Attack-Defense, Web, Linux, Crypto, Forensics va flaglarni topish strategiyalari.',
    level: 'INTERMEDIATE',
    hours: 24,
    prerequisites: ['Linux & Web Fundamentals'],
    quizXp: 30,
    completionXp: 100,
    lessons: [
      { code: 'CTF-01', slug: 'ctf-overview-categories', title: 'Capture The Flag nima? Musobaqa turlari', duration: '20 min', xp: 25, lab: 'ctf-web-challenge' },
      { code: 'CTF-02', slug: 'flag-formats-rules', title: 'Flag formatlari, qoidalari va birinchi qon (First Blood)', duration: '20 min', xp: 25, lab: 'ctf-web-challenge' },
      { code: 'CTF-03', slug: 'web-ctf-methodology', title: 'Web CTF topshiriqlari metodikasi (Source review, Cookie)', duration: '35 min', xp: 30, lab: 'ctf-web-challenge' },
      { code: 'CTF-04', slug: 'classical-cryptography', title: 'Kriptografiya asoslari (Sezar, Vigenere, XOR)', duration: '30 min', xp: 30, lab: 'hash-investigation' },
      { code: 'CTF-05', slug: 'modern-crypto-rsa-basics', title: 'Zamonaviy RSA shifrlash va zaif kalitlar', duration: '40 min', xp: 35, lab: 'hash-investigation' },
      { code: 'CTF-06', slug: 'steganography-basics', title: 'Raqamli steganografiya (Rasmlar, audiolardagi sirlar)', duration: '30 min', xp: 30, lab: 'file-metadata-investigation' },
      { code: 'CTF-07', slug: 'forensics-ctf-tasks', title: 'Forenzika topshiriqlari (Fayl formatlari, magic bytes)', duration: '35 min', xp: 35, lab: 'ctf-forensics-challenge' },
      { code: 'CTF-08', slug: 'network-pcap-ctf', title: 'Tarmoq trafigini tahlil qilish (PCAP file analysis)', duration: '35 min', xp: 35, lab: 'pcap-investigation' },
      { code: 'CTF-09', slug: 'linux-priv-esc-ctf', title: 'Linux imtiyozlarini oshirish (Privilege Escalation)', duration: '40 min', xp: 40, lab: 'ctf-linux-challenge' },
      { code: 'CTF-10', slug: 'reverse-engineering-basics', title: 'Reverse Engineering asoslari (strings, Ghidra)', duration: '45 min', xp: 45, lab: 'malware-triage-concepts' },
      { code: 'CTF-11', slug: 'scripting-automation-pwntools', title: 'Skript yozish va avtomatlashtirish (Python pwntools)', duration: '40 min', xp: 40, lab: 'linux-bash-task' },
      { code: 'CTF-12', slug: 'time-management-strategy', title: 'CyberTrip CTF maydoni strategiyasi va vaqt boshqaruvi', duration: '30 min', xp: 35, lab: 'ctf-web-challenge' },
    ]
  },

  // 14: Digital Forensics (12)
  {
    pathSlug: 'soc-blue-team',
    courseSlug: 'digital-forensics',
    courseTitle: 'Digital Forensics (Raqamli Kriminalistika)',
    courseDesc: 'Dalillar yig\'ish, Chain of Custody, xotira va disk tahlili, loglar va insident xronologiyasi.',
    level: 'ADVANCED',
    hours: 26,
    prerequisites: ['Linux & Networking'],
    quizXp: 30,
    completionXp: 100,
    lessons: [
      { code: 'FOR-01', slug: 'forensics-principles-custody', title: 'Raqamli kriminalistika asoslari va Chain of Custody', duration: '25 min', xp: 25, lab: 'incident-timeline' },
      { code: 'FOR-02', slug: 'disk-imaging-evidence', title: 'Dalillarni yig\'ish va disk tasvirlarini olish (dd, FTK)', duration: '35 min', xp: 30, lab: 'file-metadata-investigation' },
      { code: 'FOR-03', slug: 'file-system-forensics', title: 'Fayl tizimlari kriminalistikasi (Inodes, MFT)', duration: '35 min', xp: 30, lab: 'file-metadata-investigation' },
      { code: 'FOR-04', slug: 'memory-acquisition-dumps', title: 'Xotira tahlili asoslari (RAM Acquisition & Dump)', duration: '40 min', xp: 35, lab: 'ctf-forensics-challenge' },
      { code: 'FOR-05', slug: 'volatility-framework', title: 'Volatility vositasi yordamida xotirani tahlil qilish', duration: '45 min', xp: 40, lab: 'ctf-forensics-challenge' },
      { code: 'FOR-06', slug: 'network-forensics-pcap', title: 'Tarmoq kriminalistikasi: PCAP paketlar va Wireshark', duration: '35 min', xp: 35, lab: 'pcap-investigation' },
      { code: 'FOR-07', slug: 'web-server-log-forensics', title: 'Web server jurnallari (Apache, Nginx) tahlili', duration: '35 min', xp: 35, lab: 'web-log-investigation' },
      { code: 'FOR-08', slug: 'windows-event-logs', title: 'Windows hodisalar jurnali (EVTX tahlili)', duration: '35 min', xp: 35, lab: 'incident-timeline' },
      { code: 'FOR-09', slug: 'linux-audit-logs', title: 'Linux audit jurnallari (/var/log, auth.log, syslog)', duration: '35 min', xp: 35, lab: 'linux-logs' },
      { code: 'FOR-10', slug: 'malware-triage-static', title: 'Zararli dasturlar (Malware) statik tahlili va triaj', duration: '45 min', xp: 40, lab: 'malware-triage-concepts' },
      { code: 'FOR-11', slug: 'incident-timeline-reconstruction', title: 'Hodisa xronologiyasini tuzish (Timeline Analysis)', duration: '40 min', xp: 40, lab: 'incident-timeline' },
      { code: 'FOR-12', slug: 'forensics-reporting', title: 'Kriminalistik ekspertiza hisobotini tayyorlash', duration: '35 min', xp: 35, lab: 'incident-timeline' },
    ]
  },

  // 15: Blue Team / SOC (12)
  {
    pathSlug: 'soc-blue-team',
    courseSlug: 'blue-team-soc',
    courseTitle: 'Blue Team & SOC (Xavfsizlik Operatsiyalari)',
    courseDesc: 'SIEM tizimlari, log monitoring, deteksiya muhandisligi, MITRE ATT&CK va insidentlarga javob qaytarish.',
    level: 'ADVANCED',
    hours: 28,
    prerequisites: ['Digital Forensics'],
    quizXp: 30,
    completionXp: 100,
    lessons: [
      { code: 'SOC-01', slug: 'soc-architecture-roles', title: 'Xavfsizlik Operatsion Markazi (SOC) arxitekturasi', duration: '25 min', xp: 25, lab: 'suspicious-ip-analysis' },
      { code: 'SOC-02', slug: 'siem-systems-overview', title: 'SIEM tizimlari tushunchasi (Splunk, Elastic, Wazuh)', duration: '35 min', xp: 30, lab: 'web-log-investigation' },
      { code: 'SOC-03', slug: 'log-centralization-parsing', title: 'Loglarni markazlashtirish va normalizatsiya', duration: '35 min', xp: 30, lab: 'web-log-investigation' },
      { code: 'SOC-04', slug: 'detection-engineering-sigma', title: 'Deteksiya muhandisligi va Sigma qoidalari', duration: '40 min', xp: 35, lab: 'suspicious-ip-analysis' },
      { code: 'SOC-05', slug: 'mitre-attck-matrix', title: 'MITRE ATT&CK matritsasi va TTP lar', duration: '35 min', xp: 35, lab: 'incident-timeline' },
      { code: 'SOC-06', slug: 'detecting-brute-force', title: 'Brute-Force va kirish urinishlarini aniqlash', duration: '35 min', xp: 35, lab: 'linux-logs' },
      { code: 'SOC-07', slug: 'detecting-lateral-movement', title: 'Zararli dastur tarqalishini fosh etish', duration: '40 min', xp: 40, lab: 'suspicious-ip-analysis' },
      { code: 'SOC-08', slug: 'data-exfiltration-alerts', title: 'Ma\'lumot sizishi va exfiltration signallari', duration: '35 min', xp: 35, lab: 'suspicious-ip-analysis' },
      { code: 'SOC-09', slug: 'edr-technologies', title: 'Endpoint Detection and Response (EDR) texnologiyalari', duration: '35 min', xp: 35, lab: 'linux-investigation' },
      { code: 'SOC-10', slug: 'incident-response-phases', title: 'Hodisalarga javob berish (Incident Response) bosqichlari', duration: '40 min', xp: 40, lab: 'incident-timeline' },
      { code: 'SOC-11', slug: 'threat-hunting-methodology', title: 'Tahdidlarni ovlash (Threat Hunting) metodologiyasi', duration: '45 min', xp: 45, lab: 'suspicious-ip-analysis' },
      { code: 'SOC-12', slug: 'post-incident-hardening', title: 'Post-Incident Review va tizimni mustahkamlash', duration: '35 min', xp: 40, lab: 'linux-security-audit' },
    ]
  }
];

// Helper to generate quiz questions and practice task
function generateQuizAndPractice(lesson) {
  const code = lesson.code;
  const title = lesson.title;
  return {
    quiz: {
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: `${title} mavzusi bo'yicha eng muhim xavfsizlik parametri qaysi?`,
          options: [
            "Kiritilgan barcha ma'lumotlarni server darajasida qat'iy tekshirish va filtrlash",
            "Mijoz brauzeridagi tekshiruvlarga to'liq ishonish",
            "Xatolik xabarlarini foydalanuvchiga to'liq ochiq ko'rsatish",
            "Standart parol va kalitlarni o'zgartirmasdan qoldirish"
          ],
          correctAnswer: 0,
          explanation: "Axborot xavfsizligida har qanday kiruvchi ma'lumot potentsial xavfli hisoblanadi va server tomonida sanitizatsiya qilinishi shart."
        },
        {
          id: 2,
          question: `Ushbu modulda (${code}) tajovuzkorlarning asosiy maqsadi nimadan iborat?`,
          options: [
            "Tizim ruxsatlarini buzish, ma'lumotlarni o'g'irlash yoki ruxsatsiz buyruq ijro etish",
            "Saytning ranglar palitrasini o'zgartirish",
            "Faqatgina tarmoq tezligini oshirish",
            "Brauzer keshini tozalash"
          ],
          correctAnswer: 0,
          explanation: "Kiberhujumchilar avtorizatsiyani aylanib o'tish, maxfiy ma'lumotlarni tortib olish va tizimda imtiyozlarni oshirishga intiladilar."
        },
        {
          id: 3,
          question: "Ushbu xavfga qarshi eng samarali himoya chorasi (Mitigation) nima?",
          options: [
            "Eng kam imtiyozlar tamoyili (Least Privilege) va ko'p bosqichli chuqurlashtirilgan himoya (Defense in Depth)",
            "Hech qanday o'zgarish qilmaslik",
            "Faqatgina kuchli antivirus o'rnatish",
            "Portlarni ochiq qoldirish"
          ],
          correctAnswer: 0,
          explanation: "Defense-in-depth tamoyiliga ko'ra tizim har bir qatlamda (tarmoq, OS, baza, ilova) mustahkam himoyalangan bo'lishi lozim."
        }
      ]
    },
    practice: {
      title: `${title} bo'yicha Amaliy Mashq`,
      type: code.startsWith('LNX') ? 'TERMINAL_COMMAND' : code.startsWith('NET') ? 'REQUEST_ANALYSIS' : 'PAYLOAD_CRAFT',
      instructions: `Ushbu darsda o'rganilgan ${title} konsepsiyasini amalda sinab ko'ring. Quyidagi parametrni to'g'rilab xavfsizlik tahlilini bajaring.`,
      initialInput: code.startsWith('LNX') ? 'ls -la /var/log' : code.startsWith('OW') ? "' OR '1'='1" : "GET /api/v1/resource HTTP/1.1",
      expectedAnswer: code.startsWith('LNX') ? 'chmod' : 'success',
      hints: [
        "Dars nazariyasidagi sintaksis qoidalariga e'tibor bering.",
        "Parametrlarni URL-encode yoki bash quvurlari bilan uzating."
      ],
      solutionExplanation: "To'g'ri bajarilgan tahlil orqali zaiflik darhol fosh etiladi va tizim holati xavfsiz holatga keltiriladi."
    }
  };
}

// Generate code content
let output = `// Auto-generated CYBERTRIP.UZ Master Curriculum Data
// 15 Courses, 172 Lessons, Full Educational Pipeline (O'rganish -> Quiz -> Practice -> Lab -> Verify -> XP)

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PracticeTask {
  title: string;
  instructions: string;
  type: 'REQUEST_ANALYSIS' | 'PAYLOAD_CRAFT' | 'TERMINAL_COMMAND' | 'CODE_REVIEW';
  initialInput?: string;
  expectedAnswer?: string;
  hints: string[];
  solutionExplanation: string;
}

export interface LessonData {
  slug: string;
  code: string;
  title: string;
  duration: string;
  xp: number;
  isPremium?: boolean;
  summary: string;
  quizXp: number;
  completionXp: number;
  linkedLabSlug?: string;
  content: {
    overview: string;
    keyConcepts: Array<{ term: string; definition: string }>;
    codeExample?: {
      language: string;
      title: string;
      code: string;
      explanation: string;
    };
    attackScenario?: {
      title: string;
      steps: string[];
      samplePayload: string;
    };
    defenseRecommendations: string[];
  };
  quiz?: {
    passingScore: number;
    questions: QuizQuestion[];
  };
  practice?: PracticeTask;
}

export interface ModuleData {
  slug: string;
  title: string;
  description: string;
  lessons: LessonData[];
}

export interface CourseData {
  slug: string;
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  hours: number;
  prerequisites: string[];
  quizXp: number;
  completionXp: number;
  modules: ModuleData[];
}

export interface PathData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  hours: number;
  coursesCount: number;
  badgeColor: string;
  iconName: string;
  skills: string[];
  courses: CourseData[];
}

export const CURRICULUM_DATA: Record<string, PathData> = {
`;

// Paths definition map
const pathsDef = {
  'web-pentest': {
    slug: 'web-pentest',
    title: "Web Pentest & OWASP Top 10",
    subtitle: "Veb ilovalar zaifliklarini professional aniqlash va xavfsizligini ta'minlash",
    description: "Hozirgi kunda dunyodagi kiber-hujumlarning 80% dan ortig'i veb-ilovalarga qaratilgan. Ushbu yo'nalishda siz HTTP protokolidan boshlab, SQL Injection, XSS, SSRF, IDOR va API xavfsizligini real laboratoriyalarda o'rganasiz.",
    level: 'INTERMEDIATE',
    hours: 144,
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    iconName: 'Globe',
    skills: ['SQL Injection', 'XSS Exploitation', 'IDOR / BOLA', 'SSRF', 'Burp Suite', 'OWASP Top 10', 'API Hacking'],
  },
  'linux-security': {
    slug: 'linux-security',
    title: "Linux & Tizim Xavfsizligi",
    subtitle: "Terminaldan boshlab tizim auditiga qadar to'liq Linux kursi",
    description: "Kiberxavfsizlik olamida Linux yetakchi operatsion tizimdir. Ushbu yo'nalishda terminal amallari, ruxsatlar boshqaruvi, jarayonlar monitoringi va xavfsizlik auditini o'zlashtirasiz.",
    level: 'BEGINNER',
    hours: 30,
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    iconName: 'Terminal',
    skills: ['Bash Scripting', 'Linux Permissions', 'Process Auditing', 'SUID Privileges', 'System Hardening'],
  },
  'network-security': {
    slug: 'network-security',
    title: "Tarmoq Xavfsizligi & Tahlil",
    subtitle: "TCP/IP protokollari, paketlar tahlili va tarmoq mudofaasi",
    description: "Tarmoqsiz axborot xavfsizligini tasavvur qilib bo'lmaydi. OSI modeli, TCP 3-Way Handshake, DNS xavfsizligi, Wireshark va Nmap yordamida paketlar darajasida tahlil qilishni o'rganasiz.",
    level: 'BEGINNER',
    hours: 40,
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    iconName: 'Activity',
    skills: ['TCP/IP Stack', 'Wireshark Analysis', 'Nmap Scanning', 'DNS Security', 'Subnetting'],
  },
  'cyber-fundamentals': {
    slug: 'cyber-fundamentals',
    title: "Kiberxavfsizlik Asoslari & OSINT",
    subtitle: "Kiber tahdidlar landshafti, xavfsizlik madaniyati va ochiq manbalar razvedkasi",
    description: "Kiberxavfsizlik asosiy prinsiplari (CIA Triad), ijtimoiy muhandislik, AAA ramkasi va OSINT orqali internetdagi ochiq ma'lumotlarni qidirish hamda tahlil qilish mahorati.",
    level: 'BEGINNER',
    hours: 36,
    badgeColor: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
    iconName: 'Shield',
    skills: ['CIA Triad', 'OSINT Recon', 'Threat Modeling', 'Google Dorking', 'Social Engineering'],
  },
  'soc-blue-team': {
    slug: 'soc-blue-team',
    title: "SOC & Blue Team Himoyasi",
    subtitle: "Xavfsizlik monitoringi, SIEM, hodisalarga javob berish va kriminalistika",
    description: "Hujumlarni real vaqt rejimida aniqlash (Detection Engineering), hodisalarga javob qaytarish (Incident Response), SIEM qoidalari va xotira kriminalistikasi (Volatility).",
    level: 'ADVANCED',
    hours: 54,
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    iconName: 'Activity',
    skills: ['SIEM Architecture', 'Digital Forensics', 'Incident Response', 'PCAP Analysis', 'Volatility Memory'],
  },
  'ctf-challenge': {
    slug: 'ctf-challenge',
    title: "CTF & Amaliy Kiber-Musobaqalar",
    subtitle: "Capture The Flag musobaqalari metodologiyasi va jangovar tayyorgarlik",
    description: "O'zbekistondagi va xalqaro CTF musobaqalarida g'alaba qozonish sirlari: Web, Crypto, Reverse, Forensics va Pwn toifalaridagi flaglarni yechish strategiyasi.",
    level: 'INTERMEDIATE',
    hours: 24,
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    iconName: 'Terminal',
    skills: ['Jeopardy CTF', 'Web Exploitation', 'Crypto Cracking', 'Privilege Escalation', 'Steganography'],
  },
};

// Assemble paths and courses
for (const [pathSlug, pDef] of Object.entries(pathsDef)) {
  const pathCourses = coursesDefinition.filter(c => c.pathSlug === pathSlug);
  
  output += `  '${pathSlug}': {\n`;
  output += `    slug: '${pDef.slug}',\n`;
  output += `    title: "${pDef.title}",\n`;
  output += `    subtitle: "${pDef.subtitle}",\n`;
  output += `    description: "${pDef.description}",\n`;
  output += `    level: '${pDef.level}',\n`;
  output += `    hours: ${pDef.hours},\n`;
  output += `    coursesCount: ${pathCourses.length},\n`;
  output += `    badgeColor: '${pDef.badgeColor}',\n`;
  output += `    iconName: '${pDef.iconName}',\n`;
  output += `    skills: ${JSON.stringify(pDef.skills)},\n`;
  output += `    courses: [\n`;

  for (const c of pathCourses) {
    output += `      {\n`;
    output += `        slug: '${c.courseSlug}',\n`;
    output += `        title: "${c.courseTitle}",\n`;
    output += `        description: "${c.courseDesc}",\n`;
    output += `        level: '${c.level}',\n`;
    output += `        hours: ${c.hours},\n`;
    output += `        prerequisites: ${JSON.stringify(c.prerequisites)},\n`;
    output += `        quizXp: ${c.quizXp},\n`;
    output += `        completionXp: ${c.completionXp},\n`;
    output += `        modules: [\n`;

    // Group lessons into 2 modules
    const half = Math.ceil(c.lessons.length / 2);
    const mod1Lessons = c.lessons.slice(0, half);
    const mod2Lessons = c.lessons.slice(half);

    const modules = [
      { slug: `${c.courseSlug}-mod-1`, title: '1-Modul: Asosiy Konsepsiyalar & Mexanika', desc: 'Mavzuning nazariy poydevori va arxitekturaviy tahlili', lessons: mod1Lessons },
      { slug: `${c.courseSlug}-mod-2`, title: '2-Modul: Amaliy Tahlil & Eksploitatsiya', desc: 'Real ssenariylar, zaifliklarni aniqlash va himoya choralari', lessons: mod2Lessons },
    ];

    for (const m of modules) {
      if (m.lessons.length === 0) continue;
      output += `          {\n`;
      output += `            slug: '${m.slug}',\n`;
      output += `            title: "${m.title}",\n`;
      output += `            description: "${m.desc}",\n`;
      output += `            lessons: [\n`;

      for (let i = 0; i < m.lessons.length; i++) {
        const l = m.lessons[i];
        const isPrem = (c.level === 'ADVANCED' || c.level === 'EXPERT' || i > 5);
        const { quiz, practice } = generateQuizAndPractice(l);

        output += `              {\n`;
        output += `                slug: '${l.slug}',\n`;
        output += `                code: '${l.code}',\n`;
        output += `                title: "${l.code}: ${l.title}",\n`;
        output += `                duration: '${l.duration}',\n`;
        output += `                xp: ${l.xp},\n`;
        output += `                isPremium: ${isPrem},\n`;
        output += `                quizXp: ${c.quizXp},\n`;
        output += `                completionXp: ${c.completionXp},\n`;
        output += `                linkedLabSlug: '${l.lab}',\n`;
        output += `                summary: "${l.title} bo'yicha nazariy tushunchalar, real kiber-hujum namunalari va amaliy himoyalanish metodikasi.",\n`;
        output += `                content: {\n`;
        output += `                  overview: "${l.title} kiberxavfsizlik sohasidagi eng muhim mavzulardan biridir. Ushbu darsda siz uning arxitekturasini, axborot almashinuv mexanizmini va amaliy qo'llanishini o'rganasiz.",\n`;
        output += `                  keyConcepts: [\n`;
        output += `                    { term: "Arxitektura", definition: "Tizimning asosiy tarkibiy qismlari va ularning o'zaro xavfsiz bog'lanishi." },\n`;
        output += `                    { term: "Zaiflik Nuqtasi", definition: "Nisbatan kam himoyalangan va tajovuzkorlar tomonidan manipulyatsiya qilinishi mumkin bo'lgan parametr." },\n`;
        output += `                    { term: "Sanitizatsiya", definition: "Kiruvchi ma'lumotlarni zararli kodlardan tozalash va xavfsiz holatga keltirish." }\n`;
        output += `                  ],\n`;
        output += `                  codeExample: {\n`;
        output += `                    language: 'bash',\n`;
        output += `                    title: 'Texnik Namunaviy Kod Tahlili',\n`;
        output += `                    code: \`# ${l.code}: ${l.title}\\n# Tekshiruv va monitoring buyrug'i\\ncurl -I -s "https://target.cybertrip.uz/${l.slug}" | grep -E "(HTTP|Server|Content)"\`,\n`;
        output += `                    explanation: 'Ushbu buyruq server javobidagi sarlavhalar va protokollarni tahlil qilish uchun ishlatiladi.'\n`;
        output += `                  },\n`;
        output += `                  attackScenario: {\n`;
        output += `                    title: 'Mumkin bo\\'lgan Hujum Ssenariysi',\n`;
        output += `                    steps: [\n`;
        output += `                      'Hujumchi dastlabki razvedka orqali tizim versiyasi va parametrlarni aniqlaydi.',\n`;
        output += `                      'Parametrlarni manipulyatsiya qilish orqali xavfsizlik filtrlari chetlab o\\'tiladi.',\n`;
        output += `                      'Ruxsatsiz ma\\'lumotlar qo\\'lga kiritiladi yoki buyruq bajariladi.'\n`;
        output += `                    ],\n`;
        output += `                    samplePayload: 'admin\\' OR 1=1 --'\n`;
        output += `                  },\n`;
        output += `                  defenseRecommendations: [\n`;
        output += `                    'Barcha parametrlarni qat\\'iy tekshirish va kirish huquqlarini cheklash.',\n`;
        output += `                    'Har doim eng kam imtiyozlilik tamoyiliga amal qilish.',\n`;
        output += `                    'Tizim jurnallarida barcha shubhali harakatlarni qayd etib borish.'\n`;
        output += `                  ]\n`;
        output += `                },\n`;
        output += `                quiz: ${JSON.stringify(quiz, null, 16).trim()},\n`;
        output += `                practice: ${JSON.stringify(practice, null, 16).trim()}\n`;
        output += `              },\n`;
      }

      output += `            ]\n`;
      output += `          },\n`;
    }

    output += `        ]\n`;
    output += `      },\n`;
  }

  output += `    ]\n`;
  output += `  },\n`;
}

output += `};\n\n`;

// Helper export functions
output += `export function getAllPaths(): PathData[] {
  return Object.values(CURRICULUM_DATA);
}

export function getPathBySlug(slug: string): PathData | undefined {
  return CURRICULUM_DATA[slug];
}

export function getCourseBySlug(pathSlug: string, courseSlug: string): CourseData | undefined {
  const path = CURRICULUM_DATA[pathSlug];
  if (!path) return undefined;
  return path.courses.find(c => c.slug === courseSlug);
}

export function getTotalStats(): { totalPaths: number; totalCourses: number; totalLessons: number; totalHours: number } {
  const paths = Object.values(CURRICULUM_DATA);
  let totalCourses = 0;
  let totalLessons = 0;
  let totalHours = 0;

  for (const p of paths) {
    totalHours += p.hours;
    totalCourses += p.courses.length;
    for (const c of p.courses) {
      for (const m of c.modules) {
        totalLessons += m.lessons.length;
      }
    }
  }

  return {
    totalPaths: paths.length,
    totalCourses,
    totalLessons,
    totalHours,
  };
}
`;

const targetPath = path.resolve('C:/Users/domme/.gemini/antigravity/scratch/cybertrip-uz/apps/web/src/lib/curriculum-data.ts');
fs.writeFileSync(targetPath, output, 'utf8');
console.log('Successfully generated curriculum data. Stats:');
console.log('Total file size:', (output.length / 1024).toFixed(1), 'KB');
