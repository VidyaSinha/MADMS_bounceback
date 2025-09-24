import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";

// ShadCN Toast
import { useToast } from "@/components/ui/use-toast";

// PrimeReact styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Project {
  id: string;
  projectTitle: string;
  academicYear: string;
  duration: string;
  fundingAgency: string;
  amount: string;
}

const dummyProjects: Project[] = [
  {
    id: "1",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },
  {
    id: "2",
    projectTitle: "Blockchain for Education",
    academicYear: "2022-23",
    duration: "1 Year",
    fundingAgency: "UGC",
    amount: "350000",
  },
    {
    id: "3",
    projectTitle: "AI in Farming",
    academicYear: "2024-25",
    duration: "3 Years",
    fundingAgency: "YRUYT",
    amount: "100000",
  },
  {
    id: "4",
    projectTitle: "AI in wATER bottle",
    academicYear: "2021-22",
    duration: "2 Years",
    fundingAgency: "ASRYH",
    amount: "1000000",
  },
  {
    id: "5",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },
  {
    id: "1",
    projectTitle: "AI in Health centre",
    academicYear: "2019-20",
    duration: "3 Years",
    fundingAgency: "ICMR",
    amount: "700000",
  },
  {
    id: "1",
    projectTitle: "AI in Education",
    academicYear: "2023-24",
    duration: "3 Years",
    fundingAgency: "DERTF",
    amount: "9x00000",
  },
  {
    id: "1",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },
  {
    id: "1",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },
  {
    id: "1",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },
  {
    id: "1",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },
  {
    id: "1",
    projectTitle: "AI in Agriculture",
    academicYear: "2023-24",
    duration: "2 Years",
    fundingAgency: "ICMR",
    amount: "500000",
  },

];

const Consultancy: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [duration, setDuration] = useState("");
  const [fundingAgency, setFundingAgency] = useState("");
  const [amount, setAmount] = useState("");
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [globalFilter, setGlobalFilter] = useState("");

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      projectTitle: projectTitle || "Untitled Project",
      academicYear: academicYear || "2025-26",
      duration: duration || "1 Year",
      fundingAgency: fundingAgency || "Unknown",
      amount: amount || "0",
    };

    setProjects((prev) => [...prev, newProject]);

    toast({
      title: "Submitted",
      description: "Project record submitted successfully!",
    });

    setIsDialogOpen(false);

    // Reset form
    setProjectTitle("");
    setAcademicYear("");
    setDuration("");
    setFundingAgency("");
    setAmount("");
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">
            Sponsored Consultancy Projects
          </h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Record
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
                  onInput={(e) =>
                    setGlobalFilter((e.target as HTMLInputElement).value)
                  }
                  placeholder="Search..."
                />
              </span>
            }
          />

          <DataTable
            value={projects}
            dataKey="id"
            paginator
            rows={10}
            globalFilter={globalFilter}
            header={
              <h3 className="text-xl font-semibold text-[#2f4883]">
                Project Records
              </h3>
            }
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column
              field="projectTitle"
              header="Project Title"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              field="academicYear"
              header="Academic Year"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="duration"
              header="Duration"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="fundingAgency"
              header="Funding Agency"
              sortable
              style={{ minWidth: "14rem" }}
            ></Column>
            <Column
              field="amount"
              header="Amount (₹)"
              sortable
              style={{ minWidth: "10rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* Add Record Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">
                Add Project Record
              </h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Academic Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="e.g., 2024-25"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 2 Years"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Funding Agency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding Agency
                </label>
                <input
                  type="text"
                  value={fundingAgency}
                  onChange={(e) => setFundingAgency(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (in Rupees)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 500000"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
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

export default Consultancy;
