import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApi } from '@/contexts/ApiContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';


interface Student {
  enrollment_number: string;
  registration_form: string;
  tenth_marksheet: string;
  twelfth_marksheet: string;
  gujcet_marksheet: string;
}

const dummyStudents: Student[] = [
  { enrollment_number: '1', registration_form: '', tenth_marksheet: '', twelfth_marksheet: '', gujcet_marksheet: '' },
  { enrollment_number: '2', registration_form: '', tenth_marksheet: '', twelfth_marksheet: '', gujcet_marksheet: '' },
  { enrollment_number: '3', registration_form: '', tenth_marksheet: '', twelfth_marksheet: '', gujcet_marksheet: '' },
  { enrollment_number: '4', registration_form: '', tenth_marksheet: '', twelfth_marksheet: '', gujcet_marksheet: '' }
];

function EnrollmentPage(): JSX.Element {
  const { apiBaseUrl } = useApi();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [showDocumentFields, setShowDocumentFields] = useState(false);
  const [formData, setFormData] = useState<Record<string, File | null>>({
    registration_form: null,
    tenth_marksheet: null,
    twelfth_marksheet: null,
    gujcet_marksheet: null
  });

  const [suggestions, setSuggestions] = useState<{ enrollment_number: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<Student[]>>(null);


useEffect(() => {
  const fetchEnrollment = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/upload-documents`);
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setStudents([]);
    }
  };

  fetchEnrollment();
}, [apiBaseUrl]);


  const resetForm = () => {
    setEnrollmentNumber('');
    setShowDocumentFields(false);
    setFormData({
      registration_form: null,
      tenth_marksheet: null,
      twelfth_marksheet: null,
      gujcet_marksheet: null
    });
  };

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
  const file = event.target.files?.[0];
  if (file) {
    // Check if the file type is PDF
    if (file.type === 'application/pdf') {
      setFormData((prev) => ({ ...prev, [field]: file }));
    } else {
      alert('Please upload PDF files only');
      event.target.value = ''; // Clear the file input after wrong file
    }
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Check if enrollment number is provided and if any field has a null value or missing file
  if (!enrollmentNumber || Object.values(formData).some((file) => !file || !file.name)) {
    alert('Please fill in all fields and upload valid files.');
    return;
  }

  try {
    setLoading(true);

    const data = new FormData();
    data.append('enrollment_number', enrollmentNumber);

    // Append files to the FormData object
    Object.entries(formData).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    // Sending the request to the server
    const response = await fetch(`${apiBaseUrl}/upload-documents`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);  // Handle the error based on the response text
    }

    const result = await response.json();

    // Handle the server response
    if (result.message) {
      alert('Documents uploaded successfully!');
      setIsDialogOpen(false);
      resetForm();
    } else {
      console.error(result);
      alert(`Upload failed: ${result.message || 'Server error'}`);
    }
  } catch (error) {
    console.error("Error uploading documents:", error);
    alert('Error uploading documents: ' + error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = enrollmentNumber.trim();
      if (!trimmed) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${apiBaseUrl}/student/search?q=${encodeURIComponent(trimmed)}`,
          { credentials: 'include' }
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setSuggestions(data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error('Suggestion fetch error:', err);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [apiBaseUrl,enrollmentNumber]);

  function confirmDeleteStudent(rowData: unknown): void {
    throw new Error('Function not implemented.');
  }

  // Total students expected
const TOTAL_STUDENTS = 60;

// Define what counts as 'entered' — here, let's say all 4 documents are uploaded (non-empty URLs)
const countEnteredStudents = students.filter(student =>
  student.registration_form &&
  student.tenth_marksheet &&
  student.twelfth_marksheet &&
  student.gujcet_marksheet
).length;

// Calculate percentage
const percentage = (countEnteredStudents / TOTAL_STUDENTS) * 100;

// Calculate grade and score based on percentage
function calculateEnrollmentGrade(percentage: number) {
  if (percentage >= 90) return { grade: 'A', score: 20 };
  else if (percentage >= 80) return { grade: 'B', score: 16 };
  else if (percentage >= 70) return { grade: 'C', score: 12 };
  else if (percentage >= 60) return { grade: 'D', score: 8 };
  else return { grade: 'E', score: 4 };
}

const { grade, score } = calculateEnrollmentGrade(percentage);


  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2f4883]">Enrollment Ratio Details</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
        >
          Add Details
        </button>
      </div>

      <div className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
  <p>Total Students Expected: {TOTAL_STUDENTS}</p>
  <p>Students Entered: {countEnteredStudents}</p>
  <p>Enrollment Percentage: {percentage.toFixed(2)}%</p>
  <p>Grade: <strong>{grade}</strong> | Score: <strong>{score}</strong></p>
</div>


<DataTable
  value={students}
  paginator
  rows={10}
  rowsPerPageOptions={[5, 10, 25]}
  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
  globalFilter={globalFilter}
  header={<h3 className="text-xl font-semibold text-[#2f4883]">Student Records</h3>}
  className="p-datatable-sm p-datatable-gridlines"
>
  <Column field="enrollment_number" header="Enrollment No." sortable style={{ minWidth: '14rem' }} />
  <Column
    field="registration_form"
    header="Registration Form"
    body={(rowData) => (
      <a href={rowData.registration_form} target="_blank" rel="noopener noreferrer">
        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" tooltip="View Registration Form" />
      </a>
    )}
    style={{ minWidth: '10rem' }}
  />
  <Column
    field="tenth_marksheet"
    header="10th Marksheet"
    body={(rowData) => (
      <a href={rowData.tenth_marksheet} target="_blank" rel="noopener noreferrer">
        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" tooltip="View 10th Marksheet" />
      </a>
    )}
    style={{ minWidth: '10rem' }}
  />
  <Column
    field="twelfth_marksheet"
    header="12th Marksheet"
    body={(rowData) => (
      <a href={rowData.twelfth_marksheet} target="_blank" rel="noopener noreferrer">
        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" tooltip="View 12th Marksheet" />
      </a>
    )}
    style={{ minWidth: '10rem' }}
  />
  <Column
    field="gujcet_marksheet"
    header="GUJCET Marksheet"
    body={(rowData) => (
      <a href={rowData.gujcet_marksheet} target="_blank" rel="noopener noreferrer">
        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" tooltip="View GUJCET Marksheet" />
      </a>
    )}
    style={{ minWidth: '10rem' }}
  />
</DataTable>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Enrollment Documents</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2 relative">
              <Label htmlFor="enrollment">Enrollment Number</Label>
              <Input
                id="enrollment"
                value={enrollmentNumber}
                onChange={(e) => {
                  setEnrollmentNumber(e.target.value);
                  if (e.target.value) setShowDocumentFields(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => enrollmentNumber && setShowSuggestions(true)}
                placeholder="Enter enrollment number"
                required
              />
              {showSuggestions && (
                <ul className="absolute z-50 w-full border bg-white mt-1 max-h-40 overflow-y-auto rounded-md shadow">
                  {suggestions.length > 0 ? (
                    suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setEnrollmentNumber(s.enrollment_number);
                          setShowSuggestions(false);
                          setShowDocumentFields(true);
                        }}
                      >
                        {s.enrollment_number}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-500">No matching records</li>
                  )}
                </ul>
              )}
            </div>

            {showDocumentFields && (
              <>
                {['registration_form', 'tenth_marksheet', 'twelfth_marksheet', 'gujcet_marksheet'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} (PDF)
                    </Label>
                    <Input
                      id={field}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, field)}
                      required
                    />
                    {formData[field] && (
                      <p className="text-xs text-gray-600">{formData[field]?.name}</p>
                    )}
                  </div>
                ))}
              </>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#2f4883] text-white rounded-md hover:bg-[#1a2a4f] disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EnrollmentPage;
