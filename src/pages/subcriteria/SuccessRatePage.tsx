import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useToast } from "@/components/ui/use-toast"; // o ShadCN toast

// Import PrimeReact styles
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Student {
  id: string;
  name: string;
  enrollmentNo: string;
  hasBacklog: boolean;
  backlogSemesters: number[];
  gradeHistory: string;
}

const dummyStudents: Student[] = [
  { id: '1', name: 'Vidya Sinha', enrollmentNo: '92200133029', hasBacklog: false, backlogSemesters: [], gradeHistory: '' },
  { id: '2', name: 'Rishit Rathod', enrollmentNo: '92200133028', hasBacklog: true, backlogSemesters: [3, 4], gradeHistory: '' },
  { id: '3', name: 'Dhruvi Patel', enrollmentNo: '902200133026', hasBacklog: false, backlogSemesters: [], gradeHistory: '' },
  { id: '4', name: 'Rajvi Dave', enrollmentNo: '92200133001', hasBacklog: true, backlogSemesters: [2], gradeHistory: '' },
  { id: '5', name: 'Umang Hirani', enrollmentNo: '92200133056', hasBacklog: false, backlogSemesters: [], gradeHistory: '' },
  { id: '6', name: 'Ritesh Sachala', enrollmentNo: '92200133075', hasBacklog: true, backlogSemesters: [1, 2], gradeHistory: '' },
  { id: '7', name: 'Vivek Chavda', enrollmentNo: '92200133056', hasBacklog: false, backlogSemesters: [], gradeHistory: '' },
  { id: '8', name: 'Krish Mamtora', enrollmentNo: '92200133048', hasBacklog: true, backlogSemesters: [5], gradeHistory: '' },
  { id: '9', name: 'Riya Visani', enrollmentNo: '92200133038', hasBacklog: false, backlogSemesters: [], gradeHistory: '' },
  { id: '10', name: 'Palak Aghora', enrollmentNo: '92200133094', hasBacklog: true, backlogSemesters: [3], gradeHistory: '' }
];

