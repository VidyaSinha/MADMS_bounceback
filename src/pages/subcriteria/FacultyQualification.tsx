import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

function FacultyQualification(): JSX.Element {
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [facultyName, setFacultyName] = useState('');
  const [qualification, setQualification] = useState('');
  const [designation, setDesignation] = useState('');
  const [loading, setLoading] = useState(false);

  interface Faculty {
    faculty_name: string;
    qualification: string;
    designation: string;
  }

  // ✅ Start with some dummy data
  const [facultyData, setFacultyData] = useState<Faculty[]>([
    { faculty_name: 'Dr. A. Sharma', qualification: 'PhD', designation: 'Professor' },
    { faculty_name: 'Ms. B. Patel', qualification: 'M.Tech', designation: 'Assistant Professor' },
  ]);

  // reset form
  const resetForm = () => {
    setFacultyName('');
    setQualification('');
    setDesignation('');
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Always show positive toast
    toast({
      title: 'Submitted Successfully',
      description: 'Your faculty qualification has been submitted.',
    });

    setLoading(true);

    // just update dummy local state
    const newEntry: Faculty = {
      faculty_name: facultyName || 'Unnamed Faculty',
      qualification: qualification || 'Not Provided',
      designation: designation || 'Not Provided',
    };

    setFacultyData((prev) => [...prev, newEntry]);

    setTimeout(() => {
      setIsDialogOpen(false);
      resetForm();
      setLoading(false);
    }, 800); // fake delay for realism
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#2f4883]">Faculty Qualification Details</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
        >
          Add Details
        </button>
      </div>

      {/* Table with dummy + added data */}
      <table className="min-w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-3 px-4 font-semibold">Faculty Name</th>
            <th className="py-3 px-4 font-semibold">Qualification</th>
            <th className="py-3 px-4 font-semibold">Designation</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-200">
          {facultyData.map((data, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4">{data.faculty_name}</td>
              <td className="py-3 px-4">{data.qualification}</td>
              <td className="py-3 px-4">{data.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Faculty Qualification</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-2">
              <Label htmlFor="facultyName">Faculty Name</Label>
              <Input
                id="facultyName"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="Enter faculty name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g., PhD, M.Tech"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g., Professor"
              />
            </div>

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
