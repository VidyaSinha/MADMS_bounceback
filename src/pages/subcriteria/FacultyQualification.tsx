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

interface Faculty {
  faculty_name: string;
  qualification: string;
  designation: string;
  year: string;
  documents?: { name: string; url: string }[];
}

function FacultyQualification(): JSX.Element {
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [facultyName, setFacultyName] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [year, setYear] = useState("");
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQualification, setFilterQualification] = useState("");

  // Dummy data with years
  const [facultyData, setFacultyData] = useState<Faculty[]>([
    {
      faculty_name: "Dr. A. Sharma",
      qualification: "PhD",
      designation: "Professor",
      year: "2024-25",
      documents: [
        { name: "PhD.pdf", url: "https://example.com/phd.pdf" },
        { name: "M.Tech.pdf", url: "https://example.com/mtech.pdf" },
        { name: "B.Tech.pdf", url: "https://example.com/btech.pdf" },
      ],
    },
    {
      faculty_name: "Ms. B. Patel",
      qualification: "M.Tech",
      designation: "Assistant Professor",
      year: "2023-24",
      documents: [
        { name: "M.Tech.pdf", url: "https://example.com/mtech.pdf" },
        { name: "B.Tech.pdf", url: "https://example.com/btech.pdf" },
      ],
    },
    {
      faculty_name: "Dr. C. Patel",
      qualification: "M.Tech",
      designation: "Professor",
      year: "2022-23",
      documents: [
        { name: "M.Tech.pdf", url: "https://example.com/mtech.pdf" },
        { name: "B.Tech.pdf", url: "https://example.com/btech.pdf" },
      ],
    },
    {
      faculty_name: "Dr. K. Mehta",
      qualification: "PhD",
      designation: "Associate Professor",
      year: "2024-25",
      documents: [
        { name: "PhD.pdf", url: "https://example.com/phd2.pdf" },
        { name: "M.Tech.pdf", url: "https://example.com/mtech2.pdf" },
      ],
    },
    {
      faculty_name: "Mr. R. Singh",
      qualification: "B.Tech",
      designation: "Lecturer",
      year: "2023-24",
      documents: [{ name: "B.Tech.pdf", url: "https://example.com/btech2.pdf" }],
    },
    {
      faculty_name: "Dr. P. Iyer",
      qualification: "PhD",
      designation: "Professor",
      year: "2022-23",
      documents: [
        { name: "PhD.pdf", url: "https://example.com/phd3.pdf" },
        { name: "M.Tech.pdf", url: "https://example.com/mtech3.pdf" },
        { name: "B.Tech.pdf", url: "https://example.com/btech3.pdf" },
      ],
    },
    {
      faculty_name: "Ms. N. Desai",
      qualification: "M.Tech",
      designation: "Assistant Professor",
      year: "2024-25",
      documents: [
        { name: "M.Tech.pdf", url: "https://example.com/mtech4.pdf" },
        { name: "B.Tech.pdf", url: "https://example.com/btech4.pdf" },
      ],
    },
    {
      faculty_name: "Mr. V. Joshi",
      qualification: "B.Tech",
      designation: "Lecturer",
      year: "2022-23",
      documents: [{ name: "B.Tech.pdf", url: "https://example.com/btech5.pdf" }],
    },
    {
      faculty_name: "Dr. S. Gupta",
      qualification: "PhD",
      designation: "Professor",
      year: "2023-24",
      documents: [
        { name: "PhD.pdf", url: "https://example.com/phd4.pdf" },
        { name: "M.Tech.pdf", url: "https://example.com/mtech5.pdf" },
      ],
    },
    {
      faculty_name: "Ms. T. Kapoor",
      qualification: "M.Tech",
      designation: "Assistant Professor",
      year: "2022-23",
      documents: [
        { name: "M.Tech.pdf", url: "https://example.com/mtech6.pdf" },
        { name: "B.Tech.pdf", url: "https://example.com/btech6.pdf" },
      ],
    },
  ]);

  const resetForm = () => {
    setFacultyName("");
    setQualification("");
    setDesignation("");
    setYear("");
    setDocuments([]);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDocuments((prev) => {
      const newDocs = [...prev];
      newDocs[index] = { name: file.name, url };
      return newDocs;
    });
  };

  // Group by year (for initial table)
  const groupedByYear = facultyData.reduce((acc, f) => {
    if (!acc[f.year]) acc[f.year] = [];
    acc[f.year].push(f);
    return acc;
  }, {} as Record<string, Faculty[]>);

  // Faculty Qualification Calculation (Frontend)
  const calculateFQ = (X: number, Y: number, F: number) => {
    if (F === 0) return 0;
    return 2.0 * ((10 * X + 4 * Y) / F);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!facultyName || !qualification || !designation || !year) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    // Add new faculty
    const newFaculty: Faculty = { faculty_name: facultyName, qualification, designation, year, documents };
    setFacultyData((prev) => [...prev, newFaculty]);

    toast({
      title: "Success",
      description: "Faculty added successfully!",
    });

    setIsDialogOpen(false);
    resetForm();
  };

  // Filter + Search
  const filteredData = facultyData.filter(
    (f) =>
      f.faculty_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterQualification ? f.qualification === filterQualification : true)
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
      {/* ---------- Faculty Section ---------- */}
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
                <select
                  id="qualification"
                  value={qualification}
                  onChange={(e) => {
                    setQualification(e.target.value);
                    setDocuments([]);
                  }}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Qualification</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="PhD">PhD</option>
                </select>
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

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g., 2024-25"
                />
              </div>

              {/* Dynamic Document Upload */}
              {qualification === "B.Tech" && (
                <div className="space-y-2">
                  <Label>B.Tech Document</Label>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(0, e.target.files?.[0] || null)}
                  />
                </div>
              )}

              {qualification === "M.Tech" && (
                <>
                  <div className="space-y-2">
                    <Label>B.Tech Document</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(0, e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>M.Tech Document</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(1, e.target.files?.[0] || null)}
                    />
                  </div>
                </>
              )}

              {qualification === "PhD" && (
                <>
                  <div className="space-y-2">
                    <Label>B.Tech Document</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(0, e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>M.Tech Document</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(1, e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PhD Document</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(2, e.target.files?.[0] || null)}
                    />
                  </div>
                </>
              )}

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
                  className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f]"
                >
                  Submit
                </ShadcnButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Faculty Data Table */}
      <div className="p-4 border rounded-lg shadow-sm bg-gray-50 mb-6">
        <h3 className="text-lg font-semibold mb-3">Faculty List</h3>
        <table className="min-w-full text-sm text-left bg-white border border-gray-300">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4 font-semibold">Faculty Name</th>
              <th className="py-3 px-4 font-semibold">Qualification</th>
              <th className="py-3 px-4 font-semibold">Designation</th>
              <th className="py-3 px-4 font-semibold">Year</th>
              <th className="py-3 px-4 font-semibold">Documents</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {filteredData.map((data, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4">{data.faculty_name}</td>
                <td className="py-3 px-4">{data.qualification}</td>
                <td className="py-3 px-4">{data.designation}</td>
                <td className="py-3 px-4">{data.year}</td>
                <td className="py-3 px-4">
                  {data.documents?.map((doc, i) => (
                    <a
                      key={i}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded mr-2 hover:underline"
                    >
                      {doc.name}
                    </a>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Faculty Qualification Calculation Table */}
<div className="p-4 border rounded-lg shadow-sm bg-gray-50">
  <h3 className="text-lg font-semibold mb-3">Faculty Qualification Calculation</h3>
  <table className="min-w-full text-sm text-left bg-white border border-gray-300">
    <thead className="text-gray-500 border-b">
      <tr>
        <th className="py-3 px-4 font-semibold">Year</th>
        <th className="py-3 px-4 font-semibold">X (PhD)</th>
        <th className="py-3 px-4 font-semibold">Y (M.Tech)</th>
        <th className="py-3 px-4 font-semibold">F</th>
        <th className="py-3 px-4 font-semibold">FQ = 2.0 × ((10X + 4Y) / F)</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 divide-y divide-gray-200">
      {Object.keys(groupedByYear).map((yearKey) => {
        const records = groupedByYear[yearKey];
        const X = records.filter((f) => f.qualification === "PhD").length;
        const Y = records.filter((f) => f.qualification === "M.Tech").length;
        const F = records.length;
        const fqValue = calculateFQ(X, Y, F);
        return (
          <tr key={yearKey}>
            <td className="py-3 px-4">{yearKey}</td>
            <td className="py-3 px-4">{X}</td>
            <td className="py-3 px-4">{Y}</td>
            <td className="py-3 px-4">{F}</td>
            <td className="py-3 px-4">{fqValue.toFixed(2)}</td>
          </tr>
        );
      })}

      {/* Average Assessment Row */}
      <tr className="font-semibold bg-gray-100">
        <td className="py-3 px-4 text-right" colSpan={4}>
          Average Assessment
        </td>
        <td className="py-3 px-4">
          {(
            Object.keys(groupedByYear).reduce((acc, yearKey) => {
              const records = groupedByYear[yearKey];
              const X = records.filter((f) => f.qualification === "PhD").length;
              const Y = records.filter((f) => f.qualification === "M.Tech").length;
              const F = records.length;
              return acc + calculateFQ(X, Y, F);
            }, 0) / Object.keys(groupedByYear).length
          ).toFixed(2)}
        </td>
      </tr>
    </tbody>
  </table>
  <p className="text-xs text-gray-500 mt-2">
    X = no. of regular faculty with Ph.D. <br />
    Y = no. of regular faculty with M.Tech. <br />
    F = no. of regular faculty required to comply 1:20 Faculty Student ratio
  </p>
</div>
    </div>
  );
}

export default FacultyQualification;
