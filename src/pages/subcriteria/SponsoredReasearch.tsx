import React, { useState, useEffect } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useToast } from "@/components/ui/use-toast";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Project {
  Proj_id: string;
  year: number | string;
  title: string;
  mentor: string;
  approval_date: string;
  grant_sanctioned: number | string;
}

const BACKEND_URL = "http://localhost:5000"; // your backend URL

const SponsoredResearch: React.FC = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [formData, setFormData] = useState<Project>({
    Proj_id: "",
    year: "",
    title: "",
    mentor: "",
    approval_date: "",
    grant_sanctioned: "",
  });

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/sponsored-research/`, { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          setProjects(data);
        } else {
          toast({ title: "Error", description: data.error || "Failed to fetch projects", variant: "destructive" });
        }
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Server error while fetching projects", variant: "destructive" });
      }
    };
    fetchProjects();
  }, []);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({ ...filters, global: { value, matchMode: FilterMatchMode.CONTAINS } });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    for (let key of Object.keys(formData)) {
      if (!formData[key as keyof Project]) {
        toast({ title: "Error", description: "All fields are required", variant: "destructive" });
        return;
      }
    }

    const yearNumber = Number(formData.year);
    const grantNumber = Number(formData.grant_sanctioned);
    const approvalDate = formData.approval_date; // YYYY-MM-DD

    if (isNaN(yearNumber) || yearNumber <= 1900 || yearNumber > new Date().getFullYear()) {
      toast({ title: "Error", description: "Enter a valid year", variant: "destructive" });
      return;
    }

    if (isNaN(grantNumber) || grantNumber < 0) {
      toast({ title: "Error", description: "Enter a valid grant amount", variant: "destructive" });
      return;
    }

    const payload = {
      ...formData,
      year: yearNumber,
      grant_sanctioned: grantNumber,
      approval_date: approvalDate,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/sponsored-research/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setProjects((prev) => [...prev, payload]);
        toast({ title: "Success", description: "Project added successfully!", variant: "success" });

        setIsDialogOpen(false);
        setFormData({ Proj_id: "", year: "", title: "", mentor: "", approval_date: "", grant_sanctioned: "" });
        setGlobalFilterValue("");
        setFilters({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
      } else {
        toast({ title: "Error", description: data.error || "Failed to add project", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Server error", variant: "destructive" });
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Sponsored Research Projects</h2>
          <button onClick={() => setIsDialogOpen(true)} className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a]">
            Add Project
          </button>
        </div>

        <Toolbar
          className="mb-4"
          right={
            <InputText placeholder="Search..." value={globalFilterValue} onChange={onGlobalFilterChange} />
          }
        />

        <DataTable
          value={projects}
          dataKey="Proj_id"
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={["Proj_id", "title", "mentor", "year", "approval_date", "grant_sanctioned"]}
          header={<h3 className="text-xl font-semibold text-[#2f4883]">Project Records</h3>}
          className="p-datatable-sm p-datatable-gridlines"
        >
          <Column field="Proj_id" header="Project ID" sortable />
          <Column field="title" header="Title" sortable />
          <Column field="mentor" header="Mentor / Project Manager" sortable />
          <Column field="year" header="Year" sortable />
          <Column field="approval_date" header="Approval Date" sortable />
          <Column field="grant_sanctioned" header="Grant Sanctioned" sortable />
        </DataTable>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">Add Project</h3>
              <button onClick={() => setIsDialogOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Project ID" value={formData.Proj_id} onChange={(e) => setFormData({ ...formData, Proj_id: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]" />
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]" />
              <input type="text" placeholder="Mentor / Project Manager" value={formData.mentor} onChange={(e) => setFormData({ ...formData, mentor: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]" />
              <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]" />
              <input type="date" placeholder="Approval Date" value={formData.approval_date} onChange={(e) => setFormData({ ...formData, approval_date: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]" />
              <input type="number" placeholder="Grant Sanctioned" value={formData.grant_sanctioned} onChange={(e) => setFormData({ ...formData, grant_sanctioned: e.target.value })} className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]" />
              <button type="submit" className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] float-right">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsoredResearch;
