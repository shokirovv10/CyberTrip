import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, className, showLabel = false }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-secondary">Progress</span>
          <span className="text-accent-green font-medium">{safeProgress}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-subtle rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent-green transition-all duration-500 ease-out rounded-full"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}
