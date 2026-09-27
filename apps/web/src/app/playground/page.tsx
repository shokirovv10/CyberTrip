'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, Shield, Send, ArrowRight, RefreshCw, Copy, Check, 
  Code2, Key, Globe, Lock, Cpu, AlertTriangle, CheckCircle2,
  FileCode, Layers, Search, Sparkles
} from 'lucide-react';

export default function WebSecurityPlaygroundPage() {
  const [activeTool, setActiveTool] = useState<'request-builder' | 'encoder' | 'jwt' | 'headers'>('request-builder');

  // 1. Request Builder State
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [targetUrl, setTargetUrl] = useState('https://target.cybertrip.uz/api/v1/users/me');
  const [headers, setHeaders] = useState<Array<{ key: string; value: string }>>([
    { key: 'Accept', value: 'application/json' },
    { key: 'Authorization', value: 'Bearer cybertrip_token_sample_123' },
    { key: 'User-Agent', value: 'CyberTrip-Pentest-Toolkit/2.0' },
  ]);
  const [requestBody, setRequestBody] = useState('{\n  "role": "admin",\n  "status": "active"\n}');
  const [isSending, setIsSending] = useState(false);
  const [responseOutput, setResponseOutput] = useState<{
    status: number;
    statusText: string;
    timeMs: number;
    headers: Record<string, string>;
    body: string;
    securityAudit: Array<{ header: string; status: 'good' | 'warning' | 'bad'; note: string }>;
  } | null>(null);

  // 2. Encoder State
  const [encoderInput, setEncoderInput] = useState('admin\' OR \'1\'=\'1 --');
  const [encoderType, setEncoderType] = useState<'url' | 'base64' | 'html' | 'hex'>('url');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 3. JWT State
  const [jwtInput, setJwtInput] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDQyIiwidXNlcm5hbWUiOiJzdHVkZW50MSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzEwMDAwMDAwLCJleHAiOjE3MTAwODY0MDB9.s1gNaTuRe_sAmPlE_CYBERTRIP_SECRET'
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendSimulatedRequest = () => {
    setIsSending(true);
    setResponseOutput(null);

    setTimeout(() => {
      setIsSending(false);
      const isSqliAttempt = targetUrl.includes("'") || requestBody.includes("'");
      const isAuthHeader = headers.some(h => h.key.toLowerCase() === 'authorization');

      setResponseOutput({
        status: isSqliAttempt ? 500 : isAuthHeader ? 200 : 401,
        statusText: isSqliAttempt ? 'Internal Server Error' : isAuthHeader ? 'OK' : 'Unauthorized',
        timeMs: Math.floor(Math.random() * 80) + 40,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'server': 'nginx/1.24.0 (Ubuntu)',
          'x-powered-by': 'Express',
          'x-frame-options': 'SAMEORIGIN',
          'x-content-type-options': 'nosniff',
        },
        body: isSqliAttempt
          ? JSON.stringify({ error: "SQL syntax error near ''': check manual that corresponds to your MySQL server version" }, null, 2)
          : JSON.stringify({ id: 1042, username: "student1", role: "STUDENT", permissions: ["lab:read", "lesson:view"] }, null, 2),
        securityAudit: [
          { header: 'Content-Security-Policy', status: 'bad', note: 'Yetishmayapti. XSS hujumlariga qarshi himoya mavjud emas.' },
          { header: 'Strict-Transport-Security (HSTS)', status: 'warning', note: 'Yoqilmagan. So\'rovlar HTTP orqali tushib qolishi xavfi bor.' },
          { header: 'X-Frame-Options', status: 'good', note: 'SAMEORIGIN o\'rnatilgan. Clickjacking cheklangan.' },
          { header: 'X-Content-Type-Options', status: 'good', note: 'nosniff faol. MIME-sniffing hujumlari to\'silgan.' },
          { header: 'Server & X-Powered-By', status: 'bad', note: 'Server versiyalari oshkor qilingan (Information Disclosure).' }
        ]
      });
    }, 600);
  };

  // JWT Decoding logic
  const parseJwt = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      return { header, payload, signature: parts[2] };
    } catch (e) {
      return null;
    }
  };

  const parsedJwt = parseJwt(jwtInput);

  return (
    <div className="min-h-screen bg-[#070A0E] text-gray-100 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-[#0B0F17] border border-gray-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full flex items-center w-max">
                <Terminal className="w-3.5 h-3.5 mr-1.5" /> CyberTrip Pentest Toolkit
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Web Security Playground
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                Brauzer ichida xavfsiz izolyatsiyalangan veb-tahlil vositalari: HTTP so'rovlar konstruktori, javoblarni xavfsizlik audit qilish, kodlash/dekodlash laboratoriyasi va JWT inspektori.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-[#070A0E] border border-gray-800 rounded-2xl p-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveTool('request-builder')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTool === 'request-builder' ? 'bg-cyan-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                HTTP Builder
              </button>
              <button
                onClick={() => setActiveTool('encoder')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTool === 'encoder' ? 'bg-cyan-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                Encoder Lab
              </button>
              <button
                onClick={() => setActiveTool('jwt')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTool === 'jwt' ? 'bg-cyan-500 text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                JWT Debugger
              </button>
            </div>
          </div>
        </div>

        {/* ── TOOL 1: HTTP REQUEST BUILDER & RESPONSE ANALYZER ── */}
        {activeTool === 'request-builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-50">
            
            {/* Left: Request Construction */}
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center">
                    <Send className="w-4 h-4 mr-2 text-cyan-400" /> HTTP So'rov Konstruktori
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">Burp Repeater Modeli</span>
                </div>

                {/* Method & URL Input */}
                <div className="flex space-x-2">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    className="bg-[#070A0E] border border-gray-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-cyan-400 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                  </select>

                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://target.uz/api/..."
                    className="flex-1 bg-[#070A0E] border border-gray-800 rounded-xl px-4 py-2 text-xs font-mono text-gray-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Headers Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-400">HTTP Headers ({headers.length}):</span>
                    <button
                      onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      + Sarlavha qo'shish
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {headers.map((h, i) => (
                      <div key={i} className="flex space-x-2">
                        <input
                          type="text"
                          value={h.key}
                          onChange={(e) => {
                            const newH = [...headers];
                            newH[i].key = e.target.value;
                            setHeaders(newH);
                          }}
                          placeholder="Header-Name"
                          className="w-1/3 bg-[#070A0E] border border-gray-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-gray-300"
                        />
                        <input
                          type="text"
                          value={h.value}
                          onChange={(e) => {
                            const newH = [...headers];
                            newH[i].value = e.target.value;
                            setHeaders(newH);
                          }}
                          placeholder="value"
                          className="flex-1 bg-[#070A0E] border border-gray-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Body (for POST/PUT/PATCH) */}
                {method !== 'GET' && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-gray-400 block">So'rov Tanasi (Body / Payload):</span>
                    <textarea
                      rows={5}
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="w-full bg-[#070A0E] border border-gray-800 rounded-xl p-3 font-mono text-xs text-yellow-300 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={handleSendSimulatedRequest}
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black py-3 rounded-xl font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/10"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>So'rov yuborilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>So'rovni Yuborish & Tahlil Qilish</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Response Analyzer & Security Audit */}
            <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <h3 className="text-sm font-bold text-white flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-emerald-400" /> Server Javobi & Xavfsizlik Auditi
                  </h3>
                  {responseOutput && (
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold ${responseOutput.status === 200 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {responseOutput.status} {responseOutput.statusText}
                      </span>
                      <span className="text-gray-500">{responseOutput.timeMs}ms</span>
                    </div>
                  )}
                </div>

                {!responseOutput && !isSending && (
                  <div className="py-20 text-center space-y-3">
                    <Terminal className="w-12 h-12 text-gray-700 mx-auto" />
                    <p className="text-xs text-gray-400">So'rov yuborilmagan. Chap tomondagi tugmani bosing.</p>
                  </div>
                )}

                {responseOutput && (
                  <div className="space-y-4 pt-4">
                    {/* Security Headers Inspection Bar */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-300 block">Xavfsizlik Sarlavhalari Auditi:</span>
                      <div className="space-y-1.5">
                        {responseOutput.securityAudit.map((audit, idx) => (
                          <div key={idx} className="p-2.5 bg-[#070A0E] border border-gray-800 rounded-xl text-xs flex items-start space-x-2.5">
                            {audit.status === 'good' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                            {audit.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />}
                            {audit.status === 'bad' && <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />}
                            <div>
                              <strong className="text-white font-mono text-[11px] block">{audit.header}</strong>
                              <span className="text-gray-400 text-[11px] leading-relaxed">{audit.note}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Raw Response Preview */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-gray-300 block">Javob Matni (Response Body):</span>
                      <pre className="p-4 bg-black border border-gray-800 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto max-h-48 leading-relaxed">
                        {responseOutput.body}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-800 text-[11px] text-gray-500 font-mono flex items-center justify-between">
                <span>CyberTrip Sandbox Mode</span>
                <span>Port 80/443 Simulated</span>
              </div>
            </div>

          </div>
        )}

        {/* ── TOOL 2: ENCODING / DECODING LAB ── */}
        {activeTool === 'encoder' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center">
                  <FileCode className="w-4 h-4 mr-2 text-cyan-400" /> Kiberxavfsizlik Kodlash & Dekodlash Laboratoriyasi
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">WAF filtrlari va payloadlarni aylanib o'tish (Bypass) uchun tezkor konvertor.</p>
              </div>

              <div className="flex space-x-1.5 bg-[#070A0E] border border-gray-800 rounded-xl p-1 text-xs">
                {(['url', 'base64', 'html', 'hex'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setEncoderType(t)}
                    className={`px-3 py-1 rounded-lg uppercase font-mono font-bold transition-all ${encoderType === t ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 block">Birlamchi Matn / Payload:</span>
              <textarea
                rows={3}
                value={encoderInput}
                onChange={(e) => setEncoderInput(e.target.value)}
                className="w-full bg-[#070A0E] border border-gray-800 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Converted Outputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* URL Encoded */}
              <div className="p-4 bg-[#070A0E] border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400 font-mono">URL Encoded</span>
                  <button
                    onClick={() => handleCopy(encodeURIComponent(encoderInput), 'url')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedKey === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="font-mono text-xs text-gray-300 break-all bg-black/60 p-2.5 rounded-lg border border-gray-800">
                  {encodeURIComponent(encoderInput)}
                </div>
              </div>

              {/* Base64 */}
              <div className="p-4 bg-[#070A0E] border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400 font-mono">Base64</span>
                  <button
                    onClick={() => handleCopy(btoa(encoderInput), 'b64')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedKey === 'b64' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="font-mono text-xs text-gray-300 break-all bg-black/60 p-2.5 rounded-lg border border-gray-800">
                  {btoa(encoderInput)}
                </div>
              </div>

              {/* Hex */}
              <div className="p-4 bg-[#070A0E] border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-400 font-mono">Hex (\\x..)</span>
                  <button
                    onClick={() => {
                      const hex = encoderInput.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
                      handleCopy(hex, 'hex');
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="font-mono text-xs text-gray-300 break-all bg-black/60 p-2.5 rounded-lg border border-gray-800">
                  {encoderInput.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')}
                </div>
              </div>

              {/* HTML Entity */}
              <div className="p-4 bg-[#070A0E] border border-gray-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-yellow-400 font-mono">HTML Entity (&#x..)</span>
                  <button
                    onClick={() => {
                      const html = encoderInput.split('').map(c => '&#x' + c.charCodeAt(0).toString(16) + ';').join('');
                      handleCopy(html, 'html');
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedKey === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="font-mono text-xs text-gray-300 break-all bg-black/60 p-2.5 rounded-lg border border-gray-800">
                  {encoderInput.split('').map(c => '&#x' + c.charCodeAt(0).toString(16) + ';').join('')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TOOL 3: JWT DEBUGGER & INSPECTOR ── */}
        {activeTool === 'jwt' && (
          <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in-50">
            <div>
              <h3 className="text-base font-bold text-white flex items-center">
                <Key className="w-4 h-4 mr-2 text-cyan-400" /> JSON Web Token (JWT) Inspektor
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Token tuzilishi, claims, alg: none zaifliklari va imzo yaxlitligini tekshirish.</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 block">Kiritilgan JWT Token:</span>
              <textarea
                rows={3}
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                className="w-full bg-[#070A0E] border border-gray-800 rounded-xl p-3 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {parsedJwt ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Header */}
                <div className="p-4 bg-[#070A0E] border border-rose-500/30 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">1. Sarlavha (Header)</span>
                  <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-rose-300 overflow-x-auto">
                    {JSON.stringify(parsedJwt.header, null, 2)}
                  </pre>
                </div>

                {/* Payload */}
                <div className="p-4 bg-[#070A0E] border border-purple-500/30 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">2. Ma'lumot (Payload)</span>
                  <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-purple-300 overflow-x-auto">
                    {JSON.stringify(parsedJwt.payload, null, 2)}
                  </pre>
                </div>

                {/* Signature */}
                <div className="p-4 bg-[#070A0E] border border-blue-500/30 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">3. Imzo (Signature)</span>
                  <div className="p-3 bg-black/60 rounded-lg text-xs font-mono text-blue-300 break-all">
                    {parsedJwt.signature}
                  </div>
                  <div className="pt-2 text-[11px] text-gray-400">
                    Algoritm: <strong className="text-white">{parsedJwt.header.alg || 'unknown'}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                ⚠️ Noto'g'ri JWT formati. Token uchta nuqta bilan ajratilgan qismdan iborat bo'lishi kerak.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
