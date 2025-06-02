import React from 'react';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: { name: string; value: number }[];
  title?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, title }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-border p-4 animate-scaleIn">
      {title && <h3 className="text-lg font-medium mb-4 text-madms-charcoal">{title}</h3>}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <PolarGrid stroke="#f0f0f0" />
            <PolarAngleAxis dataKey="name" stroke="#8A898C" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8A898C" />
            <Radar
              name="Criteria Score"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              animationDuration={1500}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChart; 