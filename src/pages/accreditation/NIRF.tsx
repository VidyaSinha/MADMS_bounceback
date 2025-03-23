
import React from 'react';
import { BarChart3 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CriteriaChart from '@/components/dashboard/CriteriaChart';
import CriteriaList from '@/components/dashboard/CriteriaList';
import StatCard from '@/components/dashboard/StatCard';

const chartData = [
  { name: 'Teaching', value: 85 },
  { name: 'Research', value: 72 },
  { name: 'Graduation', value: 88 },
  { name: 'Outreach', value: 68 },
  { name: 'Perception', value: 75 },
];

const nirfCriteria = [
  { id: 'criteria1', title: 'Criteria 1: Teaching, Learning & Resources', path: '/dashboard/nirf/criteria1' },
  { id: 'criteria2', title: 'Criteria 2: Research and Professional Practice', path: '/dashboard/nirf/criteria2' },
  { id: 'criteria3', title: 'Criteria 3: Graduation Outcomes', path: '/dashboard/nirf/criteria3' },
  { id: 'criteria4', title: 'Criteria 4: Outreach and Inclusivity', path: '/dashboard/nirf/criteria4' },
  { id: 'criteria5', title: 'Criteria 5: Perception', path: '/dashboard/nirf/criteria5' },
];

const NIRF = () => {
  return (
    <MainLayout>
      <DashboardHeader 
        title="NIRF Ranking" 
        subtitle="National Institutional Ranking Framework metrics and performance indicators"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Current Rank"
          value="48"
          icon={<BarChart3 className="h-5 w-5" />}
          delay={1}
        />
        <StatCard
          title="Total Score"
          value="78.6/100"
          description="Improved by 3.2 points"
          delay={2}
        />
        <StatCard
          title="Evaluation Cycle"
          value="2023-24"
          description="Next submission: January 2025"
          delay={3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CriteriaChart data={chartData} title="NIRF Parameter Scores" />
        </div>
        <div>
          <CriteriaList criteria={nirfCriteria} title="CRITERIA DETAILS" />
        </div>
      </div>
    </MainLayout>
  );
};

export default NIRF;
