import { Shield, Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070A0E] flex flex-col items-center justify-center text-gray-200">
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 animate-pulse">
        <Shield className="w-7 h-7" />
      </div>
      <div className="flex items-center space-x-2.5 text-xs text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
        <span className="font-mono tracking-wider">CYBERTRIP YUKLANMOQDA...</span>
      </div>
    </div>
  );
}
