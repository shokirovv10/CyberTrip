import Link from 'next/link';
import { Book, Shield, Terminal, Server, Key, Search } from 'lucide-react';

export default function KnowledgeBasePage() {
  const categories = [
    { name: 'Tarmoq Xavfsizligi', icon: Server, count: 24 },
    { name: 'Web Zaifliklar', icon: Globe, count: 35 },
    { name: 'Kriptografiya', icon: Key, count: 18 },
    { name: 'Penetration Testing', icon: Shield, count: 42 },
    { name: 'Linux Asoslari', icon: Terminal, count: 15 },
  ];

  const articles = [
    { id: 1, title: 'SQL Injection nima va qanday himoyalanish kerak?', category: 'Web Zaifliklar', readTime: '5 daq', date: '12 Okt, 2023' },
    { id: 2, title: 'Nmap bilan tarmoqni skanerlash asoslari', category: 'Tarmoq Xavfsizligi', readTime: '8 daq', date: '10 Okt, 2023' },
    { id: 3, title: 'XSS (Cross-Site Scripting) turlari', category: 'Web Zaifliklar', readTime: '6 daq', date: '05 Okt, 2023' },
    { id: 4, title: 'Linux fayl ruxsatnomalarini tushunish', category: 'Linux Asoslari', readTime: '4 daq', date: '01 Okt, 2023' },
    { id: 5, title: 'Simmetrik va Asimmetrik shifrlash farqi', category: 'Kriptografiya', readTime: '7 daq', date: '28 Sen, 2023' },
    { id: 6, title: 'Metasploit Framework ga kirish', category: 'Penetration Testing', readTime: '10 daq', date: '25 Sen, 2023' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold flex items-center justify-center text-gray-100">
            <Book className="w-10 h-10 mr-4 text-emerald-500" />
            Bilimlar Bazasi
          </h1>
          <p className="text-lg text-gray-400">
            Kiberxavfsizlik olamiga oid maqolalar, qo'llanmalar va eng so'nggi yangiliklar.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Maqolalarni qidirish..." 
              className="w-full bg-gray-900 border border-gray-800 rounded-full pl-12 pr-6 py-3.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-200"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center hover:border-emerald-500/50 hover:bg-gray-800/50 transition-colors cursor-pointer group">
                <Icon className="w-8 h-8 mx-auto mb-3 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                <h3 className="font-medium text-sm text-gray-200">{cat.name}</h3>
                <span className="text-xs text-gray-500 mt-1 block">{cat.count} maqola</span>
              </div>
            )
          })}
        </div>

        {/* Recent Articles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">So'nggi Maqolalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link href={`/knowledge/article-${article.id}`} key={article.id}>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-full flex flex-col hover:border-emerald-500/30 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="mb-4">
                    <span className="text-xs font-medium px-2.5 py-1 bg-gray-800 text-emerald-400 rounded-md">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 flex-1 text-gray-100 group-hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-gray-800/50">
                    <span>{article.date}</span>
                    <span>{article.readTime} o'qish</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Just missing an import for Globe, will define inline
function Globe(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
