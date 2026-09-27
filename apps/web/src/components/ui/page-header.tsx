import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  action,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800/80">
      <div>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{title}</h1>
          {badge && (
            <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {(action || children) && (
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          {action}
          {children}
        </div>
      )}
    </div>
  );
}
