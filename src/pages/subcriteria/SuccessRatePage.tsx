import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';

interface Student {
  id: string;
  name: string;
  enrollmentNo: string;
  hasBacklog: boolean;
  backlogSemesters: number[];
  gradeHistory: string;
}

const SuccessRatePage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [hasBacklog, setHasBacklog] = useState(false);
  const [selectedSemesters, setSelectedSemesters] = useState<number[]>([]);
  const [gradeHistory, setGradeHistory] = useState<File | null>(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    enrollmentNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    hasBacklog: { value: null, matchMode: FilterMatchMode.EQUALS }
  });

  const handleSemesterChange = (semester: number) => {
    setSelectedSemesters(prev =>
      prev.includes(semester)
        ? prev.filter(s => s !== semester)
        : [...prev, semester]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGradeHistory(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsDialogOpen(false);
    // Reset form
    setStudentName('');
    setHasBacklog(false);
    setSelectedSemesters([]);
    setGradeHistory(null);
    setShowAdditionalFields(false);
  };

  useEffect(() => {
    // Fetch students data from backend
    const fetchStudents = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const actionBodyTemplate = (rowData: Student) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" rounded outlined aria-label="Edit" onClick={() => handleEdit(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" aria-label="Delete" onClick={() => handleDelete(rowData)} />
      </div>
    );
  };

  const backlogTemplate = (rowData: Student) => {
    return <Tag severity={rowData.hasBacklog ? 'danger' : 'success'} value={rowData.hasBacklog ? 'Yes' : 'No'} />;
  };

  const semestersTemplate = (rowData: Student) => {
    return rowData.hasBacklog ? rowData.backlogSemesters.join(', ') : '-';
  };

  const gradeHistoryTemplate = (rowData: Student) => {
    return (
      <Button 
        icon="pi pi-file-pdf" 
        rounded 
        outlined 
        aria-label="View Grade History"
        onClick={() => window.open(rowData.gradeHistory, '_blank')} 
      />
    );
  };

  const handleEdit = (student: Student) => {
    // Implement edit functionality
    console.log('Edit student:', student);
  };

  const handleDelete = (student: Student) => {
    // Implement delete functionality
    console.log('Delete student:', student);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Success Rate Details */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Success Rate Details</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Details
          </button>
        </div>

        <DataTable
          value={students}
          paginator
          rows={10}
          loading={loading}
          dataKey="id"
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={['name', 'enrollmentNo']}
          emptyMessage="No students found."
          className="mt-6"
        >
          <Column 
            field="name" 
            header="Name" 
            filter 
            filterPlaceholder="Search by name" 
            style={{ minWidth: '12rem' }} 
          />
          <Column 
            field="enrollmentNo" 
            header="Enrollment No." 
            filter 
            filterPlaceholder="Search by enrollment" 
            style={{ minWidth: '12rem' }} 
          />
          <Column 
            field="hasBacklog" 
            header="Backlog" 
            body={backlogTemplate} 
            filter 
            filterMenuStyle={{ width: '14rem' }} 
            style={{ minWidth: '8rem' }} 
          />
          <Column 
            field="backlogSemesters" 
            header="Semesters of Backlog" 
            body={semestersTemplate} 
            style={{ minWidth: '12rem' }} 
          />
          <Column 
            field="gradeHistory" 
            header="Grade History" 
            body={gradeHistoryTemplate} 
            style={{ minWidth: '8rem' }} 
          />
          <Column 
            body={actionBodyTemplate} 
            exportable={false} 
            style={{ minWidth: '8rem' }} 
          />
        </DataTable>
      </div>

      {/* Add Details Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">Add Student Details</h3>
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  setShowAdditionalFields(false);
                  setStudentName('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (e.target.value) {
                      setShowAdditionalFields(true);
                    } else {
                      setShowAdditionalFields(false);
                    }
                  }}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {showAdditionalFields && (
                <>
                  {/* Grade History Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade History
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-medium
                        file:bg-[#2f4883] file:text-white
                        hover:file:bg-[#25376a]"
                      required
                    />
                  </div>

                  {/* Backlog Status */}
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasBacklog}
                        onChange={(e) => setHasBacklog(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-[#2f4883] rounded"
                      />
                      <span className="text-gray-700">Has Backlog</span>
                    </label>
                  </div>

                  {/* Semester Selection */}
                  {hasBacklog && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Semesters with Backlog
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((semester) => (
                          <label key={semester} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSemesters.includes(semester)}
                              onChange={() => handleSemesterChange(semester)}
                              className="form-checkbox h-5 w-5 text-[#2f4883] rounded"
                            />
                            <span className="text-gray-700">Semester {semester}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessRatePage;