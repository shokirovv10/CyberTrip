import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-800/60 border border-gray-800/40 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-5 bg-[#0B0F17] border border-gray-800 rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-1/2 h-3" />
    </div>
  );
}
