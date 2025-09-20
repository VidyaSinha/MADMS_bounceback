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
  projectId: string;
  year: string;
  title: string;
  mentor: string;
  approvalDate: string;
  grantSanctioned: string;
}

const dummyProjects: Project[] = [
  {
    id: "1",
    projectId: "P101",
    year: "2023",
    title: "AI for Healthcare",
    mentor: "Dr. Mehta",
    approvalDate: "2023-03-15",
    grantSanctioned: "₹5,00,000",
  },
  {
    id: "2",
    projectId: "P102",
    year: "2022",
    title: "Blockchain in Education",
    mentor: "Prof. Sharma",
    approvalDate: "2022-07-10",
    grantSanctioned: "₹3,50,000",
  },
];

const SponsoredResearch: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [mentor, setMentor] = useState("");
  const [approvalDate, setApprovalDate] = useState("");
  const [grantSanctioned, setGrantSanctioned] = useState("");
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [globalFilter, setGlobalFilter] = useState("");

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      projectId: projectId || "PX00",
      year: year || "2025",
      title: title || "Untitled Project",
      mentor: mentor || "Unknown",
      approvalDate: approvalDate || "2025-01-01",
      grantSanctioned: grantSanctioned || "₹0",
    };

    setProjects((prev) => [...prev, newProject]);

    toast({
      title: "Submitted",
      description: "Project record submitted successfully!",
    });

    setIsDialogOpen(false);

    // Reset form
    setProjectId("");
    setYear("");
    setTitle("");
    setMentor("");
    setApprovalDate("");
    setGrantSanctioned("");
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Sponsored Research Projects</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Project
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
            value={projects}
            dataKey="id"
            paginator
            rows={10}
            globalFilter={globalFilter}
            header={<h3 className="text-xl font-semibold text-[#2f4883]">Project Records</h3>}
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column field="projectId" header="Project ID" sortable style={{ minWidth: "10rem" }}></Column>
            <Column field="year" header="Year" sortable style={{ minWidth: "8rem" }}></Column>
            <Column field="title" header="Title" sortable style={{ minWidth: "16rem" }}></Column>
            <Column field="mentor" header="Mentor / Project Manager" sortable style={{ minWidth: "14rem" }}></Column>
            <Column field="approvalDate" header="Approval Date" sortable style={{ minWidth: "12rem" }}></Column>
            <Column field="grantSanctioned" header="Grant Sanctioned" sortable style={{ minWidth: "12rem" }}></Column>
          </DataTable>
        </div>
      </div>

      {/* Add Project Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">Add Project</h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Project ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Mentor / Project Manager */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mentor / Project Manager</label>
                <input
                  type="text"
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Approval Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Date</label>
                <input
                  type="date"
                  value={approvalDate}
                  onChange={(e) => setApprovalDate(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Grant Sanctioned */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grant Sanctioned</label>
                <input
                  type="text"
                  value={grantSanctioned}
                  onChange={(e) => setGrantSanctioned(e.target.value)}
                  placeholder="e.g., ₹5,00,000"
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

export default SponsoredResearch;
