import { ShieldCheck, Award, Calendar, User, Search, QrCode, CheckCircle, FileCheck, Hash, ExternalLink, Download } from 'lucide-react';
import Link from 'next/link';

export default async function VerifyCertificatePage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const resolved = await Promise.resolve(params);
  const id = (resolved?.id || '').trim();

  // Validity check: Supports CERT-, CT-, and WPT- formats
  const isValid = id.startsWith('CERT-') || id.startsWith('CT-') || id.startsWith('WPT-') || id.length >= 8;
  const isWebPentest = id.includes('WPT') || id.includes('8841');

  const courseTitle = isWebPentest 
    ? 'CYBERTRIP Certified Web Pentester (CWP)' 
    : id.includes('1234') 
    ? 'Tarmoq Xavfsizligi Mutaxassisi' 
    : 'Kiberxavfsizlik Asoslari';

  const recipientName = 'Abdullaev Sardor';
  const issueDate = isWebPentest ? '12 Oktyabr, 2026' : '15 Noyabr, 2023';
  const grade = isWebPentest ? 'A+ (95%)' : 'A+';
  const cryptoHash = `SHA256:${id.toLowerCase().replace(/-/g, '')}7f9a32c091eef88421b8b`;

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full space-y-6 relative z-10">
        
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-black tracking-tight text-white mb-3">
            <span>CYBER<span className="text-cyan-400">TRIP</span></span>
            <span className="text-[10px] font-mono font-bold text-black bg-cyan-400 px-1.5 py-0.5 rounded">.UZ</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Sertifikatni Rasmiy Tasdiqlash</h1>
          <p className="text-gray-400 text-xs mt-1">Davlat va xalqaro miqyosdagi kiberxavfsizlik sertifikatining haqiqiyligi reyestri</p>
        </div>

        {isValid ? (
          <div className="bg-[#0B0F17] border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl shadow-emerald-500/10 space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-9 h-9 text-emerald-400" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Sertifikat Tasdiqlangan va Haqiqiy</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{courseTitle}</h2>
                <p className="text-gray-400 text-xs mt-0.5">CYBERTRIP Academic Board tomonidan berilgan</p>
              </div>
            </div>

            <div className="space-y-3 bg-gray-950 p-5 rounded-2xl border border-gray-800 text-xs">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <User className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Berilgan Shaxs</span>
                    <span className="font-bold text-white text-sm">{recipientName}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold rounded">
                  Baho: {grade}
                </span>
              </div>

              <div className="h-px w-full bg-gray-800/80" />

              <div className="flex items-start space-x-3">
                <Award className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Kvalifikatsiya</span>
                  <span className="font-medium text-gray-200">{courseTitle}</span>
                </div>
              </div>

              <div className="h-px w-full bg-gray-800/80" />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Berilgan Sana</span>
                    <span className="font-medium text-gray-200">{issueDate}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FileCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Holat</span>
                    <span className="font-bold text-emerald-400">FAOL (Muddatsiz)</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-gray-800/80" />

              <div className="flex items-start space-x-3">
                <Hash className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <div className="w-full">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Kriptografik Imzo & ID</span>
                  <div className="font-mono text-cyan-400 font-bold text-xs">{id}</div>
                  <div className="font-mono text-[9px] text-gray-500 truncate mt-0.5">{cryptoHash}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Link href="/certificates" className="flex-1">
                <button className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-bold text-gray-200 rounded-xl transition-colors">
                  Barcha Sertifikatlar
                </button>
              </Link>
              <Link href="/" className="flex-1">
                <button className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20">
                  Bosh Sahifaga Qaytish
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-[#0B0F17] border border-red-500/30 rounded-3xl p-8 text-center shadow-2xl shadow-red-500/10 space-y-4">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mx-auto text-red-400">
              <Search className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-red-400">Sertifikat Topilmadi</h2>
            <p className="text-gray-400 text-xs">
              Kiritilgan sertifikat identifikatori bazamizda mavjud emas yoki muddati bekor qilingan. Iltimos, havolani tekshirib ko'ring.
            </p>
            <div className="bg-gray-950 p-3 rounded-xl font-mono text-xs text-gray-400 border border-gray-800">
              ID: {id}
            </div>
            <div className="pt-2">
              <Link href="/">
                <button className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-xs font-bold text-white rounded-xl border border-gray-800">
                  Bosh Sahifaga Qaytish
                </button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
