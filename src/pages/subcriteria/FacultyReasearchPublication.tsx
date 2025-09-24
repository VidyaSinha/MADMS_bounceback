import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from 'primereact/button';
import { Button as ShadcnButton } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { useApi } from '@/contexts/ApiContext';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface FacultyPublication {
  facultyName: string;
  academicSpecialization: string;
  researchSpecialization: string;
  publications: number;
  hIndex: number;
  coursesDevelopment: string;
  mappingToPSO: string;
}

const FacultyResearchPublication = () => {
  const navigate = useNavigate();
  const { apiBaseUrl } = useApi();

  // --- Dummy Data ---
  const dummyData: FacultyPublication[] = [
    { facultyName: "Dr. A. Sharma", academicSpecialization: "Computer Science", researchSpecialization: "AI & ML", publications: 25, hIndex: 12, coursesDevelopment: "Machine Learning", mappingToPSO: "PSO1, PSO2" },
    { facultyName: "Dr. B. Patel", academicSpecialization: "Information Technology", researchSpecialization: "Cybersecurity", publications: 18, hIndex: 9, coursesDevelopment: "Network Security", mappingToPSO: "PSO2, PSO3" },
    { facultyName: "Dr. C. Mehta", academicSpecialization: "Electronics", researchSpecialization: "VLSI Design", publications: 30, hIndex: 15, coursesDevelopment: "VLSI Circuits", mappingToPSO: "PSO1" },
    { facultyName: "Dr. D. Singh", academicSpecialization: "Mechanical Engg.", researchSpecialization: "Robotics", publications: 22, hIndex: 10, coursesDevelopment: "Automation & Robotics", mappingToPSO: "PSO3" },
    { facultyName: "Dr. E. Reddy", academicSpecialization: "Civil Engg.", researchSpecialization: "Structural Engineering", publications: 12, hIndex: 7, coursesDevelopment: "Bridge Design", mappingToPSO: "PSO1, PSO4" },
    { facultyName: "Dr. F. Khan", academicSpecialization: "Computer Science", researchSpecialization: "Data Science", publications: 28, hIndex: 14, coursesDevelopment: "Big Data Analytics", mappingToPSO: "PSO2" },
    { facultyName: "Dr. G. Iyer", academicSpecialization: "Electrical Engg.", researchSpecialization: "Power Systems", publications: 20, hIndex: 11, coursesDevelopment: "Smart Grids", mappingToPSO: "PSO1, PSO2" },
    { facultyName: "Dr. H. Verma", academicSpecialization: "Information Technology", researchSpecialization: "Cloud Computing", publications: 26, hIndex: 13, coursesDevelopment: "Cloud Applications", mappingToPSO: "PSO2, PSO3" },
    { facultyName: "Dr. I. Joshi", academicSpecialization: "Electronics", researchSpecialization: "Embedded Systems", publications: 19, hIndex: 8, coursesDevelopment: "IoT Systems", mappingToPSO: "PSO3" },
    { facultyName: "Dr. J. Rao", academicSpecialization: "Computer Science", researchSpecialization: "Software Engineering", publications: 23, hIndex: 12, coursesDevelopment: "Agile Development", mappingToPSO: "PSO1, PSO2" },
    { facultyName: "Dr. K. Desai", academicSpecialization: "Mechanical Engg.", researchSpecialization: "Thermal Engineering", publications: 15, hIndex: 6, coursesDevelopment: "Heat Transfer", mappingToPSO: "PSO4" },
    { facultyName: "Dr. L. Nair", academicSpecialization: "Civil Engg.", researchSpecialization: "Environmental Engg.", publications: 10, hIndex: 5, coursesDevelopment: "Water Management", mappingToPSO: "PSO2" },
    { facultyName: "Dr. M. Shah", academicSpecialization: "Computer Science", researchSpecialization: "Artificial Intelligence", publications: 35, hIndex: 16, coursesDevelopment: "AI Applications", mappingToPSO: "PSO1, PSO2, PSO3" },
    { facultyName: "Dr. N. Gupta", academicSpecialization: "Electronics", researchSpecialization: "Signal Processing", publications: 17, hIndex: 9, coursesDevelopment: "DSP Algorithms", mappingToPSO: "PSO2" },
    { facultyName: "Dr. O. Choudhary", academicSpecialization: "Electrical Engg.", researchSpecialization: "Renewable Energy", publications: 21, hIndex: 10, coursesDevelopment: "Solar Power Systems", mappingToPSO: "PSO1, PSO3" },
  ];

  const [table, setTable] = useState<FacultyPublication[]>(dummyData);

  // --- Form states ---
  const [facultyName, setFacultyName] = useState('');
  const [academicSpecialization, setAcademicSpecialization] = useState('');
  const [researchSpecialization, setResearchSpecialization] = useState('');
  const [publications, setPublications] = useState<number | ''>('');
  const [hIndex, setHIndex] = useState<number | ''>('');
  const [coursesDevelopment, setCoursesDevelopment] = useState('');
  const [mappingToPSO, setMappingToPSO] = useState('');

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  const handleSubmit = async () => {
    if (!facultyName || !academicSpecialization || !researchSpecialization || !publications || !hIndex || !coursesDevelopment || !mappingToPSO) {
      alert('Please fill all fields');
      return;
    }

    const newFaculty: FacultyPublication = {
      facultyName,
      academicSpecialization,
      researchSpecialization,
      publications: Number(publications),
      hIndex: Number(hIndex),
      coursesDevelopment,
      mappingToPSO,
    };

    setTable((prev) => [...prev, newFaculty]);

    // Reset form
    setFacultyName('');
    setAcademicSpecialization('');
    setResearchSpecialization('');
    setPublications('');
    setHIndex('');
    setCoursesDevelopment('');
    setMappingToPSO('');

    alert('Faculty publication record added successfully!');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Back Button */}
          <div className="flex justify-between items-center">
            <ShadcnButton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 5
            </ShadcnButton>
          </div>

          {/* Title */}
          <div>
            <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
              <h1 className="text-2xl font-bold text-center">
                Faculty Research Publications
              </h1>
            </div>
          </div>

          <Card className="p-6">
            {/* Header with Dialog Trigger */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Faculty Publication Details</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <ShadcnButton className="bg-[#2F4883] hover:bg-slate-900 hover:text-white">
                    + Add Faculty Publication
                  </ShadcnButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Faculty Publication</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="facultyName">Name of Faculty</Label>
                      <Input
                        id="facultyName"
                        placeholder="Enter faculty name"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="academicSpecialization">Academic Specialization</Label>
                      <Input
                        id="academicSpecialization"
                        placeholder="Enter academic specialization"
                        value={academicSpecialization}
                        onChange={(e) => setAcademicSpecialization(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="researchSpecialization">Research Specialization</Label>
                      <Input
                        id="researchSpecialization"
                        placeholder="Enter research specialization"
                        value={researchSpecialization}
                        onChange={(e) => setResearchSpecialization(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="publications">No. of Publications</Label>
                      <Input
                        id="publications"
                        type="number"
                        placeholder="Enter number"
                        value={publications}
                        onChange={(e) => setPublications(e.target.value ? Number(e.target.value) : '')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hIndex">H-Index</Label>
                      <Input
                        id="hIndex"
                        type="number"
                        placeholder="Enter H-index"
                        value={hIndex}
                        onChange={(e) => setHIndex(e.target.value ? Number(e.target.value) : '')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="coursesDevelopment">Courses Development</Label>
                      <Input
                        id="coursesDevelopment"
                        placeholder="Enter courses"
                        value={coursesDevelopment}
                        onChange={(e) => setCoursesDevelopment(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mappingToPSO">Mapping of Capabilities to PSO</Label>
                      <Input
                        id="mappingToPSO"
                        placeholder="Enter mapping"
                        value={mappingToPSO}
                        onChange={(e) => setMappingToPSO(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="bg-[#2F4883] hover:bg-slate-900"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Data Table */}
            <DataTable value={table} tableStyle={{ minWidth: '70rem' }} responsiveLayout="scroll">
              <Column field="facultyName" header="Name of Faculty" sortable />
              <Column field="academicSpecialization" header="Academic Specialization" sortable />
              <Column field="researchSpecialization" header="Research Specialization" sortable />
              <Column field="publications" header="No. of Publications" sortable />
              <Column field="hIndex" header="H-Index" sortable />
              <Column field="coursesDevelopment" header="Courses Development" sortable />
              <Column field="mappingToPSO" header="Mapping of Capabilities to PSO" sortable />
            </DataTable>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacultyResearchPublication;
