import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from "@/components/ui/use-toast"; // ✅ Optional toast import (if using shadcn)

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  grNumber: z.string().min(1, { message: "GR Number is required." }),
  enrollmentNumber: z.string().min(1, { message: "Enrollment Number is required." }),
  studentType: z.enum(["degree", "diplomaToDegree", "transfer"], {
    required_error: "Please select a student type",
  }),
  batchPeriod: z.string().refine((val) => /^\d{4}-\d{4}$/.test(val), {
    message: "Enter batch period in YYYY-YYYY format.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const StudentDetailsForm = () => {
  const [customBatchPeriod, setCustomBatchPeriod] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currentYear = new Date().getFullYear();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grNumber: "",
      enrollmentNumber: "",
      studentType: "degree",
      batchPeriod: "",
    },
  });

  const studentType = form.watch("studentType");

  useEffect(() => {
    form.setValue("batchPeriod", "");
    setCustomBatchPeriod(studentType === "transfer");
  }, [studentType, form]);

  const batchOptions = useMemo(() => {
    const years = studentType === "degree" ? 4 : studentType === "diplomaToDegree" ? 3 : 0;
    const options = [];

    if (years > 0) {
      for (let i = 0; i < 5; i++) {
        const startYear = currentYear - i;
        const endYear = startYear + years;
        options.push({
          value: `${startYear}-${endYear}`,
          label: `${startYear}-${endYear}`,
        });
      }
    }
    return options;
  }, [studentType, currentYear]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        name: data.name,
        enrollment_number: data.enrollmentNumber,
        student_type: data.studentType,
        batch_period: data.batchPeriod,
        gr_no: data.grNumber,
      };

      const session = JSON.parse(localStorage.getItem('session') || '{}');
      if (!session.token) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please login again to continue."
        });
        return;
      }

      const response = await axios.post("https://madms-bounceback-backend.onrender.com/submit-form", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.token}`
        },
      });
      
            
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Form submitted successfully!",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      const message = error?.response?.data?.message || 'An error occurred while submitting the form.';
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto max-h-[90vh] p-12">
      <h2 className="text-xl font-semibold mb-6 text-[#2f4883]">Basic Details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="grNumber">GR Number</FormLabel>
                <FormControl>
                  <Input id="grNumber" placeholder="Enter GR number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enrollmentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="enrollmentNumber">Enrollment Number</FormLabel>
                <FormControl>
                  <Input id="enrollmentNumber" placeholder="Enter enrollment number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="studentType">Student Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger id="studentType">
                      <SelectValue placeholder="Select student type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="degree">Degree</SelectItem>
                    <SelectItem value="diplomaToDegree">Diploma to Degree</SelectItem>
                    <SelectItem value="transfer">Transfer Student</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batchPeriod"
            render={({ field }) => (
              <FormItem key={studentType}> {/* Ensures re-render on type change */}
                <FormLabel htmlFor="batchPeriod">Batch Period</FormLabel>
                {customBatchPeriod ? (
                  <FormControl>
                    <Input
                      id="batchPeriod"
                      placeholder="Enter batch period (e.g., 2022-2025)"
                      {...field}
                    />
                  </FormControl>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="batchPeriod">
                        <SelectValue placeholder="Select batch period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {batchOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              className="flex-1 text-white px-4 py-2 rounded transition duration-300"
              style={{
                backgroundColor: isHovered ? '#263766' : '#2f4883',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Submit
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentDetailsForm;
