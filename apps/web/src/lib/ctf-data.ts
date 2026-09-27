export interface CTFChallenge {
  id: number;
  slug: string;
  title: string;
  category: 'Web' | 'Crypto' | 'Forensics' | 'Linux' | 'Network' | 'OSINT' | 'Misc';
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  initialPoints: number;
  minPoints: number;
  solves: number;
  description: string;
  flagFormat: string;
  flagHash?: string; // Client-safe validator or offline comparison
  targetUrl?: string;
  fileName?: string;
  fileSize?: string;
  hint?: {
    text: string;
    cost: number;
  };
  author: string;
  tags: string[];
}

export const CTF_CHALLENGES: CTFChallenge[] = [
  {
    id: 1,
    slug: 'web-login-bypass',
    title: 'Login Bypass',
    category: 'Web',
    difficulty: 'Beginner',
    points: 100,
    initialPoints: 100,
    minPoints: 50,
    solves: 412,
    description: "Veb-sayt admin tizimiga kirishda SQL mantiqiy xatosi mavjud. Autentifikatsiyani aylanib o'tib admin huquqini oling va maxfiy flagni qo'lga kiriting.",
    flagFormat: 'FLAG{...}',
    targetUrl: 'http://target-cyberbooks.lab:8080/login',
    hint: {
      text: "' OR '1'='1 -- kabi klassik SQL mantiqiy ifodalarini foydalanuvchi nomi maydoniga kiritib ko'ring.",
      cost: 10
    },
    author: 'CyberTrip Security Team',
    tags: ['SQLi', 'Auth Bypass', 'Web']
  },
  {
    id: 2,
    slug: 'web-cookie-monster',
    title: 'Cookie Monster',
    category: 'Web',
    difficulty: 'Beginner',
    points: 150,
    initialPoints: 150,
    minPoints: 100,
    solves: 328,
    description: "Sessiya identifikatori Base64 bilan kodlangan oddiy JSON strukturadan iborat. Cookie qiymatini tahlil qilib, o'zingizni admin roliga ko'taring va sahifani yangilang.",
    flagFormat: 'FLAG{...}',
    targetUrl: 'http://orderhub.enterprise.lab:8080/orders',
    hint: {
      text: "Brauzer devtools (Application -> Cookies) bo'limini oching. session parametrini base64 decode qiling va role: 'admin' qilib qayta encode qiling.",
      cost: 15
    },
    author: 'CyberTrip Security Team',
    tags: ['Cookies', 'Base64', 'Privilege Escalation']
  },
  {
    id: 3,
    slug: 'web-sql-master',
    title: 'SQL Master',
    category: 'Web',
    difficulty: 'Medium',
    points: 200,
    initialPoints: 200,
    minPoints: 150,
    solves: 245,
    description: "UNION asosidagi SQL Injection orqali yashirin 'secret_flags' jadvalidagi ma'lumotlarni ma'lumotlar bazasidan chiqarib oling.",
    flagFormat: 'FLAG{...}',
    targetUrl: 'http://target-cyberbooks.lab:8080/catalog',
    hint: {
      text: "' UNION SELECT 1, table_name, 3 FROM information_schema.tables WHERE table_schema=database() -- orqali jadvallarni toping.",
      cost: 20
    },
    author: 'root_cybertrip',
    tags: ['SQLi', 'UNION', 'Information Schema']
  },
  {
    id: 4,
    slug: 'web-xss-hunter',
    title: 'XSS Hunter',
    category: 'Web',
    difficulty: 'Medium',
    points: 250,
    initialPoints: 250,
    minPoints: 200,
    solves: 198,
    description: "Fikr-mulohazalar sahifasida Stored XSS zaifligidan foydalanib, avtomatlashtirilgan admin-botning sessiya ma'lumotlarini qo'lga kiriting.",
    flagFormat: 'FLAG{...}',
    targetUrl: 'http://cyberforum.community.lab:8080/topics',
    hint: {
      text: "Fikr maydoniga <script> yoki <img src=x onerror=...> payloadini joylashtiring va botning javobini kuting.",
      cost: 25
    },
    author: 'Shokirov',
    tags: ['XSS', 'Stored', 'Session Hijacking']
  },
  {
    id: 5,
    slug: 'web-jwt-cracker',
    title: 'JWT Cracker',
    category: 'Web',
    difficulty: 'Hard',
    points: 300,
    initialPoints: 300,
    minPoints: 250,
    solves: 112,
    description: "Ushbu API JWT (JSON Web Token) imzolashda juda sodda maxfiy so'zdan foydalangan. HMAC-SHA256 kalitini crack qilib, admin tokenini yarating.",
    flagFormat: 'FLAG{...}',
    targetUrl: 'http://api-gateway.lab:8000/api/v1/auth/token',
    hint: {
      text: "john the ripper yoki jwt_tool yordamida rockyou.txt bilan sirli so'zni toping (masalan: 'secret123'). Keyin role: 'admin' tokenini yasang.",
      cost: 30
    },
    author: 'CyberTrip Security Team',
    tags: ['JWT', 'Crypto', 'API']
  },
  {
    id: 6,
    slug: 'crypto-caesar',
    title: 'Caesar Cipher',
    category: 'Crypto',
    difficulty: 'Beginner',
    points: 100,
    initialPoints: 100,
    minPoints: 50,
    solves: 540,
    description: "Qadimgi Rim usulida harflar surilishi orqali shifrlangan xabar berilgan: `SYNT{unvy_pnrfne}`. Matnni to'g'ri deshifrlang va asl flagni kiriting.",
    flagFormat: 'FLAG{...}',
    hint: {
      text: "ROT13 yoki alifbo harflarini 13 pozitsiyaga surish yordam beradi.",
      cost: 10
    },
    author: 'CryptoMaster',
    tags: ['Caesar', 'Classical Crypto', 'ROT13']
  },
  {
    id: 7,
    slug: 'crypto-base64',
    title: 'Base64 Chain',
    category: 'Crypto',
    difficulty: 'Beginner',
    points: 100,
    initialPoints: 100,
    minPoints: 50,
    solves: 480,
    description: "Bayroq matni ketma-ket bir necha marotaba Base64 va Hex algoritmlari bilan kodlangan. Zanjirni teskari ketma-ketlikda yeching.",
    flagFormat: 'FLAG{...}',
    fileName: 'encoded_chain.txt',
    fileSize: '1.2 KB',
    hint: {
      text: "CyberChef asbobidan foydalanib, 'From Hex' va 'From Base64' amallarini zanjirli qo'llang.",
      cost: 10
    },
    author: 'CryptoMaster',
    tags: ['Encoding', 'Base64', 'Hex']
  },
  {
    id: 8,
    slug: 'crypto-rsa',
    title: 'RSA Basics',
    category: 'Crypto',
    difficulty: 'Medium',
    points: 250,
    initialPoints: 250,
    minPoints: 200,
    solves: 165,
    description: "Berilgan RSA ochiq kalitida N moduli juda kichik ikkita tub son p va q ning ko'paytmasidan iborat. N ni ko'paytuvchilarga ajratib, d xususiy kalitini hisoblang va shifrlangan xabarni o'qing.",
    flagFormat: 'FLAG{...}',
    fileName: 'rsa_challenge.zip',
    fileSize: '4.8 KB',
    hint: {
      text: "factordb.com saytidan foydalanib N sonining ko'paytuvchilarini bir necha soniyada topishingiz mumkin.",
      cost: 25
    },
    author: 'RSA_Wizard',
    tags: ['RSA', 'Asymmetric', 'Factorization']
  },
  {
    id: 9,
    slug: 'forensics-hidden',
    title: 'Hidden Message',
    category: 'Forensics',
    difficulty: 'Beginner',
    points: 100,
    initialPoints: 100,
    minPoints: 50,
    solves: 390,
    description: "Berilgan PNG tasvir faylining LSB (Least Significant Bit) qatlamlariga yashirin matn yozilgan. Steganografik tahlil vositasi yordamida uni ajratib oling.",
    flagFormat: 'FLAG{...}',
    fileName: 'cyber_glitch.png',
    fileSize: '340 KB',
    hint: {
      text: "zsteg, steghide yoki Aperi'Solve onlayn vositasidan foydalanib rasm kanallarini tekshiring.",
      cost: 15
    },
    author: 'ForensicsLab',
    tags: ['Stego', 'PNG', 'LSB']
  },
  {
    id: 10,
    slug: 'forensics-memory',
    title: 'Memory Dump',
    category: 'Forensics',
    difficulty: 'Medium',
    points: 200,
    initialPoints: 200,
    minPoints: 150,
    solves: 142,
    description: "Tizim buzilishi yuz bergan paytdagi operativ xotira (RAM) dump fayli taqdim etilgan. Volatility vositasi yordamida tajovuzkor tergan oxirgi buyruqlar orasidagi flagni toping.",
    flagFormat: 'FLAG{...}',
    fileName: 'memdump.raw.gz',
    fileSize: '12.4 MB',
    hint: {
      text: "volatility3 -f memdump.raw windows.cmdline yoki linux.bash plaginini ishga tushiring.",
      cost: 20
    },
    author: 'BlueTeam_Lead',
    tags: ['Memory Forensics', 'RAM', 'Volatility']
  },
  {
    id: 11,
    slug: 'linux-find-flag',
    title: 'Find The Flag',
    category: 'Linux',
    difficulty: 'Beginner',
    points: 100,
    initialPoints: 100,
    minPoints: 50,
    solves: 510,
    description: "Linux server fayl tizimidagi yuzlab kataloglar va log fayllar orasida 'FLAG{' prefiksi bilan boshlanuvchi maxfiy satr saqlangan. Qidiruv buyruqlaridan foydalaning.",
    flagFormat: 'FLAG{...}',
    targetUrl: '/terminal',
    hint: {
      text: "grep -rnwi '/var/log/' -e 'FLAG{' 2>/dev/null buyrug'ini terminalda sinab ko'ring.",
      cost: 10
    },
    author: 'LinuxNinja',
    tags: ['Linux', 'grep', 'CLI']
  },
  {
    id: 12,
    slug: 'linux-privesc',
    title: 'Privilege Escalation',
    category: 'Linux',
    difficulty: 'Hard',
    points: 350,
    initialPoints: 350,
    minPoints: 300,
    solves: 88,
    description: "Oddiy foydalanuvchi sifatida tizimga kirdingiz. SUID biti o'rnatilgan noto'g'ri sozlangan dastur yordamida root huquqlarini oling va /root/flag.txt faylini o'qing.",
    flagFormat: 'FLAG{...}',
    targetUrl: '/terminal',
    hint: {
      text: "find / -perm -u=s -type f 2>/dev/null orqali SUID binar fayllarni qidiring va GTFOBins ro'yxatiga solishtiring.",
      cost: 35
    },
    author: 'RootHunter',
    tags: ['Privilege Escalation', 'SUID', 'Root']
  },
  {
    id: 13,
    slug: 'network-pcap',
    title: 'Packet Analysis',
    category: 'Network',
    difficulty: 'Medium',
    points: 200,
    initialPoints: 200,
    minPoints: 150,
    solves: 215,
    description: "Tarmoq paketi tahlili (.pcap). Shifrlanmagan FTP/HTTP protokoli orqali jo'natilgan fayl uzatmasi ichidan flagni qayta tiklang.",
    flagFormat: 'FLAG{...}',
    fileName: 'network_traffic.pcapng',
    fileSize: '840 KB',
    hint: {
      text: "Wireshark dasturida 'Follow TCP Stream' funksiyasi orqali matnli suhbatni to'liq o'qing.",
      cost: 20
    },
    author: 'NetShark',
    tags: ['PCAP', 'Wireshark', 'TCP Stream']
  },
  {
    id: 14,
    slug: 'osint-social',
    title: 'Social Footprint',
    category: 'OSINT',
    difficulty: 'Beginner',
    points: 150,
    initialPoints: 150,
    minPoints: 100,
    solves: 290,
    description: "Xaker tarmoqda @cyber_wanderer_uz taxallusi bilan faoliyat yuritgan. Uning ochiq axborot manbalaridagi izlarini tahlil qilib, o'chirilgan commit orasidagi kalitni toping.",
    flagFormat: 'FLAG{...}',
    hint: {
      text: "GitHub commit tarixidagi o'chirilgan ma'lumotlarni ko'rish uchun commit diff sahifasini oching.",
      cost: 15
    },
    author: 'OSINT_Specialist',
    tags: ['OSINT', 'Recon', 'GitHub']
  },
  {
    id: 15,
    slug: 'misc-qr',
    title: 'QR Code Puzzle',
    category: 'Misc',
    difficulty: 'Beginner',
    points: 100,
    initialPoints: 100,
    minPoints: 50,
    solves: 460,
    description: "Bir necha qismlarga bo'lingan va burchak markerlari chalkashtirilgan QR kod tasviri berilgan. Uni rasm muharririda to'g'rilab skaner qiling.",
    flagFormat: 'FLAG{...}',
    fileName: 'scrambled_qr.png',
    fileSize: '45 KB',
    hint: {
      text: "QR kodning uchta burchagidagi kvadrat pozitsion markerlarni to'g'ri joylashtiring.",
      cost: 10
    },
    author: 'CyberTrip Security Team',
    tags: ['QR Code', 'Misc', 'Image Reconstruction']
  }
];

