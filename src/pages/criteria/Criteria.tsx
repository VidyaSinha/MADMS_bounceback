
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SubCriteriaList from '@/components/dashboard/SubCriteriaList';
import { Button } from '@/components/ui/button';

// Mock data for sub-criteria
const getSubCriteria = (body: string, criteriaId: string) => {
  const criteriaNumber = criteriaId.replace('criteria', '');
  
  const subCriteriaCount = criteriaNumber === '1' ? 4 : 
                           criteriaNumber === '2' ? 5 : 
                           criteriaNumber === '3' ? 6 : 
                           criteriaNumber === '4' ? 4 : 
                           criteriaNumber === '5' ? 5 : 
                           criteriaNumber === '6' ? 4 : 
                           criteriaNumber === '7' ? 3 : 
                           criteriaNumber === '8' ? 4 : 3;
  
  return Array.from({ length: subCriteriaCount }, (_, i) => ({
    id: `${criteriaId}-${i + 1}`,
    title: `Sub-criteria ${criteriaNumber}.${i + 1}`,
    path: `/dashboard/${body}/${criteriaId}/${criteriaNumber}.${i + 1}`,
  }));
};

const getCriteriaTitle = (body: string, criteriaId: string) => {
  const criteriaMap: Record<string, Record<string, string>> = {
    nba: {
      criteria1: 'Vision, Mission and Program Educational Objectives',
      criteria2: 'Program Outcomes',
      criteria3: 'Course Outcomes',
      criteria4: 'Students\' Performance',
      criteria5: 'Faculty Contributions',
      criteria6: 'Facilities and Technical Support',
      criteria7: 'Academic Support Units and Teaching-Learning Process',
      criteria8: 'Governance, Institutional Support and Financial Resources',
      criteria9: 'Continuous Improvement',
    },
    naac: {
      criteria1: 'Curricular Aspects',
      criteria2: 'Teaching-Learning and Evaluation',
      criteria3: 'Research, Innovations and Extension',
      criteria4: 'Infrastructure and Learning Resources',
      criteria5: 'Student Support and Progression',
      criteria6: 'Governance, Leadership and Management',
      criteria7: 'Institutional Values and Best Practices',
    },
    nirf: {
      criteria1: 'Teaching, Learning & Resources',
      criteria2: 'Research and Professional Practice',
      criteria3: 'Graduation Outcomes',
      criteria4: 'Outreach and Inclusivity',
      criteria5: 'Perception',
    },
    coe: {
      criteria1: 'Research Output & Quality',
      criteria2: 'Innovation & Entrepreneurship',
      criteria3: 'Industry Collaboration',
      criteria4: 'Infrastructure & Facilities',
      criteria5: 'Faculty Expertise & Development',
    },
    qos: {
      criteria1: 'Academic Quality Assurance',
      criteria2: 'Teaching & Learning Excellence',
      criteria3: 'Campus Facilities & Resources',
      criteria4: 'Student Satisfaction',
      criteria5: 'Student Engagement & Development',
    },
  };

  const criteriaNumber = criteriaId.replace('criteria', '');
  
  return criteriaMap[body]?.[criteriaId] || `Criteria ${criteriaNumber}`;
};

const getBodyTitle = (body: string) => {
  const bodyMap: Record<string, string> = {
    nba: 'NBA Accreditation',
    naac: 'NAAC Accreditation',
    nirf: 'NIRF Ranking',
    coe: 'Center of Excellence',
    qos: 'Quality of Service',
  };
  
  return bodyMap[body] || body.toUpperCase();
};

const Criteria = () => {
  const { body, criteriaId } = useParams<{ body: string; criteriaId: string }>();
  const navigate = useNavigate();
  
  if (!body || !criteriaId) {
    return <div>Invalid criteria</div>;
  }
  
  const criteriaTitle = getCriteriaTitle(body, criteriaId);
  const bodyTitle = getBodyTitle(body);
  const subCriteria = getSubCriteria(body, criteriaId);
  const criteriaNumber = criteriaId.replace('criteria', '');
  
  const handleBack = () => {
    navigate(`/dashboard/${body}`);
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground mb-2 -ml-2 animate-fadeIn"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to {bodyTitle}
        </Button>
        <DashboardHeader 
          title={`Criteria ${criteriaNumber}: ${criteriaTitle}`}
          subtitle={`View all sub-criteria for ${bodyTitle} Criteria ${criteriaNumber}`}
        />
      </div>
      
      <SubCriteriaList 
        subCriteria={subCriteria} 
        criteriaTitle={`Criteria ${criteriaNumber} Sub-criteria`} 
      />
    </MainLayout>
  );
};

export default Criteria;
