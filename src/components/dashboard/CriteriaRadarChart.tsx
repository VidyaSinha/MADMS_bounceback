import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface CriteriaRadarChartProps {
  data: { name: string; value: number }[];
  title?: string;
}

const CriteriaRadarChart: React.FC<CriteriaRadarChartProps> = ({ data, title }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-border p-4 animate-scaleIn">
      {title && <h3 className="text-lg font-medium mb-4 text-madms-charcoal">{title}</h3>}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#f0f0f0" />
            <PolarAngleAxis 
              dataKey="name" 
              stroke="#8A898C"
              tick={{ fill: '#8A898C', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              stroke="#8A898C"
              tick={{ fill: '#8A898C', fontSize: 10 }}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              animationDuration={1500}
            />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CriteriaRadarChart; 