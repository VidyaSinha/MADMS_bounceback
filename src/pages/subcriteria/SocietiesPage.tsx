import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from 'primereact/button';
import { Button as ShadcnButton } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { useApi } from '@/contexts/ApiContext';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const { apiBaseUrl } = useApi();

  const [table, settable] = useState<societyTable[]>([
    {
      societyName: 'IEEE',
      logo: '',
      eventName: 'abcdefg',
      Date: '12/03/2046',
      reportPDF: '',
    },
    {
      societyName: 'CCDC',
      logo: '',
      eventName: 'mnbvcxz',
      Date: '15/03/2024',
      reportPDF: '',
    },
  ]);

  const [societyName, setSocietyName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState<string>('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<societyTable | null>(null);

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!societyName || !eventName || !eventDate || !logoFile || !reportFile) {
      alert('Please fill all fields');
      return;
    }

    try {
      const logoBase64 = await fileToBase64(logoFile);
      const reportBase64 = await fileToBase64(reportFile);
      const formattedDate = format(new Date(eventDate), 'dd/MM/yyyy');

      const payload = {
        societyName,
        eventName,
        date: formattedDate,
        logo: logoBase64,
        reportPDF: reportBase64,
      };

      const response = await fetch(`${apiBaseUrl}/api/societies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add society: ${errorText}`);
      }

      const createdSociety = await response.json();

      settable((prev) => [...prev, {
        societyName: createdSociety.societyName,
        eventName: createdSociety.eventName,
        Date: createdSociety.date,
        logo: createdSociety.logo,
        reportPDF: createdSociety.reportPDF,
      }]);

      setSocietyName('');
      setEventName('');
      setEventDate('');
      setLogoFile(null);
      setReportFile(null);

      alert('Society added successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
     console.error(error.message); // ✅ safe
     } else {
     console.error("An unexpected error occurred");
     }
  }
  };

  const logoBodyTemplate = (rowData: societyTable) => {
    if (rowData.logo) {
      return (
        <img
          src={rowData.logo}
          alt={`${rowData.societyName} Logo`}
          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
        />
      );
    }
    return <span>No Logo</span>;
  };

  const reportBodyTemplate = (rowData: societyTable) => {
    if (rowData.reportPDF) {
      return (
        <Button
          icon="pi pi-file-pdf"
          className="p-button-rounded p-button-text"
          onClick={() => {
            const newWindow = window.open();
            if (newWindow) {
              newWindow.document.write(
                `<iframe width='100%' height='100%' src='${rowData.reportPDF}'></iframe>`
              );
              newWindow.document.title = `${rowData.societyName} Report`;
            }
          }}
          tooltip="View Report"
        />
      );
    }
    return <span>No Report</span>;
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

          <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Society Details</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Details
          </button>
          </div>

              <Dialog>
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
                        value={societyName}
                        onChange={(e) => setSocietyName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input
                        id="eventName"
                        placeholder="Enter event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        placeholder="Select event date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="logo">Society Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="report">Event Report (PDF)</Label>
                      <Input
                        id="report"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="bg-[#2F4883] hover:bg-slate-900"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[400px] text-center space-y-4">
                  <DialogTitle>Are you sure you want to delete?</DialogTitle>
                  <div className="flex justify-center space-x-4 pt-4">
                    <button
                      onClick={() => {
                        if (studentToDelete) {
                          settable((prev) =>
                            prev.filter((p) => p.societyName !== studentToDelete.societyName)
                          );
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
            </div>

            <DataTable value={table} tableStyle={{ minWidth: '50rem' }} responsiveLayout="scroll">
              <Column field="societyName" header="Society Name" sortable></Column>
              <Column
                field="logo"
                header="Logo"
                body={logoBodyTemplate}
                style={{ width: '80px' }}
              ></Column>
              <Column field="eventName" header="Event Name" sortable></Column>
              <Column field="Date" header="Date" sortable></Column>
              <Column
                field="reportPDF"
                header="Report"
                body={reportBodyTemplate}
                style={{ width: '80px' }}
              ></Column>
              <Column
                header="Actions"
                body={(rowData: societyTable) => (
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-text"
                    onClick={() => {
                      setStudentToDelete(rowData);
                      setShowDeleteDialog(true);
                    }}
                    tooltip="Delete"
                  />
                )}
                style={{ width: '80px' }}
              ></Column>
            </DataTable>
          
        </div>
    </MainLayout>
  );
};

export default SocietiesPage;
