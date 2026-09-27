import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
export default async function ArticlePage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug || 'sql-injection';

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <Link href="/knowledge" className="inline-flex items-center text-sm text-gray-400 hover:text-emerald-500 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Bilimlar bazasiga qaytish
        </Link>

        {/* Article Header */}
        <div className="space-y-6 pb-8 border-b border-gray-800">
          <div className="flex gap-2">
            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-md text-sm font-medium border border-emerald-500/20">
              Web Zaifliklar
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            SQL Injection nima va qanday himoyalanish kerak?
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                12 Oktabr, 2023
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5 daqiqa o'qish
              </div>
            </div>
            
            <button className="p-2 bg-gray-900 border border-gray-800 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-emerald max-w-none prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
          <p className="lead text-xl text-gray-300 mb-8">
            SQL Injection (SQLi) - bu xakerlarga ilova ma'lumotlar bazasiga yuboriladigan SQL so'rovlariga aralashish imkonini beruvchi veb xavfsizligi zaifligi. Bu tajovuzkorga o'zi ko'rmasligi kerak bo'lgan ma'lumotlarni ko'rish imkonini berishi mumkin.
          </p>

          <h2>SQL Injection qanday ishlaydi?</h2>
          <p>
            Tasavvur qiling, veb saytda mahsulotlarni toifasi bo'yicha qidirish uchun quyidagicha kod yozilgan:
          </p>
          <pre><code>{`SELECT * FROM products WHERE category = '\$category' AND released = 1;`}</code></pre>
          
          <p>
            Agar foydalanuvchi qidiruv maydoniga <code>' OR 1=1--</code> kiritsa, so'rov quyidagicha ko'rinish oladi:
          </p>
          <pre><code>{`SELECT * FROM products WHERE category = '' OR 1=1--' AND released = 1;`}</code></pre>
          
          <p>
            Bu yerda <code>--</code> SQL da izoh (comment) hisoblanadi, shuning uchun qolgan qism inkor etiladi. <code>1=1</code> har doim to'g'ri (true) bo'lgani uchun, bu so'rov bazadagi BARCHA mahsulotlarni (hatto yashirin bo'lsa ham) qaytaradi.
          </p>

          <h2>Qanday himoyalanish kerak?</h2>
          <p>
            SQLi hujumlaridan himoyalanishning eng samarali usuli - bu <strong>Prepared Statements</strong> (Parametrlangan so'rovlar) dan foydalanishdir.
          </p>

          <h3>PHP PDO da misol:</h3>
          <pre><code>{`$stmt = $pdo->prepare('SELECT * FROM products WHERE category = :category');
$stmt->execute(['category' => $category]);
$products = $stmt->fetchAll();`}</code></pre>
          
          <p>
            Bunday yondashuvda kiritilgan ma'lumot SQL buyrug'i sifatida emas, balki shunchaki matn sifatida qabul qilinadi, shuning uchun injeksiya imkonsiz bo'ladi.
          </p>
        </div>

        {/* Tags */}
        <div className="pt-8 flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-400">Teglar:</span>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs text-gray-400">SQLi</span>
            <span className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs text-gray-400">Web Security</span>
            <span className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-xs text-gray-400">OWASP Top 10</span>
          </div>
        </div>

        {/* Related Labs */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Amaliyotda sinab ko'ring</h3>
          <div className="flex items-center justify-between bg-gray-950 p-4 rounded-lg border border-gray-800/50">
            <div>
              <div className="font-semibold text-emerald-400 mb-1">SQL Injection Asoslari Laboratoriyasi</div>
              <div className="text-sm text-gray-400">Ushbu zaiflikni real muhitda qo'llab ko'ring va himoya qilishni o'rganing.</div>
            </div>
            <Link href="/labs/sql-injection-basics">
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors ml-4 whitespace-nowrap">
                Laboratoriyani ochish
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
