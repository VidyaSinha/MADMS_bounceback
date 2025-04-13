import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Student {
  name: string;
  enrollmentNo: string;
  CGPA: string;
  academicyear: string;
  appeared: string;
}

const Academic2ndyearPage: React.FC = () => {
  const [info, setInfo] = useState<Student[]>([
    { name: 'Rajvi', enrollmentNo: '1321', CGPA: '9', academicyear: '2021', appeared: 'Yes' },
  ]);
  const [studentName, setStudentName] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [hasAppeared, setHasAppeared] = useState<boolean | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const resetForm = () => {
    setStudentName('');
    setCgpa('');
    setHasAppeared(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      name: studentName,
      enrollmentNo: `${Date.now()}`,
      CGPA: cgpa,
      academicyear: '2024',
      appeared: hasAppeared ? 'Yes' : 'No',
    };
    setInfo([...info, newStudent]);
    resetForm();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#2f4883]">Academic Performance Details</h2>
        <button onClick={() => setIsDialogOpen(true)} className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition">
          Add Details
        </button>
      </div>

      {/* Static Table */}
      <table className="w-full border-collapse text-sm text-gray-700">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-1 px-2">Academic Year</th>
            <th className="py-1 px-2">Mean CGPA (X)</th>
            <th className="py-1 px-2">Total Successful Students (Y)</th>
            <th className="py-1 px-2">Total Students Appeared (Z)</th>
            <th className="py-1 px-2">API = X*(Y/Z)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="px-2">CAYm1 (2023-2024)</td><td>6.95</td><td>58</td><td>58</td><td>6.95</td></tr>
          <tr><td className="px-2">CAYm2 (2022-2023)</td><td>7.57</td><td>66</td><td>66</td><td>7.57</td></tr>
          <tr><td className="px-2">CAYm3 (2021-2022)</td><td>7.37</td><td>49</td><td>49</td><td>7.37</td></tr>
          <tr className="font-medium"><td>Average API</td><td></td><td></td><td></td><td>7.29</td></tr>
        </tbody>
      </table>

      {/* Data Table */}
      <DataTable value={info} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
        <Column field="name" header="Name" sortable style={{ width: '20%' }} />
        <Column field="enrollmentNo" header="Enrollment No" sortable style={{ width: '20%' }} />
        <Column field="CGPA" header="CGPA" sortable style={{ width: '15%' }} />
        <Column field="academicyear" header="Year" sortable style={{ width: '15%' }} />
        <Column field="appeared" header="Appeared" sortable style={{ width: '15%' }} />
        <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2 justify-center">
              <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
              <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {
                setStudentToDelete(rowData);
                setShowDeleteDialog(true);
              }} />
            </div>
          )}
          style={{ minWidth: '8rem' }}
        />
      </DataTable>

      {/* Add Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">Add Student Details</h3>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Student Name" required value={studentName}
                onChange={(e) => setStudentName(e.target.value)} className="w-full p-2 border rounded" />
              {studentName && (
                <>
                  <input type="number" step="0.01" min="0" max="10" placeholder="CGPA" required value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)} className="w-full p-2 border rounded" />
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="appeared" checked={hasAppeared === true} onChange={() => setHasAppeared(true)} required />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="appeared" checked={hasAppeared === false} onChange={() => setHasAppeared(false)} />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <div className="text-right">
                    <button type="submit" className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a]">Submit</button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px] text-center space-y-4">
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <div className="flex justify-center space-x-4 pt-4">
            <button onClick={() => {
              if (studentToDelete) {
                setInfo(prev => prev.filter(p => p.enrollmentNo !== studentToDelete.enrollmentNo));
              }
              setShowDeleteDialog(false);
              setStudentToDelete(null);
            }} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Yes</button>
            <button onClick={() => setShowDeleteDialog(false)} className="px-4 py-2 border rounded-md hover:bg-gray-100">No</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Academic2ndyearPage;
