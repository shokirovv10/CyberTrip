import { cn } from '@/lib/utils';
import { Card, CardContent } from './card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-secondary">{title}</p>
          {icon && <div className="text-secondary">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h2 className="text-3xl font-bold text-primary">{value}</h2>
          {trend && (
            <span className={cn('text-sm font-medium', trend.isPositive ? 'text-accent-green' : 'text-red-500')}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
