
import React from 'react';
import { BookOpenCheck } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CriteriaChart from '@/components/dashboard/CriteriaChart';
import CriteriaList from '@/components/dashboard/CriteriaList';
import StatCard from '@/components/dashboard/StatCard';

const chartData = [
  { name: 'Criteria 1', value: 10 },
  { name: 'Criteria 2', value: 11 },
  { name: 'Criteria 3', value: 13 },
  { name: 'Criteria 4', value: 9 },
  { name: 'Criteria 5', value: 12 },
  { name: 'Criteria 6', value: 8 },
  { name: 'Criteria 7', value: 7 },
];

const naacCriteria = [
  { id: 'criteria1', title: 'Criteria 1: Curricular Aspects', path: '/dashboard/naac/criteria1' },
  { id: 'criteria2', title: 'Criteria 2: Teaching-Learning and Evaluation', path: '/dashboard/naac/criteria2' },
  { id: 'criteria3', title: 'Criteria 3: Research, Innovations and Extension', path: '/dashboard/naac/criteria3' },
  { id: 'criteria4', title: 'Criteria 4: Infrastructure and Learning Resources', path: '/dashboard/naac/criteria4' },
  { id: 'criteria5', title: 'Criteria 5: Student Support and Progression', path: '/dashboard/naac/criteria5' },
  { id: 'criteria6', title: 'Criteria 6: Governance, Leadership and Management', path: '/dashboard/naac/criteria6' },
  { id: 'criteria7', title: 'Criteria 7: Institutional Values and Best Practices', path: '/dashboard/naac/criteria7' },
];

const NAAC = () => {
  return (
    <MainLayout>
      <DashboardHeader 
        title="NAAC Accreditation" 
        subtitle="National Assessment and Accreditation Council criteria and metrics"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* <StatCard
          title="Total Criteria"
          value="7"
          icon={<BookOpenCheck className="h-5 w-5" />}
          delay={1}
        /> */}
        <StatCard
          title=""
          value="Grade: A+"
          description=""
          delay={2}
        />
        {/* <StatCard
          title="Accreditation Status"
          value="Active"
          description="Valid till: August 2026"
          delay={3}
        /> */}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CriteriaChart data={chartData} title="NAAC Criteria Scores" />
        </div>
        <div>
          <CriteriaList criteria={naacCriteria} title="CRITERIA DETAILS" />
        </div>
      </div>
    </MainLayout>
  );
};

export default NAAC;
