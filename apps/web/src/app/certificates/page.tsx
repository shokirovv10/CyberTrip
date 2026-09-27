import Link from 'next/link';
import { Award, Download, CheckCircle, ExternalLink } from 'lucide-react';

export default function CertificatesPage() {
  const certificates = [
    { 
      id: 'CERT-9823-4567', 
      title: 'Kiberxavfsizlik Asoslari', 
      date: '15 Noy, 2023',
      grade: 'A+',
      image: 'bg-gradient-to-br from-gray-800 to-gray-900 border-emerald-500/50'
    },
    { 
      id: 'CERT-1234-8901', 
      title: 'Tarmoq Xavfsizligi Mutaxassisi', 
      date: '02 Dek, 2023',
      grade: 'A',
      image: 'bg-gradient-to-br from-gray-800 to-gray-900 border-blue-500/50'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Award className="w-8 h-8 mr-3 text-emerald-500" />
              Mening Sertifikatlarim
            </h1>
            <p className="text-gray-400 mt-2">Muvaffaqiyatli yakunlangan kurslar va o'quv yo'llari uchun olingan sertifikatlar.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
              
              {/* Certificate Preview */}
              <div className={`h-48 ${cert.image} border-b relative p-6 flex flex-col items-center justify-center text-center`}>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/30 px-2 py-1 rounded text-xs text-white/70 backdrop-blur-sm">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>Tasdiqlangan</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm">CYBERTRIP.UZ tomonidan berildi</p>
                <div className="mt-4 font-mono text-xs text-gray-500 tracking-widest">{cert.id}</div>
              </div>

              {/* Details & Actions */}
              <div className="p-6 bg-gray-900 flex-1 flex flex-col justify-between space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Berilgan sana</div>
                    <div className="font-medium text-gray-200">{cert.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Natija</div>
                    <div className="font-medium text-emerald-400">{cert.grade}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-800">
                  <button className="flex-1 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-lg transition-colors text-sm font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    PDF yuklab olish
                  </button>
                  <Link href={`/verify/${cert.id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-emerald-500 py-2.5 rounded-lg transition-colors text-sm font-medium">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Havola
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          ))}

          {/* Locked / Upcoming Certificate */}
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed h-full min-h-[350px]">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">Web Penetration Testing</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">Ushbu sertifikatni olish uchun kursni yakunlang (75% tayyor)</p>
            <Link href="/learn/web-pentesting">
              <button className="text-emerald-500 hover:text-emerald-400 font-medium text-sm">
                Davom etish &rarr;
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
