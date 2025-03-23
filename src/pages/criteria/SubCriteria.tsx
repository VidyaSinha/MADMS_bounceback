
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

const SubCriteria = () => {
  const { body, criteriaId, subCriteriaId } = useParams<{ 
    body: string; 
    criteriaId: string;
    subCriteriaId: string;
  }>();
  const navigate = useNavigate();
  
  if (!body || !criteriaId || !subCriteriaId) {
    return <div>Invalid sub-criteria</div>;
  }
  
  const bodyTitle = getBodyTitle(body);
  const criteriaNumber = criteriaId.replace('criteria', '');
  
  const handleBack = () => {
    navigate(`/dashboard/${body}/${criteriaId}`);
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
          Back to Criteria {criteriaNumber}
        </Button>
        <DashboardHeader 
          title={`Sub-criteria ${subCriteriaId}`}
          subtitle={`${bodyTitle} Criteria ${criteriaNumber} > Sub-criteria ${subCriteriaId}`}
        />
      </div>
      
      <Card className="p-5 animate-fadeIn">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">
              This is the detailed information for Sub-criteria {subCriteriaId} of {bodyTitle} Criteria {criteriaNumber}.
              Here you can view and manage all relevant data, documents, and metrics associated with this specific sub-criteria.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="p-4 border border-border rounded-md">
                  <div className="text-sm text-muted-foreground">Metric {subCriteriaId}.{i + 1}</div>
                  <div className="font-medium mt-1">Sample Metric {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Documentation</h3>
            <div className="p-4 border border-border rounded-md bg-accent/30">
              <p className="text-muted-foreground text-sm">
                Upload or manage documents related to Sub-criteria {subCriteriaId}.
              </p>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">Manage Documents</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default SubCriteria;
