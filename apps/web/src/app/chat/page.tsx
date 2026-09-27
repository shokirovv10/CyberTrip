'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, Hash, Users, Send, Shield, AlertTriangle, 
  Flag, Bell, Search, Sparkles, Code, CheckCircle, Info, 
  HelpCircle, ChevronRight, Terminal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Channel {
  id: string;
  name: string;
  desc: string;
  category: string;
  unreadCount?: number;
}

interface CommunityMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderUsername: string;
  senderBadge?: string;
  senderBadgeColor?: string;
  avatarColor: string;
  content: string;
  codeSnippet?: string;
  timestamp: string;
  isSelf?: boolean;
}

export default function GeneralCommunityChatPage() {
  const [activeChannelId, setActiveChannelId] = useState('umumiy');
  const [inputText, setInputText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [reportModal, setReportModal] = useState<CommunityMessage | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels: Channel[] = [
    { id: 'umumiy', name: 'umumiy', desc: 'Platforma yangiliklari, tanishuv va erkin muloqot', category: 'ASOSIY' },
    { id: 'web-pentest', name: 'web-pentest', desc: 'Web zaifliklar, Bug Bounty va laboratoriyalar tahlili', category: 'XAVFSIZLIK' },
    { id: 'ctf-musobaqalar', name: 'ctf-musobaqalar', desc: 'Turnirlar, Write-up tavsiyalari va jamoa yig\'ish', category: 'MUSOBAQA' },
    { id: 'karyera-ish', name: 'karyera-ish', desc: 'O\'zbekistonda kiberxavfsizlik vakansiyalari va sertifikatlar', category: 'KARYERA' },
    { id: 'yordam-savollar', name: 'yordam-savollar', desc: 'Darslar va simulyatorlarda yuzaga kelgan texnik savollar', category: 'YORDAM' },
  ];

  const [messages, setMessages] = useState<CommunityMessage[]>([
    {
      id: '1',
      channelId: 'umumiy',
      senderName: 'Javohir Usmonov',
      senderUsername: 'j_usmonov',
      senderBadge: 'PENTESTER',
      senderBadgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      avatarColor: 'from-blue-600 to-indigo-600',
      content: 'Assalomu alaykum kiber-hamjamiyat! Yangi CyberTrip platformasi juda qulay qilib ishlab chiqilibdi, ayniqsa brauzerdagi laboratoriya simulyatori ajoyib!',
      timestamp: 'Bugun, 11:20',
    },
    {
      id: '2',
      channelId: 'umumiy',
      senderName: 'Aziza Rahimova',
      senderUsername: 'aziza_cyber',
      senderBadge: 'TALABA',
      senderBadgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      avatarColor: 'from-purple-600 to-pink-600',
      content: 'Vaalaykum assalom! Ha, men ham bugun Web Pentest yo\'nalishini boshladim. SQL Injection bo\'limi judayam tushunarli yozilgan ekan.',
      timestamp: 'Bugun, 11:25',
    },
    {
      id: '3',
      channelId: 'umumiy',
      senderName: 'CYBERTRIP Moderator',
      senderUsername: 'cybertrip_mod',
      senderBadge: 'MODERATOR',
      senderBadgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      avatarColor: 'from-amber-600 to-red-600',
      content: 'Eslatma: Umumiy chatda laboratoriyalarning to\'g\'ridan-to\'g\'ri flaglarini yoki tayyor yechimlarini tarqatish qat\'iyan taqiqlanadi. Maslahat va yo\'nalish berishingiz mumkin!',
      timestamp: 'Bugun, 11:30',
    },
    {
      id: '4',
      channelId: 'web-pentest',
      senderName: 'Timur Aliyev',
      senderUsername: 'taliev_sec',
      senderBadge: 'PRO',
      senderBadgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      avatarColor: 'from-cyan-600 to-teal-600',
      content: 'IDOR laboratoriyasida JSON payload orqali boshqa foydalanuvchining ID-sini so\'rovda almashtirganda JWT validatsiyasi ham tekshirilishi kerak edi, shuni inobatga oling.',
      timestamp: 'Bugun, 12:05',
    },
  ]);

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const channelMessages = messages.filter((m) => m.channelId === activeChannelId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannelId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !codeSnippet.trim()) return;

    const newMsg: CommunityMessage = {
      id: Date.now().toString(),
      channelId: activeChannelId,
      senderName: 'Siz',
      senderUsername: 'my_profile',
      senderBadge: 'TALABA',
      senderBadgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      avatarColor: 'from-cyan-500 to-blue-600',
      content: inputText.trim(),
      codeSnippet: codeSnippet.trim() || undefined,
      timestamp: 'Hozir',
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setCodeSnippet('');
    setShowCode(false);
  };

  const handleReportSubmit = () => {
    setReportSent(true);
    setTimeout(() => {
      setReportModal(null);
      setReportSent(false);
      setReportReason('');
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-[#070A0E] text-gray-100 flex flex-col font-sans overflow-hidden">
      
      {/* Community Chat Header */}
      <div className="bg-[#0B0F17] border-b border-gray-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-black rounded-xl">
            <MessageSquare className="w-5 h-5 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-black text-white tracking-wide">CYBERTRIP HAMJAMIYATI</h1>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">
                Umumiy Chat
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              O'zbekiston kiberxavfsizlik mutaxassislari, talabalar va pentesterlar ochiq forumi
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300 font-medium"><strong className="text-white">142</strong> nafar talaba onlayn</span>
          </div>

          <Link href="/teams">
            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 rounded-xl transition-colors flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Jamoalar tizimi →</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Channel Selector */}
        <aside className="w-64 bg-[#090D13] border-r border-gray-800 flex flex-col flex-shrink-0 hidden md:flex">
          <div className="p-3 border-b border-gray-800/80">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Mavzuiy Kanallar
            </span>
          </div>

          <div className="p-2 space-y-1 flex-1 overflow-y-auto">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannelId(ch.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  activeChannelId === ch.id
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <Hash className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{ch.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Ethics Banner */}
          <div className="p-4 border-t border-gray-800 bg-gray-950/40 text-[11px] text-gray-400 space-y-2">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Etik Pentest Qoidalari</span>
            </div>
            <p className="leading-relaxed">
              O'rganilgan bilimlar faqat mudofaa, qonuniy testlar va ruxsat etilgan lablar uchun mo'ljallangan.
            </p>
          </div>
        </aside>

        {/* Center: Chat Window */}
        <div className="flex-1 flex flex-col bg-[#070A0E] overflow-hidden">
          
          {/* Channel Banner */}
          <div className="px-6 py-2.5 bg-[#0B0F17]/80 border-b border-gray-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <Hash className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">#{activeChannel.name}</span>
              <span className="text-gray-500">—</span>
              <span className="text-gray-400 text-[11px]">{activeChannel.desc}</span>
            </div>

            <span className="text-[10px] text-gray-500 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
              Antispam faol (3s)
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {channelMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
                <MessageSquare className="w-12 h-12 stroke-[1.5] mb-3 text-gray-600" />
                <h3 className="text-sm font-bold text-gray-300">Ushbu kanalda xabarlar yo'q</h3>
                <p className="text-xs text-gray-500 max-w-sm mt-1">
                  Birinchi bo'lib suhbatni boshlang va savolingizni yo'llang!
                </p>
              </div>
            ) : (
              channelMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3.5 group">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${msg.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-md flex-shrink-0 mt-0.5`}>
                    {msg.senderName.charAt(0)}
                  </div>

                  <div className="flex-1 max-w-3xl">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-bold text-white">{msg.senderName}</span>
                      <span className="text-[10px] text-gray-500 font-mono">@{msg.senderUsername}</span>
                      {msg.senderBadge && (
                        <span className={`text-[9px] font-bold border px-1.5 py-0.2 rounded ${msg.senderBadgeColor}`}>
                          {msg.senderBadge}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500">{msg.timestamp}</span>

                      {!msg.isSelf && (
                        <button
                          onClick={() => setReportModal(msg)}
                          title="Qoidabuzarlik haqida xabar berish"
                          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 p-1 transition-opacity"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="text-xs text-gray-300 leading-relaxed bg-[#0B0F17] border border-gray-800/90 rounded-2xl rounded-tl-sm p-3.5">
                      {msg.content}
                    </div>

                    {msg.codeSnippet && (
                      <div className="mt-2 bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs text-cyan-300 overflow-x-auto">
                        <pre>{msg.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-[#0B0F17] border-t border-gray-800">
            {showCode && (
              <div className="mb-2 p-3 bg-gray-950 border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-cyan-400">Kod yoki Skript namunasi:</span>
                  <button onClick={() => setShowCode(false)} className="text-gray-500 hover:text-gray-300 text-xs">
                    Yopish ×
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="curl -X POST http://target/api..."
                  className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs font-mono text-cyan-300 outline-none focus:border-cyan-500"
                />
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  showCode
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                }`}
                title="Kod qo'shish"
              >
                <Code className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={`#${activeChannel.name} kanaliga fikr bildirish...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-gray-900/90 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim() && !codeSnippet.trim()}
                className="p-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-40 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E141D] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Xabarni Moderatsiyaga Yuborish</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Qoidabuzarlik turini tanlang. Moderatorlarimiz ushbu xabarni va foydalanuvchi akkauntini tez fursatda tekshiradi.
            </p>

            <div className="space-y-2">
              {[
                'Tayyor CTF flaglarini yoki to\'g\'ridan-to\'g\'ri lab yechimini tarqatish',
                'Haqoratli so\'zlar yoki noo\'rin muomala',
                'Spam, reklama yoki begona havolalar',
                'Zararli fayllar yoki noqonuniy hujum chaqiriqlari',
              ].map((reason, i) => (
                <label
                  key={i}
                  className={`flex items-center p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    reportReason === reason
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="mr-2 text-amber-500 focus:ring-0"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {reportSent ? (
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-semibold text-center flex items-center justify-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Shikoyat qabul qilindi! Rahmat.</span>
              </div>
            ) : (
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setReportModal(null)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-xl transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  disabled={!reportReason}
                  onClick={handleReportSubmit}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold text-xs rounded-xl transition-colors"
                >
                  Shikoyat yuborish
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
