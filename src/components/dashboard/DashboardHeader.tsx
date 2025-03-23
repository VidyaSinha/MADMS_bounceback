
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight text-madms-charcoal animate-fadeIn">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-1 animate-fadeIn animation-delay-100">{subtitle}</p>
      )}
    </div>
  );
};

export default DashboardHeader;
