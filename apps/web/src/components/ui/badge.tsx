import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  difficulty?: Difficulty;
  variant?: 'default' | 'outline';
}

const difficultyColors = {
  BEGINNER: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  INTERMEDIATE: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  ADVANCED: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  EXPERT: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, difficulty, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border',
          difficulty ? difficultyColors[difficulty] : 'bg-elevated text-primary border-subtle',
          variant === 'outline' && !difficulty ? 'bg-transparent border-subtle text-secondary' : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
