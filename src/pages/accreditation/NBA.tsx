
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CriteriaChart from '@/components/dashboard/CriteriaChart';
import CriteriaList from '@/components/dashboard/CriteriaList';
import StatCard from '@/components/dashboard/StatCard';

const chartData = [
  { name: 'Criteria 1', value: 12 },
  { name: 'Criteria 2', value: 9 },
  { name: 'Criteria 3', value: 15 },
  { name: 'Criteria 4', value: 8 },
  { name: 'Criteria 5', value: 14 },
  { name: 'Criteria 6', value: 10 },
  { name: 'Criteria 7', value: 11 },
  { name: 'Criteria 8', value: 7 },
  { name: 'Criteria 9', value: 6 },
];

const nbaCriteria = [
  { id: 'criteria1', title: 'Criteria 1: Vision, Mission and Program Educational Objectives', path: '/dashboard/nba/criteria1' },
  { id: 'criteria2', title: 'Criteria 2: Program Outcomes', path: '/dashboard/nba/criteria2' },
  { id: 'criteria3', title: 'Criteria 3: Course Outcomes', path: '/dashboard/nba/criteria3' },
  { id: 'criteria4', title: 'Criteria 4: Students\' Performance', path: '/dashboard/nba/criteria4' },
  { id: 'criteria5', title: 'Criteria 5: Faculty Contributions', path: '/dashboard/nba/criteria5' },
  { id: 'criteria6', title: 'Criteria 6: Facilities and Technical Support', path: '/dashboard/nba/criteria6' },
  { id: 'criteria7', title: 'Criteria 7: Academic Support Units and Teaching-Learning Process', path: '/dashboard/nba/criteria7' },
  { id: 'criteria8', title: 'Criteria 8: Governance, Institutional Support and Financial Resources', path: '/dashboard/nba/criteria8' },
  { id: 'criteria9', title: 'Criteria 9: Continuous Improvement', path: '/dashboard/nba/criteria9' },
];

const NBA = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <DashboardHeader 
        title="NBA Accreditation" 
        subtitle="National Board of Accreditation criteria and metrics"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Criteria"
          value="9"
          icon={<BarChart3 className="h-5 w-5" />}
          delay={1}
        />
        <StatCard
          title="Total Score"
          value="92/100"
          description="Last evaluated: March 2024"
          delay={2}
        />
        <StatCard
          title="Accreditation Status"
          value="Active"
          description="Valid till: December 2025"
          delay={3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CriteriaChart data={chartData} title="NBA Criteria Scores" />
        </div>
        <div>
          <CriteriaList criteria={nbaCriteria} title="CRITERIA DETAILS" />
        </div>
      </div>
    </MainLayout>
  );
};

export default NBA;