const SuccessRatePage: React.FC = () => {
  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const [deleteStudentsDialog, setDeleteStudentsDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [hasBacklog, setHasBacklog] = useState(false);
  const [selectedSemesters, setSelectedSemesters] = useState<number[]>([]);
  const [gradeHistory, setGradeHistory] = useState<File | null>(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable<Student[]>>(null);

  const { toast } = useToast(); // o ShadCN toast hook

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
    toast({ title: "Student deleted", description: "Student deleted successfully." });
  };

  const deleteSelectedStudents = () => {
    const remainingStudents = students.filter(s => !selectedStudents.includes(s));
    setStudents(remainingStudents);
    setDeleteStudentsDialog(false);
    setSelectedStudents([]);
    toast({ title: "Students deleted", description: "Selected students deleted successfully." });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: studentName,
      enrollmentNo: enrollmentNo,
      hasBacklog: hasBacklog,
      backlogSemesters: selectedSemesters,
      gradeHistory: gradeHistory ? URL.createObjectURL(gradeHistory) : ''
    };
    setStudents(prev => [...prev, newStudent]);
    toast({ title: "Student added", description: "New student record added successfully." });
    setIsDialogOpen(false);

    // Reset form
    setStudentName('');
    setEnrollmentNo('');
    setHasBacklog(false);
    setSelectedSemesters([]);
    setGradeHistory(null);
    setShowAdditionalFields(false);
  };

  // ===== 4.2 Success Rate Tables (Frontend-only calculations) =====
  type TripleRow = {
    label: string; // CAY, CAYm1, ...
    entry: string; // N1+N2+N3 string e.g. "60+06+00"
    y1: string; // I Year as triple string or NA
    y2: string; // II Year
    y3: string; // III Year
    y4: string; // IV Year
  };

  const [tableWithoutBacklog, setTableWithoutBacklog] = useState<TripleRow[]>([
    { label: 'CAY (2024-2025)', entry: '60+00+00', y1: '', y2: '', y3: '', y4: '' },
    { label: 'CAYm1 (2023-2024)', entry: '60+06+00', y1: '60+NA+00', y2: '', y3: '', y4: '' },
    { label: 'CAYm2 (2022-2023)', entry: '42+16+00', y1: '36+NA+00', y2: '33+14+00', y3: '', y4: '' },
    { label: 'CAYm3 (2021-2022)', entry: '60+06+00', y1: '59+NA+00', y2: '57+06+00', y3: '57+06+00', y4: '' },
    { label: 'CAYm4 (2020-2021)', entry: '33+16+00', y1: '18+NA+00', y2: '18+15+00', y3: '18+15+00', y4: '18+15+00' },
    { label: 'CAYm5 (2019-20)', entry: '48+00+00', y1: '33+NA+00', y2: '30+NA+00', y3: '29+NA+00', y4: '29+NA+00' },
    { label: 'CAYm6 (2018-19)', entry: '42+00+00', y1: '32+NA+00', y2: '29+NA+00', y3: '28+NA+00', y4: '28+NA+00' },
  ]);

  const [tableWithBacklog, setTableWithBacklog] = useState<TripleRow[]>([
    { label: 'CAY (2024-2025)', entry: '60+00+00', y1: '', y2: '', y3: '', y4: '' },
    { label: 'CAYm1 (2023-2024)', entry: '60+06+00', y1: '60+NA+00', y2: '', y3: '', y4: '' },
    { label: 'CAYm2 (2022-2023)', entry: '42+16+00', y1: '42+NA+00', y2: '42+16+00', y3: '', y4: '' },
    { label: 'CAYm3 (2021-2022)', entry: '60+06+00', y1: '60+NA+00', y2: '60+06+00', y3: '60+06+00', y4: '' },
    { label: 'CAYm4 (2020-2021)', entry: '33+16+00', y1: '33+NA+00', y2: '33+16+00', y3: '33+16+00', y4: '32+16+00' },
    { label: 'CAYm5 (2019-20)', entry: '48+00+00', y1: '48+NA+00', y2: '48+NA+00', y3: '48+NA+00', y4: '48+NA+00' },
    { label: 'CAYm6 (2018-19)', entry: '42+00+00', y1: '42+NA+00', y2: '42+NA+00', y3: '42+NA+00', y4: '42+NA+00' },
  ]);

  const parseTriple = (value: string): number => {
    if (!value) return 0;
    return value
      .split('+')
      .map((v) => v.trim().toUpperCase())
      .map((v) => (v === 'NA' || v === '' ? 0 : Number(v) || 0))
      .reduce((a, b) => a + b, 0);
  };

  const sumRow = (row: TripleRow) => parseTriple(row.y1) + parseTriple(row.y2) + parseTriple(row.y3) + parseTriple(row.y4);
  const totalWithout = tableWithoutBacklog.reduce((acc, r) => acc + sumRow(r), 0);
  const totalWith = tableWithBacklog.reduce((acc, r) => acc + sumRow(r), 0);
  const totalGraduated = totalWithout + totalWith;
  const pctWithout = totalGraduated ? (totalWithout / totalGraduated) * 100 : 0;
  const pctWith = totalGraduated ? (totalWith / totalGraduated) * 100 : 0;

  const marksFromPercentage10 = (p: number) => {
    if (p >= 90) return 10;
    if (p >= 80) return 8;
    if (p >= 70) return 6;
    if (p >= 60) return 4;
    return 2;
  };

  const marksWithout = marksFromPercentage10(pctWithout);
  const marksWith = marksFromPercentage10(pctWith);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Success Rate Details</h2>
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
            right={<span className="p-input-icon-left">
              <InputText
                type="search"
                onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
                placeholder="Search..."
              />
            </span>}
          />

          <DataTable
            ref={dt}
            value={students}
            selection={selectedStudents}
            selectionMode="multiple"
            onSelectionChange={(e) => setSelectedStudents(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
            globalFilter={globalFilter}
            header={<h3 className="text-xl font-semibold text-[#2f4883]">Student Records</h3>}
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column selectionMode="multiple" exportable={false} style={{ width: '3rem' }}></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="enrollmentNo" header="Enrollment No." sortable></Column>
            <Column field="hasBacklog" header="Has Backlog" body={(rowData) => rowData.hasBacklog ? 'Yes' : 'No'} sortable></Column>
            <Column field="backlogSemesters" header="Backlog Semesters" body={(rowData) => rowData.backlogSemesters.join(', ')}></Column>
            <Column field="gradeHistory" header="Grade History" body={() => (
              <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" tooltip="View Grade History" />
            )}></Column>
            <Column body={(rowData) => (
              <div className="flex gap-2 justify-center">
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteStudent(rowData)} />
              </div>
            )} exportable={false}></Column>
          </DataTable>
        </div>
      </div>

      {/* 4.2.1 Students Graduated without Backlogs */}
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-[#2f4883] mb-4">4.2.1 Students Graduated without Backlogs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Year of Entry</th>
                <th className="p-2 border">N1+N2+N3 (As defined)</th>
                <th className="p-2 border">I Year</th>
                <th className="p-2 border">II Year</th>
                <th className="p-2 border">III Year</th>
                <th className="p-2 border">IV Year</th>
                <th className="p-2 border">Row Total</th>
              </tr>
            </thead>
            <tbody>
              {tableWithoutBacklog.map((row, idx) => (
                <tr key={row.label}>
                  <td className="p-2 border whitespace-nowrap">{row.label}</td>
                  <td className="p-2 border">
                    <input
                      value={row.entry}
                      onChange={(e) => setTableWithoutBacklog(prev => prev.map((r, i) => i === idx ? { ...r, entry: e.target.value } : r))}
                      className="w-full border rounded p-1"
                      placeholder="e.g. 60+06+00"
                    />
                  </td>
                  {(['y1','y2','y3','y4'] as const).map((key) => (
                    <td key={key} className="p-2 border">
                      <input
                        value={(row as any)[key]}
                        onChange={(e) => setTableWithoutBacklog(prev => prev.map((r, i) => i === idx ? { ...r, [key]: e.target.value } as TripleRow : r))}
                        className="w-full border rounded p-1"
                        placeholder="e.g. 60+NA+00"
                      />
                    </td>
                  ))}
                  <td className="p-2 border text-right font-medium">{sumRow(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p>Total without backlogs: <b>{totalWithout}</b></p>
          <p>Percentage of total graduated: <b>{pctWithout.toFixed(2)}%</b></p>
          <p>Marks (out of 10): <b>{marksWithout}</b></p>
        </div>
      </div>

      {/* 4.2.2 Students Graduated with Backlogs */}
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-[#2f4883] mb-4">4.2.2 Students Graduated with Backlogs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Year of Entry</th>
                <th className="p-2 border">N1+N2+N3 (As defined)</th>
                <th className="p-2 border">I Year</th>
                <th className="p-2 border">II Year</th>
                <th className="p-2 border">III Year</th>
                <th className="p-2 border">IV Year</th>
                <th className="p-2 border">Row Total</th>
              </tr>
            </thead>
            <tbody>
              {tableWithBacklog.map((row, idx) => (
                <tr key={row.label}>
                  <td className="p-2 border whitespace-nowrap">{row.label}</td>
                  <td className="p-2 border">
                    <input
                      value={row.entry}
                      onChange={(e) => setTableWithBacklog(prev => prev.map((r, i) => i === idx ? { ...r, entry: e.target.value } : r))}
                      className="w-full border rounded p-1"
                      placeholder="e.g. 60+06+00"
                    />
                  </td>
                  {(['y1','y2','y3','y4'] as const).map((key) => (
                    <td key={key} className="p-2 border">
                      <input
                        value={(row as any)[key]}
                        onChange={(e) => setTableWithBacklog(prev => prev.map((r, i) => i === idx ? { ...r, [key]: e.target.value } as TripleRow : r))}
                        className="w-full border rounded p-1"
                        placeholder="e.g. 60+NA+00"
                      />
                    </td>
                  ))}
                  <td className="p-2 border text-right font-medium">{sumRow(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p>Total with backlogs: <b>{totalWith}</b></p>
          <p>Percentage of total graduated: <b>{pctWith.toFixed(2)}%</b></p>
          <p>Marks (out of 10): <b>{marksWith}</b></p>
        </div>
        <div className="mt-4 p-3 rounded bg-blue-50 border border-blue-200">
          <p><b>Combined 4.2 Score (out of 20):</b> {marksWithout + marksWith}</p>
          
        </div>
      </div>

      {/* Add Student Dialog */}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (e.target.value) setShowAdditionalFields(true);
                    else setShowAdditionalFields(false);
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

      {/* Delete Single Student Dialog */}
      <Dialog
        visible={deleteStudentDialog}
        style={{ width: '32rem' }}
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

export default SuccessRatePage;
