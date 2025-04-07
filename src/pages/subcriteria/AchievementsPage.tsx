import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 4
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-teal-700">
                4.5.3 - Participation at Inter-Institution Events
              </h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2F4883] hover:bg-slate-900">
                    + Add Details
                  </Button>
                </DialogTrigger>
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

            <div className="overflow-x-auto">
            
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AchievementsPage;