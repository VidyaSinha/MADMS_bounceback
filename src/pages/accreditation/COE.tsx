
import React from 'react';
import { Building2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CriteriaChart from '@/components/dashboard/CriteriaChart';
import CriteriaList from '@/components/dashboard/CriteriaList';
import StatCard from '@/components/dashboard/StatCard';

const chartData = [
  { name: 'Research', value: 82 },
  { name: 'Innovation', value: 75 },
  { name: 'Collaboration', value: 68 },
  { name: 'Infrastructure', value: 79 },
  { name: 'Expertise', value: 87 },
];

const coeCriteria = [
  { id: 'criteria1', title: 'Criteria 1: Research Output & Quality', path: '/dashboard/coe/criteria1' },
  { id: 'criteria2', title: 'Criteria 2: Innovation & Entrepreneurship', path: '/dashboard/coe/criteria2' },
  { id: 'criteria3', title: 'Criteria 3: Industry Collaboration', path: '/dashboard/coe/criteria3' },
  { id: 'criteria4', title: 'Criteria 4: Infrastructure & Facilities', path: '/dashboard/coe/criteria4' },
  { id: 'criteria5', title: 'Criteria 5: Faculty Expertise & Development', path: '/dashboard/coe/criteria5' },
];

const COE = () => {
  return (
    <MainLayout>
      <DashboardHeader 
        title="Center of Excellence" 
        subtitle="Performance metrics and evaluation for institutional centers of excellence"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Active COEs"
          value="3"
          icon={<Building2 className="h-5 w-5" />}
          delay={1}
        />
        <StatCard
          title="Research Projects"
          value="27"
          description="12 ongoing, 15 completed"
          delay={2}
        />
        <StatCard
          title="Industry Partners"
          value="14"
          description="8 active MoUs"
          delay={3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CriteriaChart data={chartData} title="COE Parameter Evaluation" />
        </div>
        <div>
          <CriteriaList criteria={coeCriteria} title="CRITERIA DETAILS" />
        </div>
      </div>
    </MainLayout>
  );
};

export default COE;
