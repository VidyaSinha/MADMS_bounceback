
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  delay = 0
}) => {
  const animationDelayClass = 
    delay === 1 ? "animation-delay-100" :
    delay === 2 ? "animation-delay-200" :
    delay === 3 ? "animation-delay-300" :
    delay === 4 ? "animation-delay-400" : "";

  return (
    <div className={cn(
      "bg-white rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-all duration-300",
      "animate-slideIn opacity-0",
      animationDelayClass,
      className
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-full bg-madms-softgray flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
