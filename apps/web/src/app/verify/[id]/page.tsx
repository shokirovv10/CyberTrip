import { ShieldCheck, Award, Calendar, User, Search } from 'lucide-react';
import Link from 'next/link';

export default async function VerifyCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock checking validity
  const isValid = id.startsWith('CERT-');

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-xl w-full space-y-8 relative z-10">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold tracking-tighter text-white mb-6">
            CYBER<span className="text-emerald-500">TRIP</span>
          </Link>
          <h1 className="text-3xl font-bold">Sertifikatni Tasdiqlash</h1>
          <p className="text-gray-400 mt-2">Hujjatning haqiqiyligini tekshirish</p>
        </div>

        {isValid ? (
          <div className="bg-gray-900 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl shadow-emerald-500/10">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-10 h-10 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-emerald-400">Sertifikat Haqiqiy</h2>
                <p className="text-gray-400 text-sm mt-1">Ushbu sertifikat CYBERTRIP tizimida mavjud va tasdiqlangan.</p>
              </div>
            </div>

            <div className="space-y-4 bg-gray-950 p-6 rounded-xl border border-gray-800">
              <div className="flex items-start">
                <Award className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Kurs / Yo'nalish</div>
                  <div className="font-medium text-gray-200">Kiberxavfsizlik Asoslari</div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-800"></div>
              
              <div className="flex items-start">
                <User className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Berilgan Shaxs</div>
                  <div className="font-medium text-gray-200">Abdullaev Sardor</div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-800"></div>

              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Sana</div>
                  <div className="font-medium text-gray-200">15 Noyabr, 2023</div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-800"></div>

              <div className="flex items-start">
                <Search className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Sertifikat ID</div>
                  <div className="font-mono text-emerald-500">{id}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl shadow-red-500/10">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mx-auto mb-6">
              <Search className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Topilmadi</h2>
            <p className="text-gray-400 mb-6">Kiritilgan ID bo'yicha sertifikat topilmadi. Raqamni tekshirib qayta urinib ko'ring.</p>
            <div className="bg-gray-950 p-4 rounded-lg font-mono text-gray-500 border border-gray-800">
              ID: {id}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href="/">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              Bosh sahifaga qaytish
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
