import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button as Shadcnbutton} from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface achievement {
  name: string;
  enroll: string;
  eventname: string;
  organisedBy: string;
  year: string;
  rank: string;
  proof: string;
}

interface AchievementFormData {
  studentName: string;
  eventName?: string;
  organizedBy?: string;
  date?: string;
  achievement?: string;
  documentProof?: string;
}

const AchievementsPage = () => {
  const navigate = useNavigate();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [studentToDelete, setStudentToDelete] = useState<achievement | null>(null);


  const form = useForm<AchievementFormData>({
    defaultValues: {
      studentName: '',
      eventName: '',
      organizedBy: '',
      date: '',
      achievement: '',
      documentProof: '',
    },
  });

  const [achieve, setachieve] = useState([
        {name:'rajvi',enroll:'78',eventname:'kkwnkw',organisedBy:'nwkvwk',year:'2025',rank:'1',proof:''},
        {name:'shyama',enroll:'54',eventname:'mkwn',organisedBy:'uggige',year:'2027',rank:'7',proof:''},
      ])

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  const onSubmit = (data: AchievementFormData) => {
    if (!showAdditionalFields && data.studentName) {
      setShowAdditionalFields(true);
      return;
    }
    console.log('Form submitted:', data);
    setIsDialogOpen(false);
    form.reset();
    setShowAdditionalFields(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <Shadcnbutton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 4
            </Shadcnbutton>
          </div>

              <div>
                <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
                  <h1 className="text-2xl font-bold text-center">
                    4.5.3 - Participation at Inter-Institution Events
                  </h1>
                </div>
              </div>

              <Card className="p-6">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Magazine Details</h2>
              
                            <Dialog>
                              <div className="flex justify-between items-center mb-4">
                              <h2 className="text-2xl font-semibold text-[#2f4883]">Society Details</h2>
                              <button
                                onClick={() => setIsDialogOpen(true)}
                                className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
                              >
                                Add Details
                              </button>
                              </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {showAdditionalFields
                        ? 'Enter Event Details'
                        : 'Enter Student Name'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {showAdditionalFields && (
                        <>
                          <FormField
                            control={form.control}
                            name="eventName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Event Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="organizedBy"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Organized By</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="achievement"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Achievement</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="documentProof"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Document Proof</FormLabel>
                                <FormControl>
                                  <Input type="file" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <Button type="submit" className="w-full">
                        {showAdditionalFields ? 'Submit' : 'Next'}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <DataTable value={achieve} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
                         <Column field="name" header="name" sortable style={{ width: '25%' }}></Column>
                          <Column field="enrollment" header="enrollment" sortable style={{ width: '25%' }}></Column>
                          <Column field="eventname" header="eventname" sortable style={{ width: '25%' }}></Column>    
                          <Column field="organisedBy" header="organisedBy" sortable style={{ width: '25%' }}></Column>
                          <Column field="date" header="date" sortable style={{ width: '25%' }}></Column>
                          <Column field="achievement" header="achievement" sortable style={{ width: '25%' }}></Column>
                          <Column field="documentProof" header="documentProof" body={(rowData) => (
                                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                                        )} style={{ minWidth: '10rem' }}></Column>
                                    
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
            setachieve(prev => prev.filter(p => p.enroll !== studentToDelete.enroll));
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
            
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AchievementsPage;