import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CriteriaChart from '@/components/dashboard/CriteriaChart';
import CriteriaRadarChart from '@/components/dashboard/CriteriaRadarChart';

const chartData = [
  { name: 'NAAC', value: 78 },
  { name: 'NIRF', value: 85 },
  { name: 'COE', value: 88 },
  { name: 'QoS', value: 90 }
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      navigate("/login"); // Redirect to login if session is missing
    }
  }, []);

  return (
    <MainLayout>
      <DashboardHeader 
        title="Welcome to MADMS" 
        subtitle="Monitor and manage your accreditation criteria across multiple frameworks"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CriteriaChart data={chartData} title="Accreditation Bodies Overview" />
        <CriteriaRadarChart data={chartData} title="Criteria Performance Radar" />
      </div>
      
      <div className="bg-white p-5 rounded-lg border border-border shadow-sm animate-fadeIn animation-delay-200">
        <h3 className="text-lg font-medium mb-4 text-madms-charcoal">Recent Updates</h3>
        <div className="space-y-3">
          {[ 
            "NAAC Criterion 1.3 documentation updated",
            "NIRF data submission deadline approaching",
            "QoS metrics improved by 8% this quarter"
          ].map((update, index) => (
            <div 
              key={index} 
              className="p-3 border border-border rounded-md text-sm"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              {update}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
