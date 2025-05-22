import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, Edit2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import FacultyDetailForm from '@/components/forms/FacultyDetailForm';
import StudentFacultyRatioTable from '../subcriteria/StudentFacultyRatioTable';

const Criteria5NBA = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard/nba');
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center relative z-10">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2 animate-fadeIn"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 5
            </Button>
            <Button 
                  className="bg-[#2F4883] hover:bg-slate-900 text-white font-semibold px-6 py-3 text-lg shadow-lg relative z-10"
                  size="lg"
                  onClick={() => navigate('/components/forms/FacultyDetailForm')}
                >
                  + Add faculty Details
                </Button>

            <Sheet>
              <SheetTrigger asChild>
               
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <FacultyDetailForm />
              </SheetContent>
            </Sheet>
          </div>
          
          <div>
            <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
              <h1 className="text-2xl font-bold text-center">
                Criteria 5: Faculty Information and Contribution
              </h1>
            </div>
          </div>
          

          <div className="space-y-4 ">
            <CriteriaCard 
              id="5.1" 
              title="Faculty to Student Ratio" 
              marks={20} 
              actionNavigate="/studnetfacultyratio"
            />
            
            <Card className="border rounded-md overflow-hidden">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-sky-700">5.2 - Faculty Cardre propotion</h3>
                  <div className="flex items-center gap-4">
                    <ActionButtons navigateTo="/successrate" />
                    <span className="text-sky-600 font-medium">20 marks</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <CriteriaCard 
              id="5.3" 
              title="Faculty Qualification" 
              marks={10} 
              actionNavigate="/academic2ndyear"
            />
            
            <CriteriaCard 
              id="5.4" 
              title="Faculty Retention" 
              marks={30} 
              actionNavigate="/placement"
            />
            
            <Card className="border rounded-md overflow-hidden">
              <div className="border-b p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-sky-700">5.5 - Faculty Completence</h3>
                  <div className="flex items-center gap-4">
                    
                    <span className="text-sky-600 font-medium">20 marks</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <SubCriteriaCard 
                  id="4.5.1" 
                  title="Professional Societies/Chapters and Organizing Engineering Events" 
                  marks={5}
                  navigateTo="/societies"
                />
                <SubCriteriaCard 
                  id="4.5.2" 
                  title="Publication of Technical Magazines and Newsletter" 
                  marks={5}
                  navigateTo="/magazine"
                />
                <SubCriteriaCard 
                  id="4.5.3" 
                  title="Participation at Inter-Institution Events by Students of Program of Study" 
                  marks={10}
                  navigateTo="/achievements"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Helper components
const ActionButtons = ({ navigateTo }: { navigateTo?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="text-sky-600 hover:bg-sky-50 border-sky-600"
        onClick={() => navigateTo && navigate(navigateTo)}
      >
        <Eye className="h-4 w-4 mr-1" />
        See Details
      </Button>
      <Button variant="outline" size="sm" className="text-sky-600 hover:bg-sky-50 border-sky-600">
        <Edit2 className="h-4 w-4 mr-1" /> Edit Marks
      </Button>
    </div>
  );
};

interface CriteriaCardProps {
  id: string;
  title: string;
  marks: number;
  actionNavigate?: string; // 
}
const CriteriaCard: React.FC<CriteriaCardProps> = ({ id, title, marks, actionNavigate }) => (
  <Card className="border rounded-md overflow-hidden">
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-teal-700">{id} - {title}</h3>
        <div className="flex items-center gap-4">
          <ActionButtons navigateTo={actionNavigate} />
          <span className="text-teal-600 font-medium">{marks} marks</span>
        </div>
      </div>
    </div>
  </Card>
);

interface SubCriteriaCardProps {
  id: string;
  title: string;
  marks: number;
  navigateTo?: string;
}

const SubCriteriaCard: React.FC<SubCriteriaCardProps> = ({ id, title, marks, navigateTo }) => (
  <div className="border-l-2 border-gray-300 pl-4">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-medium text-gray-700">{id} - {title}</h4>
      <div className="flex items-center gap-4">
        <ActionButtons navigateTo={navigateTo} />
        <span className="text-teal-600 font-medium">{marks} marks</span>
      </div>
    </div>
  </div>
);

export default Criteria5NBA;
