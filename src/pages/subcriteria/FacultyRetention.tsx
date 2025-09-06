import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

// ShadCN Toast
import { useToast } from "@/components/ui/use-toast";

// PrimeReact styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Faculty {
  id: string;
  faculty_name: string;
  joining_date: string;
  CAY: string;
  CAYm1: string;
  CAYm2: string;
}

const dummyFaculty: Faculty[] = [
  { id: "1", faculty_name: "Dr. Mehta", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "2", faculty_name: "Prof. Sharma", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "3", faculty_name: "prof. Neha", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "4", faculty_name: "Prof. Sharma", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "5", faculty_name: "Dr. Mohan", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "6", faculty_name: "Prof. Desai", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "7", faculty_name: "Dr. Rathod", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "8", faculty_name: "Prof. Patel", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "9", faculty_name: "Dr. Sinha", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "10", faculty_name: "Prof. Sharma", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "11", faculty_name: "Dr. Mehta", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "12", faculty_name: "Prof. Neha", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "13", faculty_name: "Dr. Kotak", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "14", faculty_name: "Prof. Parmar", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "15", faculty_name: "Dr. Sinha", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
  { id: "16", faculty_name: "Prof. Sharma", joining_date: "2019-01-20", CAY: "No", CAYm1: "Yes", CAYm2: "Yes" },
  { id: "17", faculty_name: "Dr. Mehta", joining_date: "2020-06-12", CAY: "Yes", CAYm1: "Yes", CAYm2: "No" },
];

const FacultyRetention: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [facultyName, setFacultyName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [CAY, setCAY] = useState("");
  const [CAYm1, setCAYm1] = useState("");
  const [CAYm2, setCAYm2] = useState("");
  const [faculty, setFaculty] = useState<Faculty[]>(dummyFaculty);
  const [globalFilter, setGlobalFilter] = useState("");

  const { toast } = useToast();

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFaculty: Faculty = {
      id: Math.random().toString(36).substr(2, 9),
      faculty_name: facultyName || "Dummy Faculty",
      joining_date: joiningDate || "2025-01-01",
      CAY: CAY || "Yes",
      CAYm1: CAYm1 || "No",
      CAYm2: CAYm2 || "No",
    };

    // Save locally (dummy backend)
    setFaculty((prev) => [...prev, newFaculty]);

    // ✅ Always show positive toast
    toast({
      title: "Submitted",
      description: "Faculty retention record submitted successfully!",
    });

    setIsDialogOpen(false);

    // Reset form
    setFacultyName("");
    setJoiningDate("");
    setCAY("");
    setCAYm1("");
    setCAYm2("");
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Faculty Retention</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Faculty
          </button>
        </div>

        <div className="card overflow-hidden">
          <Toolbar
            className="mb-4"
            left={<div></div>}
            right={
              <span className="p-input-icon-left">
                <InputText
                  type="search"
                  onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
                  placeholder="Search..."
                />
              </span>
            }
          />

          <DataTable
            value={faculty}
            dataKey="id"
            paginator
            rows={10}
            globalFilter={globalFilter}
            header={<h3 className="text-xl font-semibold text-[#2f4883]">Faculty Retention Records</h3>}
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column field="faculty_name" header="Faculty Name" sortable style={{ minWidth: "14rem" }}></Column>
            <Column field="joining_date" header="Joining Date" sortable style={{ minWidth: "12rem" }}></Column>
            <Column field="CAY" header="CAY" sortable style={{ minWidth: "8rem" }}></Column>
            <Column field="CAYm1" header="CAYm1" sortable style={{ minWidth: "8rem" }}></Column>
            <Column field="CAYm2" header="CAYm2" sortable style={{ minWidth: "8rem" }}></Column>
          </DataTable>
        </div>
      </div>

      {/* Add Faculty Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">Add Faculty Details</h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Faculty Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
                <input
                  type="text"
                  value={facultyName}
                  onChange={(e) => setFacultyName(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* CAY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CAY</label>
                <Dropdown
                  value={CAY}
                  options={yesNoOptions}
                  onChange={(e) => setCAY(e.value)}
                  placeholder="Select"
                  className="w-full"
                />
              </div>

              {/* CAYm1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CAYm1</label>
                <Dropdown
                  value={CAYm1}
                  options={yesNoOptions}
                  onChange={(e) => setCAYm1(e.value)}
                  placeholder="Select"
                  className="w-full"
                />
              </div>

              {/* CAYm2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CAYm2</label>
                <Dropdown
                  value={CAYm2}
                  options={yesNoOptions}
                  onChange={(e) => setCAYm2(e.value)}
                  placeholder="Select"
                  className="w-full"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyRetention;
