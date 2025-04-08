import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


interface Student {
    name: string;
    enrollmentNumber: string;
    marksheet10: string | null;
    marksheet12: string | null;
    registrationForm: string | null;
}

function EnrollmentPage(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showDocumentFields, setShowDocumentFields] = useState(false);
  const [formData, setFormData] = useState({
    registrationForm: null,
    marksheet10th: null,
    marksheet12th: null,
    gujcetResult: null
  });

  const [suggestions, setSuggestions] = useState<{ name: string; enrollment_number: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, [field]: file }));
    } else {
      alert('Please upload PDF files only');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { studentName, ...formData });
    setIsDialogOpen(false);
    setShowDocumentFields(false);
    setStudentName('');
    setFormData({
      registrationForm: null,
      marksheet10th: null,
      marksheet12th: null,
      gujcetResult: null
    });
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = studentName.trim();
      if (trimmed === '') {
        setSuggestions([]);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/student/search?q=${encodeURIComponent(trimmed)}`, {
          method: 'GET',
          credentials: 'include',
        });
  
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setSuggestions(data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };
  
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [studentName]);
  
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f] transition-colors"
        >
          Add Details
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Ratio Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4 font-semibold">Academic Year</th>
                <th className="py-3 px-4 font-semibold">N (From Table 4.1)</th>
                <th className="py-3 px-4 font-semibold">N1 (From Table 4.1)</th>
                <th className="py-3 px-4 font-semibold">Enrollment Ratio [(N1/N)*100]</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2024-25 (CAY)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2023-24 (CAYm1)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2022-23 (CAYm2)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">42</td>
                <td className="py-3 px-4">70%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Student Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2 relative">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                name="tudent_name_autofill_bypass"
                autoComplete="off"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (e.target.value) setShowDocumentFields(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => studentName && setShowSuggestions(true)}
                placeholder="Enter student name"
                required
              />
              {showSuggestions && (
                <ul className="absolute z-50 w-full border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto bg-white shadow">
  {suggestions.length > 0 ? (
    suggestions.map((s, index) => (
      <li
        key={index}
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onMouseDown={(e) => {
          e.preventDefault(); // prevent input blur
          setStudentName(`${s.name} (${s.enrollment_number})`);
          setShowSuggestions(false);
          setShowDocumentFields(true);
        }}
      >
        <div className="text-sm font-medium">{s.name}</div>
        <div className="text-xs text-gray-500">{s.enrollment_number}</div>
      </li>
    ))
  ) : (
    <li className="px-4 py-2 text-sm text-gray-500">No students found</li>
  )}
</ul>
              )}
            </div>

            {showDocumentFields && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationForm">Registration Form (PDF)</Label>
                  <Input
                    id="registrationForm"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'registrationForm')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marksheet10th">10th Marksheet (PDF)</Label>
                  <Input
                    id="marksheet10th"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'marksheet10th')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marksheet12th">12th Marksheet (PDF)</Label>
                  <Input
                    id="marksheet12th"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'marksheet12th')}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gujcetResult">GUJCET Result (PDF)</Label>
                  <Input
                    id="gujcetResult"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'gujcetResult')}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  setShowDocumentFields(false);
                  setStudentName('');
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2f4883] text-white rounded-md hover:bg-[#1a2a4f]"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EnrollmentPage;
