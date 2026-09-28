import Link from 'next/link';
import { Shield, FileText, ChevronRight, AlertTriangle, Scale, Lock, Users, Terminal, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 animate-page-enter">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Bosh sahifa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-200">Foydalanish Shartlari va Huquqiy Qoidalar</span>
        </div>

        {/* Header */}
        <div className="space-y-3 border-b border-gray-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">Foydalanish Shartlari va Huquqiy Shartnoma</h1>
              <p className="text-xs text-gray-400 mt-1">
                CYBERTRIP.UZ Milliy Kiberxavfsizlik Ta'lim va Poligon Platformasi
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500 font-mono">
            <span>Versiya: 2.4-PRODUCTION</span>
            <span>•</span>
            <span>Kuchga kirish sanasi: 2026-yil 1-yanvar</span>
          </div>
        </div>

        {/* RED ALERT BOX: CRITICAL LEGAL WARNING */}
        <div className="bg-gradient-to-r from-red-950/70 via-rose-950/60 to-red-950/70 border-2 border-red-500/80 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl shadow-red-900/30">
          <div className="flex items-center space-x-3 text-red-400">
            <div className="p-2 bg-red-500/20 rounded-xl border border-red-500/40">
              <ShieldAlert className="w-7 h-7 text-red-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-red-300 uppercase">
                O'ZBEKISTON RESPUBLIKASI QONUNCHILIGI TALABI
              </span>
              <h2 className="text-xl font-black text-white tracking-wide">
                MUHIM HUQUQIY OGOHLANTIRISH VA JAVOBGARLIK
              </h2>
            </div>
          </div>

          <div className="text-sm text-red-100/90 leading-relaxed space-y-3 pt-2">
            <p className="font-semibold text-white">
              CYBERTRIP.UZ platformasida berilayotgan barcha bilimlar, amaliy laboratoriyalar va zaifliklarni o'rganish usullari FAQAT VA FAQAT kiberhimoyani mustahkamlash, axborot tizimlari xavfsizligini ta'minlash hamda qonuniy etuk mutaxassislarni tayyorlash maqsadida taqdim etiladi.
            </p>
            <p className="bg-black/40 p-4 rounded-xl border border-red-500/30 font-mono text-xs text-red-200">
              <strong className="text-red-400">O'zbekiston Respublikasi Jinoyat Kodeksi:</strong><br />
              • <strong>278-1-modda:</strong> Kompyuter axborotidan qonunga xilof ravishda (ruxsatsiz) foydalanish — bazaviy hisoblash miqdorining yuz baravaridan uch yuz baravarigacha miqdorda jarima yoki ikki yilgacha ozodlikdan mahrum qilish bilan jazolanadi.<br />
              • <strong>278-2-modda:</strong> Kompyuter axborotini modifikatsiyalash, bloklash, yo'q qilish, kompyuter viruslarini tarqatish yoki axborot tizimini ishdan chiqarish — uch yildan besh yilgacha ozodlikdan mahrum qilish bilan jazolanadi.<br />
              • <strong>278-3- va 278-4-moddalar:</strong> Maxsus dasturiy vositalarni qonunga xilof ravishda tayyorlash, saqlash, tarqatish hamda kompyuter tarmog'iga noqonuniy kirish og'ir oqibatlarga olib kelsa, 7 yilgacha ozodlikdan mahrum qilish choralarini ko'zda tutadi.
            </p>
            <p className="text-xs text-red-200/80">
              Platformadan tashqaridagi har qanday ruxsatsiz skanerlash, tizimlarni buzish yoki hujum qilish harakatlari qonuniy javobgarlikka sabab bo'ladi va shaxsingiz bo'yicha ma'lumotlar huquqni muhofaza qiluvchi organlarga taqdim etilishi mumkin.
            </p>
          </div>
        </div>

        {/* 16 DETAILED SECTIONS */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 md:p-8">
          
          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>1. Umumiy Qoidalar va Qonuniy Asos</span>
            </h3>
            <p>
              Ushbu Foydalanish shartlari (keyingi o'rinlarda «Shartnoma») CYBERTRIP.UZ platformasi (keyingi o'rinlarda «Platforma») va ro'yxatdan o'tgan har bir jismoniy yoki yuridik shaxs (keyingi o'rinlarda «Foydalanuvchi») o'rtasidagi munosabatlarni tartibga soladi. Platformadan foydalanishni boshlagan paytingizdan boshlab siz ushbu shartlarga to'liq va shartsiz rozilik bildirasiz.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>2. Ta'limiy Maqsad va Izolyatsiya Qilingan Muhit</span>
            </h3>
            <p>
              Barcha interaktiv laboratoriyalar, konteynerlar va target-ilovalar to'liq izolyatsiya qilingan virtual sandbox poligonida ishlaydi. Ushbu tizimlardagi zaifliklar (SQL Injection, XSS, SSRF, IDOR va boshqalar) maxsus o'rnatilgan bo'lib, ular haqiqiy tashqi tarmoqlarga bog'lanmagan.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>3. Ruxsatsiz Harakatlarning Qat'iyan Taqiqlanishi</span>
            </h3>
            <p>
              Foydalanuvchiga quyidagi xatti-harakatlar mutlaqo taqiqlanadi:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 pl-3">
              <li>Platformadagi zaifliklarni ekspluatatsiya qilish usullarini O'zbekiston yoki xorijiy davlatlardagi ruxsat berilmagan tashkilotlar, banklar, korxonalar va davlat serverlariga nisbatan sinab ko'rish;</li>
              <li>CYBERTRIP.UZ xizmatining asosiy veb-saytiga, API serverlariga yoki ma'lumotlar bazalariga qarshi Denial of Service (DoS/DDoS) yoki buzib kirish harakatlarini amalga oshirish;</li>
              <li>Konteyner breakout (virtualizatsiyani yorib o'tib asosiy server yadrosiga chiqish) harakatlari;</li>
              <li>Avtomatlashtirilgan tajovuzkor botlar orqali asossiz va ruxsatsiz yuqori tarmoq yuklamasi hosil qilish.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>4. Hisob Xavfsizligi va Mas'uliyat</span>
            </h3>
            <p>
              Foydalanuvchi o'z login ma'lumotlari (foydalanuvchi nomi, parol, API kalitlari) maxfiyligini ta'minlashga shaxsan javobgardir. Shaxsiy hisobni uchinchi shaxslarga berish, ijaraga berish yoki sotish man etiladi. Hisobdan amalga oshirilgan barcha harakatlar to'g'ridan-to'g'ri hisob egasi nomidan bajarilgan deb hisoblanadi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>5. CTF va Reyting Halolligi (Anti-Cheat)</span>
            </h3>
            <p>
              CTF musobaqalari va reyting tizimida adolat tamoyili oliy o'rinda turadi. Flag (bayroq)larni o'zaro almashish, sotish, bir nechta feyk akkauntlar ochib ball to'plash, yoki yechimlarni (writeup) e'lon qilinmagan muddatda oshkor qilish taqiqlanadi. Anti-cheat tizimi orqali qoidabuzarlik aniqlanganda barcha ballar nolga tushiriladi yoki hisob doimiy bloklanadi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>6. Laboratoriya Sessiyalari va Resurslar Limitlari</span>
            </h3>
            <p>
              Har bir foydalanuvchiga ajratilgan laboratoriya sessiyasi aniq vaqt chegarasiga (odatda 45-90 daqiqa) va qat'iy 3 ta urinish (submission attempts) limitiga ega. Resurslarni adolatli taqsimlash maqsadida nofaol sessiyalar avtomatik ravishda yakunlanadi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>7. Mualliflik Huquqi va Intellektual Mulk</span>
            </h3>
            <p>
              Platformadagi barcha matnlar, darsliklar, laboratoriya ssenariylari, topshiriqlar, grafika va dastur kodi CYBERTRIP.UZ ning intellektual mulki hisoblanadi. Ma'muriyatning yozma ruxsatisiz materiallarni tijoriy maqsadlarda qayta nashr etish, nusxalash yoki tarqatish taqiqlanadi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>8. Obunalar, To'lovlar va Qaytarish Qoidalari</span>
            </h3>
            <p>
              Pro va Korxona tariflari bo'yicha to'lovlar rasmiy milliy to'lov tizimlari (Click, Payme) hamda yuridik shaxslar uchun bank hisobvarag'i orqali qabul qilinadi. Obuna xizmatlari faollashtirilgach, raqamli xizmatlar ko'rsatilganligi sababli o'tgan davr uchun to'lov qaytarilmaydi (fors-major holatlar bundan mustasno).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>9. Sertifikatlar Berish va Haqiqiylikni Tekshirish</span>
            </h3>
            <p>
              CYBERTRIP Certified Web Pentester (CWP) va boshqa sertifikatlar barcha talab qilingan amaliy laboratoriyalar, nazariy imtihonlar va CTF topshiriqlari muvaffaqiyatli yakunlanganda beriladi. Har bir sertifikat noyob identifikatorga va onlayn tasdiqlash sahifasiga (/verify/[id]) ega. Qalbaki sertifikat yasash taqiqlanadi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>10. Ma'lumotlar Maxfiyligi va Log Yozuvlari</span>
            </h3>
            <p>
              Xavfsizlikni ta'minlash maqsadida foydalanuvchining IP manzili, sessiya faolligi, flag yuborish urinishlari va laboratoriya buyruqlari xavfsizlik audit loglarida saqlanadi. Ushbu ma'lumotlar uchinchi shaxslarga oshkor qilinmaydi, qonunda belgilangan hollar bundan mustasno.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>11. Xizmat Ko'rsatishni Cheklash va Bloklash</span>
            </h3>
            <p>
              Qoidalarni buzgan, boshqa foydalanuvchilarga xalaqit bergan, noqonuniy vositalarni tarqatgan yoki platforma barqarorligiga tahdid solgan foydalanuvchilarning hisobi ma'muriyat tomonidan ogohlantirishsiz vaqtinchalik yoki butunlay bloklanishi mumkin.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>12. Kafolatlarning Rad Etilishi (Disclaimer)</span>
            </h3>
            <p>
              Platforma xizmatlari «mavjud holatida» (as-is) taqdim etiladi. Platforma ma'muriyati serverlardagi profilaktika ishlari, internet uzilishlari yoki foydalanuvchining shaxsiy uskunasidagi nosozliklar sabab yuzaga keladigan vaqtinchalik uzilishlar uchun javobgarlikni o'z zimmasiga olmaydi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>13. Uchinchi Tomon Havolalari va Dasturlar</span>
            </h3>
            <p>
              Laboratoriyalarda o'rganiladigan ochiq kodli vositalar (nmap, sqlmap, burp suite, wireshark va boshqalar) tegishli mualliflarining litsenziyalari asosida ishlatiladi. Ushbu vositalardan noqonuniy foydalanish uchun javobgarlik bevosita ularni qo'llagan shaxs zimmasiga tushadi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>14. Jamiyat va Muloqot Odobi</span>
            </h3>
            <p>
              Platforma forumi, chatlari va hamjamiyat guruhlarida haqoratomuz so'zlar, spam, ruxsatsiz reklama hamda kiberxavfsizlikka oid bo'lmagan buzg'unchi axborotlarni tarqatish qat'iyan man etiladi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>15. Shartlarning O'zgartirilishi</span>
            </h3>
            <p>
              Platforma ma'muriyati ushbu qoidalarni xavfsizlik talablari yoki qonunchilik o'zgarishlariga asosan bir tomonlama tartibda yangilash huquqiga ega. O'zgartirishlar ushbu sahifada e'lon qilingan paytdan boshlab darhol kuchga kiradi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>16. Bog'lanish va Rasmiy Murojaat</span>
            </h3>
            <p>
              Savollar, huquqiy takliflar yoki qoidabuzarliklar haqida xabar berish uchun bizning rasmiy aloqa kanallarimiz:
            </p>
            <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-800 text-xs font-mono space-y-1 text-gray-300">
              <p>Email: <span className="text-cyan-400">legal@cybertrip.uz</span> / <span className="text-cyan-400">support@cybertrip.uz</span></p>
              <p>Rasmiy veb-sayt: <span className="text-cyan-400">https://cybertrip.uz</span></p>
              <p>Toshkent shahri, O'zbekiston Respublikasi</p>
            </div>
          </section>

        </div>

        {/* Bottom Back Button */}
        <div className="text-center pt-4">
          <Link href="/">
            <button className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 rounded-xl text-xs font-bold transition-colors">
              ← Bosh sahifaga qaytish
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
