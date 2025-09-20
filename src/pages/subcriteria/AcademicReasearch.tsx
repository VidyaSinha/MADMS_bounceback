import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

// ShadCN Toast
import { useToast } from "@/components/ui/use-toast";

// PrimeReact styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  listedIn: string;
  publicationType: string;
}

const dummyPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "AI in Healthcare",
    authors: "Dr. Mehta, Prof. Sharma",
    journal: "International Journal of AI",
    year: "2023",
    listedIn: "Scopus",
    publicationType: "Journal"
  },
  {
    id: "2",
    title: "Blockchain in Education",
    authors: "Prof. Neha",
    journal: "Education Tech Review",
    year: "2022",
    listedIn: "Web of Science",
    publicationType: "Conference"
  }
];

const AcademicReasearch: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState("");
  const [listedIn, setListedIn] = useState("");
  const [publicationType, setPublicationType] = useState("");
  const [papers, setPapers] = useState<ResearchPaper[]>(dummyPapers);
  const [globalFilter, setGlobalFilter] = useState("");

  const { toast } = useToast();

  const listedInOptions = [
    { label: "Scopus", value: "Scopus" },
    { label: "Web of Science", value: "Web of Science" },
    { label: "Non-indexed", value: "Non-indexed" }
  ];

  const publicationTypeOptions = [
    { label: "Journal", value: "Journal" },
    { label: "Conference", value: "Conference" },
    { label: "Book Chapter", value: "Book Chapter" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPaper: ResearchPaper = {
      id: Math.random().toString(36).substr(2, 9),
      title: title || "Untitled Paper",
      authors: authors || "Unknown Author",
      journal: journal || "Unknown Journal",
      year: year || "2025",
      listedIn: listedIn || "Non-indexed",
      publicationType: publicationType || "Journal"
    };

    setPapers((prev) => [...prev, newPaper]);

    toast({
      title: "Submitted",
      description: "Research paper record submitted successfully!"
    });

    setIsDialogOpen(false);

    // Reset form
    setTitle("");
    setAuthors("");
    setJournal("");
    setYear("");
    setListedIn("");
    setPublicationType("");
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">Academic Research Papers</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] transition-colors"
          >
            Add Paper
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
            value={papers}
            dataKey="id"
            paginator
            rows={10}
            globalFilter={globalFilter}
            header={<h3 className="text-xl font-semibold text-[#2f4883]">Research Papers Records</h3>}
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column field="title" header="Title of Paper" sortable style={{ minWidth: "16rem" }}></Column>
            <Column field="authors" header="Author(s)" sortable style={{ minWidth: "14rem" }}></Column>
            <Column field="journal" header="Journal" sortable style={{ minWidth: "14rem" }}></Column>
            <Column field="year" header="Year" sortable style={{ minWidth: "8rem" }}></Column>
            <Column field="listedIn" header="Listed In" sortable style={{ minWidth: "12rem" }}></Column>
            <Column field="publicationType" header="Type of Publication" sortable style={{ minWidth: "12rem" }}></Column>
          </DataTable>
        </div>
      </div>

      {/* Add Paper Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">Add Research Paper</h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title of Paper */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title of Paper</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Authors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author(s)</label>
                <input
                  type="text"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Journal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
                <input
                  type="text"
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
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

              {/* Listed In */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listed In</label>
                <Dropdown
                  value={listedIn}
                  options={listedInOptions}
                  onChange={(e) => setListedIn(e.value)}
                  placeholder="Select"
                  className="w-full"
                />
              </div>

              {/* Type of Publication */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Publication</label>
                <Dropdown
                  value={publicationType}
                  options={publicationTypeOptions}
                  onChange={(e) => setPublicationType(e.value)}
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

export default AcademicReasearch;
