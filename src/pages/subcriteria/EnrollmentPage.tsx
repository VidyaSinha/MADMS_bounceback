import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Student {
  name: string;
  enrollment_number: string;
  tenth_marksheet: string | null;
  twelfth_marksheet: string | null;
  registration_form: string | null;
  gujcet_marksheet: string | null;
}

function EnrollmentPage(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showDocumentFields, setShowDocumentFields] = useState(false);
  const [formData, setFormData] = useState<Record<string, File | null>>({
    registration_form: null,
    tenth_marksheet: null,
    twelfth_marksheet: null,
    gujcet_marksheet: null
  });

  const [suggestions, setSuggestions] = useState<{ name: string; enrollment_number: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setStudentName('');
    setShowDocumentFields(false);
    setFormData({
      registration_form: null,
      tenth_marksheet: null,
      twelfth_marksheet: null,
      gujcet_marksheet: null
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData((prev) => ({ ...prev, [field]: file }));
    } else {
      alert('Please upload PDF files only');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!studentName || Object.values(formData).some((file) => file === null)) {
      console.log('Student name:', studentName);
console.log('Form data:', formData);

      alert('Please fill in all fields.');
      return;
    }
  
    try {
      setLoading(true);
  
      // ✨ Extract name and enrollment from the string
      const nameMatch = studentName.match(/^(.+)\s+\((\d+)\)$/);
      if (!nameMatch) {
        alert('Please select a student from the suggestions.');
        return;
      }
  
      const nameOnly = nameMatch[1]; // "Dhruvi Patel"
      const enrollmentNumber = nameMatch[2]; // "92200133029"
  
      const data = new FormData();
      data.append('name', nameOnly); // updated
      data.append('enrollment_number', enrollmentNumber); // NEW field
  
      Object.entries(formData).forEach(([key, file]) => {
        if (file) data.append(key, file);
      });
  
      const response = await fetch('https://madms-bounceback-backend.onrender.com/upload-documents', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Documents uploaded successfully!');
        setIsDialogOpen(false);
        resetForm();
      } else {
        alert(`Upload failed: ${result.message || 'Server error'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading documents.');
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = studentName.trim();
      if (!trimmed) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://madms-bounceback-backend.onrender.com/student/search?q=${encodeURIComponent(trimmed)}`,
          { credentials: 'include' }
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setSuggestions(data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error('Suggestion fetch error:', err);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [studentName]);

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-[#2f4883]">Enrollment Ratio Details </h2>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
      >
        Add Details
      </button>
    </div>
    
  
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
     <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      
    {/* <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Ratio Details</h2> */}
      <div className="flex justify-between items-center mb-4">
       
        
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4 font-semibold">Academic Year</th>
              <th className="py-3 px-4 font-semibold">N</th>
              <th className="py-3 px-4 font-semibold">N1</th>
              <th className="py-3 px-4 font-semibold">Enrollment Ratio</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4">2024-25 (CAY)</td>
              <td className="py-3 px-4">60</td>
              <td className="py-3 px-4">60</td>
              <td className="py-3 px-4">100%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4">2023-24 (CAYm1)</td>
              <td className="py-3 px-4">60</td>
              <td className="py-3 px-4">60</td>
              <td className="py-3 px-4">100%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4">2022-23 (CAYm2)</td>
              <td className="py-3 px-4">60</td>
              <td className="py-3 px-4">42</td>
              <td className="py-3 px-4">70%</td>
            </tr>
          </tbody>
        </table>
    </div>
    </div>
    </div>
  



      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Student Details</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2 relative">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (e.target.value) setShowDocumentFields(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => studentName && setShowSuggestions(true)}
                placeholder="Enter student name"
                required
              />
              {showSuggestions && (
                <ul className="absolute z-50 w-full border bg-white mt-1 max-h-40 overflow-y-auto rounded-md shadow">
                  {suggestions.length > 0 ? (
                    suggestions.map((s, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setStudentName(`${s.name} (${s.enrollment_number})`);
                          setShowSuggestions(false);
                          setShowDocumentFields(true);
                        }}
                      >
                        <div className="font-medium">{s.name}</div>
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
              <>
                  {['registration_form', 'tenth_marksheet', 'twelfth_marksheet', 'gujcet_marksheet'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}{' '}
                      (PDF)
                    </Label>
                    <Input
                      id={field}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, field)}
                      required
                    />
                    {formData[field] && (
                      <p className="text-xs text-gray-600">{formData[field]?.name}</p>
                    )}
                  </div>
                ))}
              </>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#2f4883] text-white rounded-md hover:bg-[#1a2a4f] disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EnrollmentPage;

