'use client';
import { useState, useRef, useEffect } from 'react';
import { TerminalRuntime, TerminalTask } from '@/lib/terminal-runtime';
import { Terminal as TerminalIcon, CheckCircle2, RotateCcw, Award, Sparkles, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

export default function TerminalPage() {
  const [runtime] = useState(() => new TerminalRuntime());
  const [cwd, setCwd] = useState(runtime.vfs.cwd);
  const [tasks, setTasks] = useState<TerminalTask[]>(runtime.tasks);
  const [history, setHistory] = useState<Array<{ cmd: string; out: string; cwd: string }>>([
    {
      cmd: '',
      out: `CYBERTRIP.UZ Interactive Linux Terminal Runtime [Ubuntu 24.04 LTS]\n* Tizimga xush kelibsiz. Barcha buyruqlar real VFS muhitida bajariladi.\n* Topshiriqlarni bajarish uchun o'ng paneldagi ko'rsatmalarga amal qiling.\n* Yordam olish uchun 'help' deb yozing.\n`,
      cwd: '/home/student'
    }
  ]);
  const [cmdInput, setCmdInput] = useState('');
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const termEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const isAllTasksDone = completedTasksCount === tasks.length;

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (runtime.history.length === 0) return;
      const nextIdx = historyIdx === null ? runtime.history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setCmdInput(runtime.history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === null) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= runtime.history.length) {
        setHistoryIdx(null);
        setCmdInput('');
      } else {
        setHistoryIdx(nextIdx);
        setCmdInput(runtime.history[nextIdx] || '');
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    const result = runtime.execute(cmdInput);
    setCwd(result.cwd);

    if (result.output === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { cmd: cmdInput, out: result.output, cwd }]);
    }

    if (result.completedTask) {
      setTasks([...runtime.tasks]);
      setNotification(`🎉 Vazifa bajarildi: "${result.completedTask.title}" (+50 XP)`);
      setTimeout(() => setNotification(null), 5000);
    }

    setCmdInput('');
    setHistoryIdx(null);
  };

  const handleResetSession = () => {
    window.location.reload();
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-[#070A0E] text-gray-100 overflow-hidden font-sans">
      
      {/* ── Notification Toast ── */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-3 text-sm animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── Left: Interactive Terminal Console (70%) ── */}
      <div 
        className="flex-1 bg-[#05080E] p-4 font-mono text-sm overflow-hidden flex flex-col relative border-r border-gray-800/80 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-2.5 mb-3 text-xs text-gray-500 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="text-gray-400 font-semibold ml-2">cybertrip-sandbox:~</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              ONLINE (x86_64)
            </span>
            <button
              onClick={handleResetSession}
              title="Sessiyani qayta tiklash"
              className="hover:text-gray-200 flex items-center text-[11px] text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </button>
          </div>
        </div>

        {/* Terminal Output Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 text-xs leading-relaxed">
          {history.map((h, i) => (
            <div key={i}>
              {h.cmd && (
                <div className="flex items-center text-gray-400">
                  <span className="text-emerald-400 font-semibold">student@cybertrip</span>
                  <span className="text-gray-600">:</span>
                  <span className="text-blue-400 font-semibold">{h.cwd}</span>
                  <span className="text-gray-500 mr-2">$</span>
                  <span className="text-white font-bold">{h.cmd}</span>
                </div>
              )}
              {h.out && (
                <div className="text-gray-300 whitespace-pre-wrap font-mono mt-0.5 pl-2 border-l border-gray-800/40">
                  {h.out}
                </div>
              )}
            </div>
          ))}

          {/* Active Prompt Line */}
          <form onSubmit={handleCommandSubmit} className="flex items-center text-gray-400 pt-1">
            <span className="text-emerald-400 font-semibold">student@cybertrip</span>
            <span className="text-gray-600">:</span>
            <span className="text-blue-400 font-semibold">{cwd}</span>
            <span className="text-gray-500 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-emerald-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={termEndRef} />
        </div>
      </div>

      {/* ── Right: Tasks & Objectives Sidebar (30%) ── */}
      <aside className="w-full lg:w-96 bg-[#0B0F15] flex flex-col flex-shrink-0 border-t lg:border-t-0 overflow-y-auto">
        <div className="p-4 border-b border-gray-800/80 bg-[#0E131A] flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-gray-200">Terminal Topshiriqlari</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {completedTasksCount} / {tasks.length} vazifa bajarildi
            </p>
          </div>
          <div className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
            +200 XP
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-900 h-1.5">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(completedTasksCount / tasks.length) * 100}%` }}
          ></div>
        </div>

        {/* Task Cards */}
        <div className="p-4 space-y-3.5 flex-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-gray-200'
                  : 'bg-gray-900/60 border-gray-800/80 text-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'border-gray-700 bg-gray-950 text-gray-600'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1">
                  <h4 className={`text-xs font-semibold ${task.completed ? 'text-emerald-300' : 'text-gray-200'}`}>
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    {task.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <code className="text-[10px] bg-black/60 px-2 py-0.5 rounded text-gray-400 font-mono border border-gray-800">
                      💡 {task.commandHint}
                    </code>
                    {task.completed && (
                      <span className="text-[10px] text-emerald-400 font-bold">
                        Bajarildi ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isAllTasksDone && (
            <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 rounded-xl p-4 text-center space-y-2">
              <Award className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Barcha Topsiriqlar Bajarildi!</h4>
              <p className="text-xs text-gray-400">
                Siz Linux tizim ma'murligi va audit topshiriqlarini to'liq bajardingiz.
              </p>
            </div>
          )}

          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-3 text-[11px] text-gray-400 leading-relaxed space-y-1">
            <span className="font-semibold text-gray-300 flex items-center">
              <HelpCircle className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Foydali maslahatlar:
            </span>
            <p>• Buyruqlar tarixini ko'rish uchun <kbd className="bg-gray-800 px-1 rounded">↑</kbd> va <kbd className="bg-gray-800 px-1 rounded">↓</kbd> tugmalaridan foydalaning.</p>
            <p>• Ekranni tozalash uchun <kbd className="bg-gray-800 px-1 rounded">clear</kbd> buyrug'ini kiriting.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
