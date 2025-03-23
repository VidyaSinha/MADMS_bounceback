
import React from 'react';
import { ClipboardList } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CriteriaChart from '@/components/dashboard/CriteriaChart';
import CriteriaList from '@/components/dashboard/CriteriaList';
import StatCard from '@/components/dashboard/StatCard';

const chartData = [
  { name: 'Quality', value: 88 },
  { name: 'Teaching', value: 85 },
  { name: 'Facilities', value: 79 },
  { name: 'Satisfaction', value: 82 },
  { name: 'Engagement', value: 76 },
];

const qosCriteria = [
  { id: 'criteria1', title: 'Criteria 1: Academic Quality Assurance', path: '/dashboard/qos/criteria1' },
  { id: 'criteria2', title: 'Criteria 2: Teaching & Learning Excellence', path: '/dashboard/qos/criteria2' },
  { id: 'criteria3', title: 'Criteria 3: Campus Facilities & Resources', path: '/dashboard/qos/criteria3' },
  { id: 'criteria4', title: 'Criteria 4: Student Satisfaction', path: '/dashboard/qos/criteria4' },
  { id: 'criteria5', title: 'Criteria 5: Student Engagement & Development', path: '/dashboard/qos/criteria5' },
];

const QoS = () => {
  return (
    <MainLayout>
      <DashboardHeader 
        title="Quality of Service" 
        subtitle="Service quality metrics and evaluation for institutional performance"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Overall Score"
          value="82/100"
          icon={<ClipboardList className="h-5 w-5" />}
          delay={1}
        />
        <StatCard
          title="Areas Evaluated"
          value="5"
          description="15 sub-parameters"
          delay={2}
        />
        <StatCard
          title="Performance Trend"
          value="↑ 6.2%"
          description="Year-on-year improvement"
          delay={3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CriteriaChart data={chartData} title="QoS Parameter Scores" />
        </div>
        <div>
          <CriteriaList criteria={qosCriteria} title="CRITERIA DETAILS" />
        </div>
      </div>
    </MainLayout>
  );
};

export default QoS;
