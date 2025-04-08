import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
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
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filters, setFilters] = useState({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    // Simulating API call with dummy data
    setLoading(true);
    const dummyData: Student[] = [
      { id: '1', name: 'Chirandu ', enrollmentNo: '2021CS001', hasBacklog: false, backlogSemesters: [], gradeHistory: 'history1.pdf' },
      { id: '2', name: 'ABLAnari', enrollmentNo: '2021CS002', hasBacklog: true, backlogSemesters: [3, 4], gradeHistory: 'history2.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
      { id: '3', name: 'Mike Johnson', enrollmentNo: '2021CS003', hasBacklog: true, backlogSemesters: [2], gradeHistory: 'history3.pdf' },
    ];
    setTimeout(() => {
      setStudents(dummyData);
      setLoading(false);
    }, 500);
  }, []);

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
    if (editingStudent) {
      // Update existing student
      setStudents(prev => prev.map(student => 
        student.id === editingStudent.id 
          ? {
              ...student,
              name: studentName,
              hasBacklog,
              backlogSemesters: selectedSemesters,
              gradeHistory: gradeHistory ? URL.createObjectURL(gradeHistory) : student.gradeHistory
            }
          : student
      ));
    } else {
      // Add new student
      const newStudent: Student = {
        id: String(Date.now()),
        name: studentName,
        enrollmentNo: `2024CS${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        hasBacklog,
        backlogSemesters: selectedSemesters,
        gradeHistory: gradeHistory ? URL.createObjectURL(gradeHistory) : null
      };
      setStudents(prev => [...prev, newStudent]);
    }
    setIsDialogOpen(false);
    // Reset form
    setStudentName('');
    setHasBacklog(false);
    setSelectedSemesters([]);
    setGradeHistory(null);
    setShowAdditionalFields(false);
    setEditingStudent(null);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Success Rate Details */}
      <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Success Rate Details</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Details
          </button>
        </div>

        {/* Search Field */}
        <div className="mb-4">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search in all fields..."
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
          />
        </div>

        {/* Success Rate Table */}
        <DataTable
          value={students}
          paginator
          rows={5}
          loading={loading}
          dataKey="id"
          showGridlines
          className="mt-6"
          emptyMessage="No students found."
          style={{ backgroundColor: 'white' }}
          globalFilter={globalFilter}
          filterDisplay="menu"
        >
          <Column 
            field="name" 
            header="Name" 
            sortable 
            style={{ minWidth: '12rem' }} 
            filter 
            filterPlaceholder="Search by name"
          />
          <Column 
            field="enrollmentNo" 
            header="Enrollment No." 
            sortable 
            style={{ minWidth: '12rem' }} 
            filter 
            filterPlaceholder="Search by enrollment"
          />
          <Column
            field="hasBacklog"
            header="Backlog"
            sortable
            style={{ minWidth: '8rem' }}
            body={(rowData: Student) => (
              <Tag
                value={rowData.hasBacklog ? 'Yes' : 'No'}
                severity={rowData.hasBacklog ? 'danger' : 'success'}
              />
            )}
          />
          <Column
            field="backlogSemesters"
            header="Semesters of Backlog"
            style={{ minWidth: '12rem' }}
            body={(rowData: Student) => (
              rowData.backlogSemesters.length > 0 ? rowData.backlogSemesters.join(', ') : '-'
            )}
          />
          <Column
            field="gradeHistory"
            header="Grade History"
            style={{ minWidth: '10rem' }}
            body={(rowData: Student) => (
              <Button
                icon="pi pi-file-pdf"
                rounded
                text
                severity="info"
                onClick={() => console.log('Download:', rowData.gradeHistory)}
              />
            )}
          />
          <Column
            header="Actions"
            style={{ minWidth: '8rem' }}
            body={(rowData: Student) => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  rounded
                  text
                  severity="success"
                  onClick={() => {
                    setEditingStudent(rowData);
                    setStudentName(rowData.name);
                    setHasBacklog(rowData.hasBacklog);
                    setSelectedSemesters(rowData.backlogSemesters);
                    setShowAdditionalFields(true);
                    setIsDialogOpen(true);
                  }}
                />
                <Button
                  icon="pi pi-trash"
                  rounded
                  text
                  severity="danger"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this student?')) {
                      setStudents(prev => prev.filter(s => s.id !== rowData.id));
                    }
                  }}
                />
              </div>
            )}
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