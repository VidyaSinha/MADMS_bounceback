import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApi } from '@/contexts/ApiContext';

function FacultyQualification(): JSX.Element {
  const { apiBaseUrl } = useApi();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [meanCgpa, setMeanCgpa] = useState('');
  const [studentsAppeared, setStudentsAppeared] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<{ enrollment_number: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  interface AcademicPerformance {
  enrollment_number: string;
  academic_year: string;
  mean_cgpa: number;
  students_appeared: boolean;
}

  const [performanceData, setPerformanceData] = useState<AcademicPerformance[]>([]);

  // Fetch existing academic performance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/academic-performance`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setPerformanceData(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setPerformanceData([]);
      }
    };
    fetchData();
  }, [apiBaseUrl]);

  // Fetch enrollment number suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmed = enrollmentNumber.trim();
      if (!trimmed) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${apiBaseUrl}/student/search?q=${encodeURIComponent(trimmed)}`,
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
  }, [apiBaseUrl,enrollmentNumber]);


  // Reset form fields
  const resetForm = () => {
    setEnrollmentNumber('');
    setAcademicYear('');
    setMeanCgpa('');
    setStudentsAppeared(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enrollmentNumber || !academicYear || !meanCgpa || studentsAppeared === null) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const data = {
        enrollment_number: enrollmentNumber,
        academic_year: academicYear,
        mean_cgpa: parseFloat(meanCgpa),
        students_appeared: studentsAppeared,
      };

      const response = await fetch(`${apiBaseUrl}/academic-performance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();
      if (result.message) {
        alert('Academic performance data added successfully!');
        setIsDialogOpen(false);
        resetForm();
        // Refresh data
        const res = await fetch(`${apiBaseUrl}/academic-performance`, {
          credentials: 'include',
        });
        const newData = await res.json();
        setPerformanceData(newData);
      } else {
        alert(`Failed to add data: ${result.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error adding academic performance:', error);
      alert('Error adding academic performance: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2f4883]">Academic Performance Details</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
        >
          Add Details
        </button>
      </div>

      {/* Table to display existing data */}
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3 px-4 font-semibold">Faculty Name</th>
            <th className="py-3 px-4 font-semibold">Qualification</th>
            <th className="py-3 px-4 font-semibold">Designation</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-200">
          {performanceData.map((data, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4">{data.enrollment_number}</td>
              <td className="py-3 px-4">{data.academic_year}</td>
              <td className="py-3 px-4">{data.mean_cgpa}</td>
              <td className="py-3 px-4">{data.students_appeared ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Academic Performance</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2 relative">
              <Label htmlFor="enrollment">Faculty Name</Label>
              <Input
                id="enrollment"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => enrollmentNumber && setShowSuggestions(true)}
                placeholder="Enter enrollment number"
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
                          setEnrollmentNumber(s.enrollment_number);
                          setShowSuggestions(false);
                        }}
                      >
                        {s.enrollment_number}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-500">No matching records</li>
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear">Qualification</Label>
              <Input
                id="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="e.g., 2023-2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meanCgpa">Designation</Label>
              <Input
                id="meanCgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={meanCgpa}
                onChange={(e) => setMeanCgpa(e.target.value)}
                placeholder="Enter mean CGPA"
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label>Students Appeared</Label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="studentsAppeared"
                    checked={studentsAppeared === true}
                    onChange={() => setStudentsAppeared(true)}
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="studentsAppeared"
                    checked={studentsAppeared === false}
                    onChange={() => setStudentsAppeared(false)}
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div> */}

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

export default FacultyQualification;