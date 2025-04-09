import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button as ShadcnButton} from '@/components/ui/button';
import { Button } from 'primereact/button';
import { Card } from '@/components/ui/card';
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

interface magazineTable {
  MagazineFront: string;
  yearPublished: string;
 
}

const MagazinePage = () => {
  const navigate = useNavigate();
  const [showMagazineForm, setShowMagazineForm] = useState(false);
  const [year, setYear] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [studentToDelete, setStudentToDelete] = useState<magazineTable | null>(null);


   const [magazine, setmagazine] = useState([
      {MagazineFront:'',yearPublished:'2021'},
      {MagazineFront:'',yearPublished:'2042'},
    ])

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <ShadcnButton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 4
            </ShadcnButton>
          </div>

          <div>
            <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
              <h1 className="text-2xl font-bold text-center">
                4.5.2 - Publication of Technical Magazines and Newsletter
              </h1>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Magazine Details</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#2F4883] hover:bg-slate-900">
                    + Add Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Magazine Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="year">Publication Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter publication year"
                        min="1900"
                        max="2099"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frontpage">Magazine Front Page</Label>
                      <Input
                        id="frontpage"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#2F4883] hover:bg-slate-900">
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <DataTable value={magazine} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
             <Column field="MagazineFront" header="MagazineFront" body={(rowData) => (
              <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
              )} style={{ minWidth: '10rem' }}></Column>
              <Column field="yearPublished" header="yearPublished" sortable style={{ width: '25%' }}></Column>
   
                                            
              <Column body={(rowData) => (
              <div className="flex gap-2 justify-center">
             <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
             <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {
    setStudentToDelete(rowData);
    setShowDeleteDialog(true);
  }} />
             </div>
             )} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
  <DialogContent className="sm:max-w-[400px] text-center space-y-4">
    <DialogTitle>Are you sure you want to delete?</DialogTitle>
    <div className="flex justify-center space-x-4 pt-4">
      <button
        onClick={() => {
          if (studentToDelete) {
            setmagazine(prev => prev.filter(p => p.MagazineFront !== studentToDelete.MagazineFront));
          }
          setShowDeleteDialog(false);
          setStudentToDelete(null);
        }}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Yes
      </button>
      <button
        onClick={() => setShowDeleteDialog(false)}
        className="px-4 py-2 border rounded-md hover:bg-gray-100"
      >
        No
      </button>
    </div>
  </DialogContent>
</Dialog>


            <div className="overflow-x-auto">
              {/* Table will be added here for displaying magazine entries */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MagazinePage;