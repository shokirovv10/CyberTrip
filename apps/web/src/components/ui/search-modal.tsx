'use client';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 backdrop-blur-sm bg-base/80">
      <div className="w-full max-w-xl bg-card border border-subtle rounded-xl shadow-2xl overflow-hidden mx-4">
        <div className="flex items-center px-4 py-3 border-b border-subtle">
          <Search className="w-5 h-5 text-secondary mr-3" />
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none text-primary focus:outline-none placeholder:text-secondary text-base"
            placeholder="Qidirish... (Darslar, lablar, maqolalar)"
          />
          <button onClick={() => setIsOpen(false)} className="text-xs bg-elevated text-secondary px-2 py-1 rounded border border-subtle">ESC</button>
        </div>
        <div className="p-4 py-8 text-center text-secondary text-sm">
          Qidiruv natijalari bu yerda ko'rinadi.
        </div>
      </div>
    </div>
  );
}
