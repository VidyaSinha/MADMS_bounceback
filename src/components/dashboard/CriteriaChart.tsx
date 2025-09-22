import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CriteriaChart: React.FC = () => {
  // Hardcoded data including NBA
  const data = [
    { name: "NAAC", value: 78 },
    { name: "NIRF", value: 85 },
    { name: "COE", value: 88 },
    { name: "QoS", value: 90 },
    { name: "NBA", value: 82 }, 
    { name: "AICTE", value: 80 },
    { name: "UGC", value: 84 },   
    { name: "ISO", value: 86 },  
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-border p-4 animate-scaleIn">
      <h3 className="text-lg font-medium mb-4 text-madms-charcoal">
        Accreditation Bodies Overview
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#8A898C" />
            <YAxis stroke="#8A898C" />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CriteriaChart;
