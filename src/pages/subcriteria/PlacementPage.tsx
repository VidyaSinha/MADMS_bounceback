import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

// ShadCN Toast
import { useToast } from '@/components/ui/use-toast';

// Import PrimeReact styles
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Student {
  id: string;
  name: string;
  enrollmentNo: string;
  bills: string;
}

const dummyStudents: Student[] = [
  { id: '1', name: 'Dhruvi Patel', enrollmentNo: '92200133029', bills: '' },
  { id: '2', name: 'Vidya Sinha', enrollmentNo: '92200133021', bills: '' },
  { id: '3', name: 'Umang Hirani', enrollmentNo: '92200133028', bills: '' },
  { id: '4', name: 'Harsh Doshi', enrollmentNo: '92200133027', bills: '' },
  { id: '5', name: 'Vivek Chavda', enrollmentNo: '92200133026', bills: '' },
  { id: '6', name: 'Rishit Rathod', enrollmentNo: '92200133025', bills: '' },
  { id: '7', name: 'Krish Mamtora', enrollmentNo: '92200133056', bills: '' },
  { id: '8', name: 'Aryan Mahida', enrollmentNo: '92200133048', bills: '' },
  { id: '9', name: 'Abhay Nathwani', enrollmentNo: '92200133076', bills: '' },
  { id: '10', name: 'Aryan Langhanoja', enrollmentNo: '92200133084', bills: '' }
];

const PlacementPage: React.FC = () => {
  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const [deleteStudentsDialog, setDeleteStudentsDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [bills, setGradeHistory] = useState<File | null>(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGradeHistory(file);
    }
  };

  const hideDeleteStudentDialog = () => {
    setDeleteStudentDialog(false);
    setStudentToDelete(null);
  };

  const hideDeleteStudentsDialog = () => {
    setDeleteStudentsDialog(false);
  };

  const confirmDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setDeleteStudentDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteStudentsDialog(true);
  };

  const deleteStudent = () => {
    setStudents(students.filter(s => s.id !== studentToDelete?.id));
    setDeleteStudentDialog(false);
    setStudentToDelete(null);

    // o Simple ShadCN notification
    toast({
      title: 'Deleted',
      description: 'Student deleted successfully.',
    });
  };

  const deleteSelectedStudents = () => {
    const remainingStudents = students.filter(s => !selectedStudents.includes(s));
    setStudents(remainingStudents);
    setDeleteStudentsDialog(false);
    setSelectedStudents([]);

    toast({
      title: 'Deleted',
      description: 'Selected students deleted successfully.',
    });
  };
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newStudent: Student = {
    id: Math.random().toString(36).substr(2, 9),
    name: studentName || "Dummy Name",  // fallback dummy data
    enrollmentNo: enrollmentNo || "EN000",
    bills: bills ? URL.createObjectURL(bills) : "dummy-bill.pdf"
  };

  setStudents(prev => [...prev, newStudent]);

  // o Always show positive notification
  toast({
    title: 'Submitted',
    description: 'Form submitted successfully!',
  });

  setIsDialogOpen(false);

  // Reset form
  setStudentName('');
  setEnrollmentNo('');
  setGradeHistory(null);
  setShowAdditionalFields(false);
};

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Students Placement Details</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Details
          </button>
        </div>

        <div className="card overflow-hidden">
          <Toolbar
            className="mb-4"
            left={<div className="flex flex-wrap gap-2"></div>}
            right={<span className="p-input-icon-left">
              <InputText
                type="search"
                onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
                placeholder="Search..."
              />
            </span>}
          />

          <DataTable
            value={students}
            selection={selectedStudents}
            selectionMode="multiple"
            onSelectionChange={(e) => setSelectedStudents(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
            globalFilter={globalFilter}
            header={<h3 className="text-xl font-semibold text-[#2f4883]">Placement Record</h3>}
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column selectionMode="multiple" exportable={false} style={{ width: '3rem' }}></Column>
            <Column field="name" header="Name" sortable style={{ minWidth: '14rem' }}></Column>
            <Column field="enrollmentNo" header="Enrollment No." sortable style={{ minWidth: '14rem' }}></Column>
            <Column
              field="bills"
              header="Bills / Offer Letter"
              body={() => (
                <Button
                  icon="pi pi-file-pdf"
                  className="p-button-rounded p-button-text"
                  onClick={() => {}}
                  tooltip="View Bills/Offer Letter"
                />
              )}
              style={{ minWidth: '10rem' }}
            ></Column>
            <Column
              body={(rowData) => (
                <div className="flex gap-2 justify-center">
                  <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
                  <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteStudent(rowData)} />
                </div>
              )}
              exportable={false}
              style={{ minWidth: '8rem' }}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* Add Details Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
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
                  {/* Bills / Offer Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bills / Offer Letter / Salary Slip
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

      {/* Delete Single Student Dialog */}
      <Dialog
        visible={deleteStudentDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={
          <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteStudentDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteStudent} />
          </>
        }
        onHide={hideDeleteStudentDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {studentToDelete && (
            <span>
              Are you sure you want to delete <b>{studentToDelete.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      {/* Delete Multiple Students Dialog */}
      <Dialog
        visible={deleteStudentsDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={
          <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteStudentsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedStudents} />
          </>
        }
        onHide={hideDeleteStudentsDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Are you sure you want to delete the selected students?</span>
        </div>
      </Dialog>
    </div>
  );
};

export default PlacementPage;
