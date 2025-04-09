import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from 'primereact/button';
import { Button as ShadcnButton} from "@/components/ui/button";
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
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface societyTable {
  societyName: string;
  logo: string;
  eventName: string;
  Date: string;
  reportPDF: string;
}

const SocietiesPage = () => {
  const navigate = useNavigate();
  const [showSocietyForm, setShowSocietyForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState<Date>();

  const [table, settable] = useState([
    {societyName:'IEEE',logo:'',eventName:'abcdefg',Date:'12/3/46',reportPDF:''},
    {societyName:'CCDC',logo:'',eventName:'mnbvcxz',Date:'15/3/24',reportPDF:''},
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
                4.5.1 - Professional Societies/Chapters and Organizing Engineering Events
              </h1>
            </div>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Society Details</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#2F4883] hoverbg-slate-900 hover:text-white">
                    + Add Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Society Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="societyName">Society Name</Label>
                      <Input
                        id="societyName"
                        placeholder="Enter society name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input
                        id="eventName"
                        placeholder="Enter event name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Event Date</Label>
                      <Input
                        id="eventDate"
                        placeholder="DD/MM/YYYY"
                        value={date ? format(date, 'dd/MM/yyyy') : ''}
                        onChange={(e) => {
                          const dateValue = e.target.value;
                          if (dateValue) {
                            const [day, month, year] = dateValue.split('/');
                            const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
                            if (!isNaN(parsedDate.getTime())) {
                              setDate(parsedDate);
                            }
                          } else {
                            setDate(undefined);
                          }
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="logo">Society Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="report">Event Report (PDF)</Label>
                      <Input
                        id="report"
                        type="file"
                        accept=".pdf"
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

  <DataTable value={table} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
 <Column field="societyName" header="societyName" sortable style={{ width: '25%' }}></Column>
 <Column field="logo" header="logo" sortable style={{ width: '25%' }}></Column>
 <Column field="eventName" header="eventName" sortable style={{ width: '25%' }}></Column>    
 <Column field="Date" header="Date" sortable style={{ width: '25%' }}></Column>
 <Column field="reportPDF" header="reportPDF" body={(rowData) => (
  <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
  )} style={{ minWidth: '10rem' }}></Column>
                                
  <Column body={(rowData) => (
  <div className="flex gap-2 justify-center">
 <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
 <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => (rowData)} />
 </div>
 )} exportable={false} style={{ minWidth: '8rem' }}></Column>
</DataTable>

<div className="overflow-x-auto">
            
 </div>
  </Card>
  </div>
  </div>
  </MainLayout>
  );
};

export default SocietiesPage;