import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


interface Student {
    name: string;
    enrollmentNumber: string;
    marksheet10: string | null;
    marksheet12: string | null;
    registrationForm: string | null;
}

function EnrollmentPage(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showDocumentFields, setShowDocumentFields] = useState(false);
  const [formData, setFormData] = useState({
    registrationForm: null,
    marksheet10th: null,
    marksheet12th: null,
    gujcetResult: null
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, [field]: file }));
    } else {
      alert('Please upload PDF files only');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { studentName, ...formData });
    setIsDialogOpen(false);
    setShowDocumentFields(false);
    setStudentName('');
    setFormData({
      registrationForm: null,
      marksheet10th: null,
      marksheet12th: null,
      gujcetResult: null
    });
  };

  // Add these state declarations here, before the return statement
  const [students, setStudents] = useState<Student[]>([
    { 
        name: 'John Doe', 
        enrollmentNumber: 'EN001', 
        marksheet10: null,
        marksheet12: null,
        registrationForm: null 
    },
    { 
        name: 'Jane Smith', 
        enrollmentNumber: 'EN002', 
        marksheet10: null,
        marksheet12: null,
        registrationForm: null 
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const handleDelete = (rowData: Student): void => {
    const updatedStudents = students.filter(student => 
        student.enrollmentNumber !== rowData.enrollmentNumber
    );
    setStudents(updatedStudents);
  };

  const actionBodyTemplate = (rowData: Student): JSX.Element => {
    return (
        <div className="flex gap-2">
            <Button 
                icon="pi pi-pencil" 
                rounded 
                outlined 
                className="mr-2"
                style={{ backgroundColor: '#ffffff', color: '#2f4883' }}
            />
            <Button 
                icon="pi pi-trash" 
                rounded 
                outlined 
                severity="danger" 
                onClick={() => handleDelete(rowData)}
            />
        </div>
    );
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Add Details Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f] transition-colors"
        >
          Add Details
        </button>
      </div>

      {/* Enrollment Ratio Details */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Ratio Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4 font-semibold">Academic Year</th>
                <th className="py-3 px-4 font-semibold">N (From Table 4.1)</th>
                <th className="py-3 px-4 font-semibold">N1 (From Table 4.1)</th>
                <th className="py-3 px-4 font-semibold">Enrollment Ratio [(N1/N)*100]</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2024-25 (CAY)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2023-24 (CAYm1)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2022-23 (CAYm2)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">42</td>
                <td className="py-3 px-4">70%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Student Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (e.target.value) setShowDocumentFields(true);
                }}
                placeholder="Enter student name"
                required
              />
            </div>

            {showDocumentFields && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationForm">Registration Form (PDF)</Label>
                  <Input
                    id="registrationForm"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'registrationForm')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marksheet10th">10th Marksheet (PDF)</Label>
                  <Input
                    id="marksheet10th"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'marksheet10th')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marksheet12th">12th Marksheet (PDF)</Label>
                  <Input
                    id="marksheet12th"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'marksheet12th')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gujcetResult">GUJCET Result (PDF)</Label>
                  <Input
                    id="gujcetResult"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'gujcetResult')}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  setShowDocumentFields(false);
                  setStudentName('');
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2f4883] text-white rounded-md hover:bg-[#1a2a4f]"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EnrollmentPage;
