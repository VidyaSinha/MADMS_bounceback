import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, Edit2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import StudentDetailsForm from '@/components/forms/StudentDetailsForm';

const Criteria4NBA = () => {
  const navigate = useNavigate();
  const [marksData, setMarksData] = useState<Record<string, number>>({
    '4.1': 20,
    '4.2.1': 10,
    '4.2.2': 10,
    '4.3': 10,
    '4.4': 30,
    '4.5.1': 5,
    '4.5.2': 5,
    '4.5.3': 10,
  });

  const handleBack = () => {
    navigate('/dashboard/nba');
  };

  const handleEditMarks = (id: string) => {
    const currentMarks = marksData[id];
    const newMarks = prompt(`Enter new marks for ${id}`, currentMarks.toString());
    if (newMarks !== null && !isNaN(Number(newMarks))) {
      setMarksData(prev => ({ ...prev, [id]: Number(newMarks) }));
    }
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
              Back to Criteria 4
            </Button>
            <Button 
              className="bg-[#2F4883] hover:bg-slate-900 text-white font-semibold px-6 py-3 text-lg shadow-lg relative z-10"
              size="lg"
              onClick={() => navigate('/components/forms/StudentDetailsForm')}
            >
              + Add Student Details
            </Button>

            <Sheet>
              <SheetTrigger asChild />
              <SheetContent side="right" className="w-full sm:max-w-md">
                <StudentDetailsForm />
              </SheetContent>
            </Sheet>
          </div>

          <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
            <h1 className="text-2xl font-bold text-center">
              Criteria 4: Students' Performance
            </h1>
          </div>

          <div className="space-y-4 text-[#2F4883]">
            <CriteriaCard 
              id="4.1" 
              title="Enrollment Ratio" 
              marks={marksData['4.1']} 
              actionNavigate="/enrollment"
              onEditMarks={handleEditMarks}
            />
          </div>

          <Card className="border rounded-md overflow-hidden">
            <div className="border-b p-4">
              <div className="flex justify-between items-center text-[#2f4883]">
                <h3 className="text-base font-medium">4.2 - Success Rate in Stipulated Period of the Program</h3>
                 <ActionButtons 
                  navigateTo="/successrate" 
                  onEdit={() => handleEditMarks('4.2')} 
                />
                <span className="text-[#2f4883] font-medium">20 marks</span>
              </div>
            </div>
            <div className="p-4 space-y-4 text-[#2f4883]">
              <SubCriteriaCard 
                id="4.2.1" 
                title="Success Rate Without Backlog" 
                marks={marksData['4.2.1']} 
                navigateTo="/successrate"
                onEditMarks={handleEditMarks}
              />
              <SubCriteriaCard 
                id="4.2.2" 
                title="Success Rate With Backlog" 
                marks={marksData['4.2.2']} 
                onEditMarks={handleEditMarks}
              />
            </div>
          </Card>

          <CriteriaCard 
            id="4.3" 
            title="Academic Performance in Second Year" 
            marks={marksData['4.3']} 
            actionNavigate="/academic2ndyear"
            onEditMarks={handleEditMarks}
          />

          <CriteriaCard 
            id="4.4" 
            title="Placement, Higher Studies and Entrepreneurship" 
            marks={marksData['4.4']} 
            actionNavigate="/placement"
            onEditMarks={handleEditMarks}
          />

          <Card className="border rounded-md overflow-hidden">
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-medium text-[#2F4883]">4.5 - Professional Activities</h3>
                <span className="text-[#2F4883] font-medium">20 marks</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <SubCriteriaCard 
                id="4.5.1" 
                title="Professional Societies/Chapters and Organizing Engineering Events" 
                marks={marksData['4.5.1']}
                navigateTo="/societies"
                onEditMarks={handleEditMarks}
              />
              <SubCriteriaCard 
                id="4.5.2" 
                title="Publication of Technical Magazines and Newsletter" 
                marks={marksData['4.5.2']}
                navigateTo="/magazine"
                onEditMarks={handleEditMarks}
              />
              <SubCriteriaCard 
                id="4.5.3" 
                title="Participation at Inter-Institution Events by Students of Program of Study" 
                marks={marksData['4.5.3']}
                navigateTo="/achievements"
                onEditMarks={handleEditMarks}
              />
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

const ActionButtons = ({ navigateTo, onEdit }: { navigateTo?: string; onEdit?: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      {navigateTo && (
        <Button
          variant="outline"
          size="sm"
          className="text-[#2F4883] hover:bg-sky-50 border-[#2F4883]"
          onClick={() => navigate(navigateTo)}
        >
          <Eye className="h-4 w-4 mr-1" />
          See Details
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        className="text-[#2F4883] hover:bg-sky-50 border-[#2f4883]"
        onClick={onEdit}
      >
        <Edit2 className="h-4 w-4 mr-1" />
        Edit Marks
      </Button>
    </div>
  );
};

interface CriteriaCardProps {
  id: string;
  title: string;
  marks: number;
  actionNavigate?: string;
  onEditMarks: (id: string) => void;
}
const CriteriaCard: React.FC<CriteriaCardProps> = ({ id, title, marks, actionNavigate, onEditMarks }) => (
  <Card className="border rounded-md overflow-hidden">
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-[#2F4883]">{id} - {title}</h3>
        <div className="flex items-center gap-4">
          <ActionButtons navigateTo={actionNavigate} onEdit={() => onEditMarks(id)} />
          <span className="text-[#2F4883]">{marks} marks</span>
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
  onEditMarks: (id: string) => void;
}
const SubCriteriaCard: React.FC<SubCriteriaCardProps> = ({ id, title, marks, navigateTo, onEditMarks }) => (
  <div className="border-l-2 border-gray-300 pl-4">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-medium text-gray-700">{id} - {title}</h4>
      <div className="flex items-center gap-4">
        <ActionButtons navigateTo={navigateTo} onEdit={() => onEditMarks(id)} />
        <span className="text-[#2F4883] font-medium">{marks} marks</span>
      </div>
    </div>
  </div>
);

export default Criteria4NBA;
