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

interface FacultyTable {
  facultyName: string;
  expertise: string[];
}

const FacultyExpertise = () => {
  const navigate = useNavigate();
  const { apiBaseUrl } = useApi();

  const [table, setTable] = useState<FacultyTable[]>([
    { facultyName: "Dr. Smith", expertise: ["AI", "ML"] },
    { facultyName: "Prof. Johnson", expertise: ["Networks", "Security"] },
  ]);

  const [facultyName, setFacultyName] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyTable | null>(null);

  const expertiseOptions = ["Embedded and VLSI Design", "Cloud Computing and Security", "Software Development", "Artificial Intelligence / Machine Learning", "Communication engineering"];

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  const handleCheckboxChange = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise]
    );
  };

  const handleSubmit = async () => {
    if (!facultyName || selectedExpertise.length === 0) {
      alert('Please enter faculty name and select expertise.');
      return;
    }

    const newFaculty: FacultyTable = {
      facultyName,
      expertise: selectedExpertise,
    };

    // TODO: call backend API here (apiBaseUrl) if needed

    setTable((prev) => [...prev, newFaculty]);
    setFacultyName('');
    setSelectedExpertise([]);
    alert('Faculty expertise added successfully!');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Back button */}
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
                Faculty Expertise
              </h1>
            </div>
          </div>

          {/* Table + Add Form */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Faculty Expertise</h2>

              {/* Add Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <ShadcnButton className="bg-[#2F4883] hover:bg-slate-900 hover:text-white">
                    + Add Faculty
                  </ShadcnButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Faculty Expertise</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="facultyName">Faculty Name</Label>
                      <Input
                        id="facultyName"
                        placeholder="Enter faculty name"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Expertise</Label>
                      <div className="flex flex-col gap-2">
                        {expertiseOptions.map((exp) => (
                          <label key={exp} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedExpertise.includes(exp)}
                              onChange={() => handleCheckboxChange(exp)}
                            />
                            {exp}
                          </label>
                        ))}
                      </div>
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
            <DataTable value={table} tableStyle={{ minWidth: '40rem' }} responsiveLayout="scroll">
              <Column field="facultyName" header="Faculty Name" sortable></Column>
              <Column
                field="expertise"
                header="Expertise"
                body={(rowData: FacultyTable) => rowData.expertise.join(", ")}
              ></Column>
              <Column
                header="Actions"
                body={(rowData: FacultyTable) => (
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-text"
                    onClick={() => {
                      setFacultyToDelete(rowData);
                      setShowDeleteDialog(true);
                    }}
                    tooltip="Delete"
                  />
                )}
              ></Column>
            </DataTable>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacultyExpertise;
