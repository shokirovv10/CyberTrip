'use client';
import { useState } from 'react';
import { Search, BookA } from 'lucide-react';

export default function GlossaryPage() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [activeLetter, setActiveLetter] = useState('A');
  const [searchQuery, setSearchQuery] = useState('');

  const terms = [
    { term: 'APT (Advanced Persistent Threat)', definition: 'Ilg\'or uzluksiz tahdid - maqsadli, davomli va maxfiy kiberhujum turi bo\'lib, unda ruxsatsiz shaxs tarmoqqa kirib, iloji boricha uzoq vaqt davomida aniqlanmay qoladi.', letter: 'A' },
    { term: 'Authentication', definition: 'Autentifikatsiya - foydalanuvchi, qurilma yoki tizimning identifikatorini tasdiqlash jarayoni (masalan, parol yoki biometrika yordamida).', letter: 'A' },
    { term: 'Backdoor', definition: 'Orqa eshik - kompyuter tizimiga, tarmoqqa yoki dasturga normal autentifikatsiyani aylanib o\'tgan holda kirishning yashirin usuli.', letter: 'B' },
    { term: 'Botnet', definition: 'Botnet - bitta nazorat qiluvchi tomon tomonidan boshqariladigan zararlangan kompyuterlar (botlar) tarmog\'i. Ko\'pincha DDoS hujumlarida ishlatiladi.', letter: 'B' },
    { term: 'Cryptography', definition: 'Kriptografiya - ma\'lumotlarni shifrlash orqali ularni uchinchi shaxslardan himoya qilish san\'ati va fani.', letter: 'C' },
    { term: 'DDoS (Distributed Denial of Service)', definition: 'Taqsimlangan xizmat ko\'rsatishni rad etish - ko\'p sonli zararlangan tizimlar bitta nishonga ulanish so\'rovlarini yuborib, uni ortiqcha yuklab qo\'yishi va ishdan chiqarishi.', letter: 'D' },
    { term: 'Exploit', definition: 'Eksploit - dasturiy ta\'minot, tizim yoki apparatdagi zaiflikdan foydalanib, kutilmagan harakatlarni amalga oshiruvchi kod yoki dastur.', letter: 'E' },
    { term: 'Firewall', definition: 'Xavfsizlik devori - oldindan belgilangan xavfsizlik qoidalari asosida kiruvchi va chiquvchi tarmoq trafigini kuzatuvchi va nazorat qiluvchi tizim.', letter: 'F' },
  ];

  const filteredTerms = terms.filter(t => 
    (searchQuery ? t.term.toLowerCase().includes(searchQuery.toLowerCase()) || t.definition.toLowerCase().includes(searchQuery.toLowerCase()) : t.letter === activeLetter)
  );

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <BookA className="w-12 h-12 text-emerald-500 mx-auto" />
          <h1 className="text-4xl font-bold">Kiberlug'at</h1>
          <p className="text-gray-400">Kiberxavfsizlikka oid atamalar va ularning izohlari</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Atamani qidirish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:border-emerald-500 text-gray-200 transition-colors"
          />
        </div>

        {/* Alphabet Navigation */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                  activeLetter === letter 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-gray-800'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}

        {/* Dictionary Entries */}
        <div className="space-y-4 pt-4">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                <h3 className="text-xl font-bold text-emerald-400 mb-2">{item.term}</h3>
                <p className="text-gray-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              Ushbu harf yoki so'rov bo'yicha atama topilmadi.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
