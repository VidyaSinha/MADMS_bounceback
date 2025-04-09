import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Student {
    name: string;
    enrollmentNumber: string;
    marksheet10: string | null;
    marksheet12: string | null;
    registrationForm: string | null;
}

interface Students {
  
  name: string;
  enrollmentNo: string;
  academicyear: string;
  registrationform: string;
  SSCform: string;
  HSCform: string;
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
  const [products, setProducts] = useState([
    {name: 'Rajvi', enrollmentNo: '1', academicyear: '2023', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Vidya', enrollmentNo: '2', academicyear: '2021', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Dhruvi', enrollmentNo: '3', academicyear: '2029', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Umang', enrollmentNo: '4', academicyear: '2020', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Diya', enrollmentNo: '5', academicyear: '2014', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Shyama', enrollmentNo: '6', academicyear: '2008', registrationform: '',SSCform: '', HSCform: '' },
  ]);

  const [suggestions, setSuggestions] = useState<{ name: string; enrollment_number: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = studentName.trim();
      if (trimmed === '') {
        setSuggestions([]);
        return;
      }
  
      try {
        const response = await fetch(`https://madms-bounceback-backend.onrender.com/student/search?q=${encodeURIComponent(trimmed)}`, {
          method: 'GET',
          credentials: 'include',
        });
  
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setSuggestions(data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };
  
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [studentName]);
  
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f] transition-colors"
        >
          Add Details
        </button>
      </div>

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

          <DataTable value={products} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
          <Column field="enrollmentNo" header="enrollmentNo" sortable style={{ width: '25%' }}></Column>
          <Column field="name" header="name" sortable style={{ width: '25%' }}></Column>
          <Column field="academicyear" header="academicyear" sortable style={{ width: '25%' }}></Column>
           <Column field="registrationform" header="registrationform" body={(rowData) => (
                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                      )} style={{ minWidth: '10rem' }}></Column>
           <Column field="SSCform" header="SSCform" body={(rowData) => (
                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                      )} style={{ minWidth: '10rem' }}></Column>
           <Column field="HSCform" header="HSCform" body={(rowData) => (
                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                      )} style={{ minWidth: '10rem' }}></Column>
           <Column body={(rowData) => (
            <div className="flex gap-2 justify-center">
              <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
              <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => (rowData)} />
              </div>
            )} exportable={false} style={{ minWidth: '8rem' }}></Column>
      </DataTable>

        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Student Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2 relative">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                name="tudent_name_autofill_bypass"
                autoComplete="off"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (e.target.value) setShowDocumentFields(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => studentName && setShowSuggestions(true)}
                placeholder="Enter student name"
                required
              />
              {showSuggestions && (
                <ul className="absolute z-50 w-full border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto bg-white shadow">
  {suggestions.length > 0 ? (
    suggestions.map((s, index) => (
      <li
        key={index}
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onMouseDown={(e) => {
          e.preventDefault(); // prevent input blur
          setStudentName(`${s.name} (${s.enrollment_number})`);
          setShowSuggestions(false);
          setShowDocumentFields(true);
        }}
      >
        <div className="text-sm font-medium">{s.name}</div>
        <div className="text-xs text-gray-500">{s.enrollment_number}</div>
      </li>
    ))
  ) : (
    <li className="px-4 py-2 text-sm text-gray-500">No students found</li>
  )}
</ul>
              )}
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
