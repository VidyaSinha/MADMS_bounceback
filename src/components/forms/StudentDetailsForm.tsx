import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, { message: 'File is required' })
    .refine(
      (file) =>
        ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(file.type),
      { message: 'Only Excel or CSV files are allowed' }
    ),
});

type FormValues = z.infer<typeof formSchema>;

const StudentDetailsForm = () => {
  const [isHovered, setIsHovered] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file);

      const response = await axios.post('https://madms-bounceback-backend.onrender.com/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'File uploaded successfully!',
        });
        form.reset();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.response?.data?.message || 'An error occurred during file upload.',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto max-h-[90vh] p-12">
      <h2 className="text-xl font-semibold mb-6 text-[#2f4883]">Upload Excel/CSV File</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".csv, .xls, .xlsx"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-white px-4 py-2 rounded transition duration-300"
            style={{
              backgroundColor: isHovered ? '#263766' : '#2f4883',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentDetailsForm;
