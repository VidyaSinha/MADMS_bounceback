
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  grNumber: z.string().min(1, { message: "GR Number is required." }),
  enrollmentNumber: z.string().min(1, { message: "Enrollment Number is required." }),
  studentType: z.enum(["degree", "diplomaToDegree", "transfer"], {
    required_error: "Please select a student type",
  }),
  batchPeriod: z.string().min(1, { message: "Batch period is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const StudentDetailsForm = () => {
  const [customBatchPeriod, setCustomBatchPeriod] = useState(false);
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
    // Reset batch period when student type changes
    form.setValue("batchPeriod", "");
    
    // Only transfer students can enter custom batch period
    setCustomBatchPeriod(studentType === "transfer");
  }, [studentType, form]);
  
  const generateBatchOptions = () => {
    const options = [];
    const years = studentType === "degree" ? 4 : studentType === "diplomaToDegree" ? 3 : 0;
    
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
  };
  
  const batchOptions = generateBatchOptions();
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };
  
  return (
    <div className="max-w-2xl mx-auto max-h-[90vh] p-12">
      <h2 className="text-xl font-semibold mb-6 text-teal-700">Basic Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
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
                <FormLabel>GR Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter GR number" {...field} />
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
                <FormLabel>Enrollment Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter enrollment number" {...field} />
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
                <FormLabel>Student Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
              <FormItem>
                <FormLabel>Batch Period</FormLabel>
                {customBatchPeriod ? (
                  <FormControl>
                    <Input placeholder="Enter batch period (e.g., 2022-2025)" {...field} />
                  </FormControl>
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
            <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
              Submit
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentDetailsForm;
