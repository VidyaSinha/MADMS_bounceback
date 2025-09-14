import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Button as ShadcnButton } from "@/components/ui/button";
import axios from "axios";

interface Faculty {
  faculty_name: string;
  qualification: string;
  designation: string;
}

function FacultyQualification(): JSX.Element {
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [facultyName, setFacultyName] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);

  const [facultyData, setFacultyData] = useState<Faculty[]>([
    { faculty_name: "Dr. A. Sharma", qualification: "PhD", designation: "Professor" },
    { faculty_name: "Ms. B. Patel", qualification: "M.Tech", designation: "Assistant Professor" },
    { faculty_name: "Dr. C. Patel", qualification: "M.Tech", designation: "Professor" },
    { faculty_name: "Ms. H. Sinha", qualification: "M.Tech", designation: "Assistant Professor" },
    { faculty_name: "Dr. Y. Ghosal", qualification: "PhD", designation: "Assistant Professor" },
    { faculty_name: "Ms. N. Nehal", qualification: "M.Tech", designation: "Assistant Professor" },
    { faculty_name: "Dr. A. Pariwal", qualification: "PhD", designation: "Professor" },
    { faculty_name: "Ms. D. Shreyal", qualification: "PhD", designation: "Assistant Professor" },
    { faculty_name: "Dr. B. Kapoor", qualification: "M.Tech", designation: "Assistant Professor" },
    { faculty_name: "Ms. A. Patel", qualification: "M.Tech", designation: "Assistant Professor" },
  ]);

  const resetForm = () => {
    setFacultyName("");
    setQualification("");
    setDesignation("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!facultyName || !qualification || !designation) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/faculty-qualification/",
        {
          faculty_name: facultyName,
          qualification,
          designation,
        },
        { withCredentials: true }
      );

      toast({
        title: "Success",
        description: response.data.message || "Faculty added successfully!",
      });

      setFacultyData((prev) => [
        ...prev,
        { faculty_name: facultyName, qualification, designation },
      ]);
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Server connection failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#2f4883]">
          Faculty Qualification Details
        </h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <ShadcnButton className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a]">
              Add Details
            </ShadcnButton>
          </DialogTrigger>

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
                <ShadcnButton
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  className="border px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </ShadcnButton>

                <ShadcnButton
                  type="submit"
                  disabled={loading}
                  className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f] disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit"}
                </ShadcnButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Faculty Data Table */}
      <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">Faculty List</h3>
        <table className="min-w-full text-sm text-left bg-white border border-gray-300">
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
      </div>
    </div>
  );
}

export default FacultyQualification;
