import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApi } from '@/contexts/ApiContext';

interface Student {
  name: string;
  enrollment_number: string;
  tenth_marksheet: string | null;
  twelfth_marksheet: string | null;
  registration_form: string | null;
  gujcet_marksheet: string | null;
}

function EnrollmentPage(): JSX.Element {
  const { apiBaseUrl } = useApi();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [showDocumentFields, setShowDocumentFields] = useState(false);
  const [formData, setFormData] = useState<Record<string, File | null>>({
    registration_form: null,
    tenth_marksheet: null,
    twelfth_marksheet: null,
    gujcet_marksheet: null,
  });

  const [suggestions, setSuggestions] = useState<{ name: string; enrollment_number: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setStudentName('');
    setEnrollmentNumber('');
    setShowDocumentFields(false);
    setFormData({
      registration_form: null,
      tenth_marksheet: null,
      twelfth_marksheet: null,
      gujcet_marksheet: null,
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
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const nameMatch = studentName.match(/^(.+?)\s+\((\d+)\)$/);
      if (!nameMatch) {
        alert('Please select a student from suggestions or use the correct format (e.g., "Name (enrollment_number)").');
        return;
      }

      const [, name, rawEnrollment] = nameMatch;
      const cleanEnrollment = rawEnrollment.trim();

      const data = new FormData();
      data.append('name', name.trim());
      data.append('enrollment_number', cleanEnrollment);

      Object.entries(formData).forEach(([key, file]) => {
        if (file) data.append(key, file);
      });

      const response = await fetch(`${apiBaseUrl}/upload-documents`, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      const result = await response.json();
      if (response.ok) {
        alert('Upload successful!');
        setIsDialogOpen(false);
        resetForm();
      } else {
        alert(`Upload failed: ${result.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const query = studentName.replace(/\(\d+\)$/, '').trim();
      if (!query) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${apiBaseUrl}/student/search?q=${encodeURIComponent(query)}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch error:', err);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [studentName, apiBaseUrl]);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f]"
        >
          Add Details
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Ratio Details</h2>
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
            {/* Add more rows as needed */}
          </tbody>
        </table>
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
                  setShowDocumentFields(!!e.target.value);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter student name"
                required
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full border bg-white mt-1 max-h-40 overflow-y-auto rounded-md shadow">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setStudentName(`${s.name} (${s.enrollment_number})`);
                        setEnrollmentNumber(s.enrollment_number);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.enrollment_number}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {showDocumentFields && (
              <>
                {['registration_form', 'tenth_marksheet', 'twelfth_marksheet', 'gujcet_marksheet'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} (PDF)
                    </Label>
                    <Input
                      id={field}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, field)}
                      required
                    />
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