// Official flag lookup map for client validation and offline fallbacks
export const CTF_FLAGS: Record<string, string> = {
  'web-login-bypass': 'FLAG{admin_bypass_success}',
  'web-cookie-monster': 'FLAG{yummy_admin_cookies}',
  'web-sql-master': 'FLAG{union_based_sqli_win}',
  'web-xss-hunter': 'FLAG{stored_xss_alert_1}',
  'web-jwt-cracker': 'FLAG{jwt_weak_secret_cracked}',
  'crypto-caesar': 'FLAG{hail_caesar}',
  'crypto-base64': 'FLAG{base64_is_not_encryption}',
  'crypto-rsa': 'FLAG{rsa_modulus_factored}',
  'forensics-hidden': 'FLAG{stego_master}',
  'forensics-memory': 'FLAG{volatility_is_awesome}',
  'linux-find-flag': 'FLAG{grep_is_your_friend}',
  'linux-privesc': 'FLAG{root_dance}',
  'network-pcap': 'FLAG{wireshark_shark}',
  'osint-social': 'FLAG{osint_detective}',
  'misc-qr': 'FLAG{qr_scanned_successfully}',
};

export function getChallengeBySlugOrId(identifier: string | number): CTFChallenge | undefined {
  if (typeof identifier === 'number' || !isNaN(Number(identifier))) {
    const id = Number(identifier);
    const found = CTF_CHALLENGES.find((c) => c.id === id);
    if (found) return found;
  }
  return CTF_CHALLENGES.find((c) => c.slug === identifier || c.id.toString() === identifier);
}
