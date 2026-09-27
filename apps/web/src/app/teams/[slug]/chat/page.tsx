'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Shield, Send, Hash, Users, Lock, ArrowLeft, Code, Paperclip, 
  Smile, MoreVertical, CheckCircle2, MessageSquare, Terminal, 
  Clock, AlertCircle, Info, Sparkles 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: 'OWNER' | 'ADMIN' | 'MEMBER';
  avatarColor: string;
  content: string;
  codeSnippet?: string;
  timestamp: string;
  isSelf?: boolean;
}

export default function TeamChatPage({ params }: { params?: { slug?: string } }) {
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || params?.slug || 'cyber-dragons';

  const [activeChannel, setActiveChannel] = useState('umumiy-strategiya');
  const [inputText, setInputText] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { id: 'umumiy-strategiya', name: 'umumiy-strategiya', desc: 'Asosiy jamoaviy muhokama va yangiliklar' },
    { id: 'ctf-topshiriqlar', name: 'ctf-topshiriqlar', desc: 'Musobaqalar va flag tahlili' },
    { id: 'lab-tajribalari', name: 'lab-tajribalari', desc: 'Qiyin laboratoriyalarni yechish sirlari' },
    { id: 'resurslar-fayllar', name: 'resurslar-fayllar', desc: 'Foydali cheat-sheetlar, exploitlar va havolalar' },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderName: 'Alisher Qodirov',
      senderRole: 'OWNER',
      avatarColor: 'from-cyan-500 to-blue-600',
      content: 'Salom jamoa! Bugun soat 20:00 da yangi "DiagnosticPanel — Command Injection" laboratoriyasini birgalikda tahlil qilamiz. Hamma tayyor bo\'lsin!',
      timestamp: 'Bugun, 14:15',
    },
    {
      id: '2',
      senderName: 'Bobur Mirzayev',
      senderRole: 'ADMIN',
      avatarColor: 'from-emerald-500 to-teal-600',
      content: 'Ajoyib! Men DiagnosticPanel filtrlashini ko\'rib chiqdim, ping komandasi orqali ajratgich ishlatganda quyidagi payload orqali RCE olish mumkin ekan:',
      codeSnippet: `127.0.0.1; cat /secret/flag.txt\n# Yoki URL encoded:\n127.0.0.1%3B%20id`,
      timestamp: 'Bugun, 14:18',
    },
    {
      id: '3',
      senderName: 'Dilnoza Karimova',
      senderRole: 'MEMBER',
      avatarColor: 'from-purple-500 to-pink-600',
      content: 'Rahmat Bobur! Men aynan shu laboratoriyada 2-topshiriqda passwd faylini o\'qishda to\'xtab qolgandim, endi sinab ko\'raman.',
      timestamp: 'Bugun, 14:22',
    },
  ]);

  const teamMembers = [
    { name: 'Alisher Qodirov', role: 'Sardor', status: 'online', color: 'from-cyan-500 to-blue-600' },
    { name: 'Bobur Mirzayev', role: 'Admin', status: 'online', color: 'from-emerald-500 to-teal-600' },
    { name: 'Dilnoza Karimova', role: 'A\'zo', status: 'online', color: 'from-purple-500 to-pink-600' },
    { name: 'Sardorbek Rahimov', role: 'A\'zo', status: 'offline', color: 'from-amber-500 to-orange-600' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !codeInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderName: 'Siz (O\'zingiz)',
      senderRole: 'OWNER',
      avatarColor: 'from-cyan-500 to-blue-600',
      content: inputText.trim(),
      codeSnippet: codeInput.trim() || undefined,
      timestamp: 'Hozir',
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setCodeInput('');
    setShowCodeInput(false);
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-[#070A0E] text-gray-100 flex flex-col font-sans overflow-hidden">
      
      {/* Top Bar Banner: Verification & Team Identity */}
      <div className="bg-[#0B0F17] border-b border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Link
            href={`/teams/${slug}`}
            className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 hover:text-cyan-400 text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-bold text-white capitalize">{slug.replace('-', ' ')} Maxfiy Chati</h1>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full flex items-center">
                  <Lock className="w-2.5 h-2.5 mr-1" /> Izolyatsiya qilingan
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Faqat ushbu jamoaning tasdiqlangan a'zolari uchun ochiq
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <div className="flex items-center space-x-1.5 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">3 a'zo faol</span>
          </div>
        </div>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Channels Sidebar */}
        <aside className="w-64 bg-[#090D13] border-r border-gray-800 flex flex-col flex-shrink-0 hidden md:flex">
          <div className="p-3 border-b border-gray-800/80">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Jamoa Kanallari</span>
          </div>
          <div className="p-2 space-y-1 flex-1 overflow-y-auto">
            {channels.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChannel(c.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition-colors ${
                  activeChannel === c.id
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-gray-400 hover:bg-gray-800/60 hover:text-gray-200'
                }`}
              >
                <Hash className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-gray-800/80 bg-gray-950/40">
            <div className="flex items-center space-x-2 text-[11px] text-gray-400">
              <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Yozishmalar shifrlangan va audit logida saqlanadi</span>
            </div>
          </div>
        </aside>

        {/* Center: Messages Feed */}
        <div className="flex-1 flex flex-col bg-[#070A0E] overflow-hidden">
          
          {/* Channel Header */}
          <div className="px-6 py-2.5 bg-[#0B0F17]/60 border-b border-gray-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <Hash className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">{activeChannel}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400 text-[11px]">
                {channels.find((c) => c.id === activeChannel)?.desc}
              </span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="flex items-start space-x-3.5 group">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0 mt-0.5`}>
                  {m.senderName.charAt(0)}
                </div>

                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold text-white">{m.senderName}</span>
                    {m.senderRole === 'OWNER' && (
                      <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded">
                        Sardor
                      </span>
                    )}
                    {m.senderRole === 'ADMIN' && (
                      <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.2 rounded">
                        Admin
                      </span>
                    )}
                    <span className="text-[10px] text-gray-500">{m.timestamp}</span>
                  </div>

                  {m.content && (
                    <div className="text-xs text-gray-300 leading-relaxed bg-[#0B0F17] border border-gray-800/90 rounded-2xl rounded-tl-sm p-3.5">
                      {m.content}
                    </div>
                  )}

                  {m.codeSnippet && (
                    <div className="mt-2 bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs text-cyan-300 overflow-x-auto">
                      <div className="flex items-center justify-between text-[10px] text-gray-500 pb-2 mb-2 border-b border-gray-800">
                        <span>Payload / Code Snippet</span>
                        <span>Bash / Shell</span>
                      </div>
                      <pre>{m.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#0B0F17] border-t border-gray-800">
            {showCodeInput && (
              <div className="mb-2 p-3 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-cyan-400">Terminal buyrug'i yoki Exploit kodi:</span>
                  <button
                    onClick={() => setShowCodeInput(false)}
                    className="text-gray-500 hover:text-gray-300 text-xs"
                  >
                    Yopish ×
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="cat /etc/passwd | grep root..."
                  className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs font-mono text-cyan-300 outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowCodeInput(!showCodeInput)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  showCodeInput
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                }`}
                title="Kod parchasi qo'shish"
              >
                <Code className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={`#${activeChannel} kanaliga xabar yuborish...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-900/90 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim() && !codeInput.trim()}
                className="p-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Right: Team Members Presence */}
        <aside className="w-60 bg-[#090D13] border-l border-gray-800 p-3 hidden lg:flex flex-col flex-shrink-0">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
            A'zolar — {teamMembers.length}
          </span>
          <div className="space-y-2">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-gray-800/40 transition-colors">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-xs`}>
                    {m.name.charAt(0)}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#090D13] ${
                      m.status === 'online' ? 'bg-emerald-400' : 'bg-gray-600'
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold text-gray-200 block truncate">{m.name}</span>
                  <span className="text-[10px] text-gray-500 block">{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}
