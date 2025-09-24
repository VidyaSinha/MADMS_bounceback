import React, { useState, useEffect } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from "xlsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  listedIn: string;
  publicationType: string;
}

const AcademicResearch: React.FC = () => {
  const { toast } = useToast();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState("");
  const [listedIn, setListedIn] = useState<string | null>(null);
  const [publicationType, setPublicationType] = useState<string | null>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const listedInOptions = [
    { label: "Scopus", value: "Scopus" },
    { label: "Web of Science", value: "Web of Science" },
    { label: "Non-indexed", value: "Non-indexed" },
  ];

  const publicationTypeOptions = [
    { label: "Journal", value: "Journal" },
    { label: "Conference", value: "Conference" },
    { label: "Book Chapter", value: "Book Chapter" },
  ];

  // Fetch papers and map backend fields to frontend
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch("http://localhost:5000/academic-research/", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          const formatted: ResearchPaper[] = data.map((p: any) => ({
            id: p.id,
            title: p.title_of_paper || "",
            authors: p.authors || "",
            journal: p.journal || "",
            year: Number(p.year) || 0,
            listedIn: p.listed_in || "Non-indexed",
            publicationType: p.type_of_publication || "Conference",
          }));
          setPapers(formatted);
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch papers",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Server error while fetching papers",
          variant: "destructive",
        });
      }
    };
    fetchPapers();
  }, []);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters({
      ...filters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !authors ||
      !journal ||
      !year ||
      !listedIn ||
      !publicationType
    ) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const yearNumber = Number(year);
    if (
      isNaN(yearNumber) ||
      yearNumber <= 0 ||
      yearNumber > new Date().getFullYear()
    ) {
      toast({
        title: "Error",
        description: "Enter a valid year",
        variant: "destructive",
      });
      return;
    }

    const newPaper = {
      id: Math.random().toString(36).substring(2, 10),
      title,
      authors,
      journal,
      year: yearNumber,
      listedIn,
      publicationType,
    };

    try {
      const res = await fetch("http://localhost:5000/academic-research/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newPaper),
      });

      const data = await res.json();

      if (res.ok) {
        setPapers((prev) => [...prev, newPaper]);
        toast({
          title: "Success",
          description: "Research paper added successfully!",
          variant: "success",
        });

        setIsDialogOpen(false);
        setTitle("");
        setAuthors("");
        setJournal("");
        setYear("");
        setListedIn(null);
        setPublicationType(null);
        setGlobalFilterValue("");
        setFilters({
          global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Server error",
        variant: "destructive",
      });
    }
  };

  // Excel upload handler
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

      const formatted: ResearchPaper[] = jsonData.map((row: any) => ({
        id: Math.random().toString(36).substring(2, 10),
        title: row["Title"] || "",
        authors: row["Authors"] || "",
        journal: row["Journal"] || "",
        year: Number(row["Year"]) || 0,
        listedIn: row["Listed In"] || "Non-indexed",
        publicationType: row["Publication Type"] || "Conference",
      }));

      setPapers((prev) => [...prev, ...formatted]);
      toast({
        title: "Success",
        description: "Excel data imported successfully!",
        variant: "success",
      });
    };
    reader.readAsBinaryString(file);
  };

  // 🔹 Generate dynamic summary (faculty × years)
  const generateSummary = () => {
    const summary: Record<string, any> = {};
    const yearTotals: Record<number, Set<string>> = {};

    papers.forEach((p) => {
      if (!summary[p.authors]) {
        summary[p.authors] = { faculty: p.authors };
      }
      if (!summary[p.authors][p.year]) {
        summary[p.authors][p.year] = 0;
      }
      summary[p.authors][p.year]++;

      if (!yearTotals[p.year]) {
        yearTotals[p.year] = new Set();
      }
      yearTotals[p.year].add(p.title);
    });

    const rows = Object.values(summary);

    const totalRow: any = { faculty: "Unique total papers" };
    Object.keys(yearTotals).forEach((year) => {
      totalRow[year] = yearTotals[Number(year)].size;
    });

    return [...rows, totalRow];
  };

  // 🔹 Get all dynamic years from data
  const getAllYears = () => {
    const years = Array.from(new Set(papers.map((p) => p.year))).sort(
      (a, b) => b - a
    );
    return years;
  };

  // 🔹 Generate category-wise summary (Listed In × Publication Type)
  const generateCategorySummary = () => {
    const summary: Record<string, any> = {};
    const pubTypes = Array.from(new Set(papers.map((p) => p.publicationType)));

    papers.forEach((p) => {
      if (!summary[p.listedIn]) {
        summary[p.listedIn] = { listedIn: p.listedIn };
        pubTypes.forEach((t) => (summary[p.listedIn][t] = 0));
      }
      summary[p.listedIn][p.publicationType]++;
    });

    const rows = Object.values(summary);

    const totalRow: any = { listedIn: "Total" };
    pubTypes.forEach((t) => {
      totalRow[t] = papers.filter((p) => p.publicationType === t).length;
    });

    return { rows: [...rows, totalRow], pubTypes };
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4 space-x-2">
          <h2 className="text-2xl font-semibold text-[#2f4883]">
            Academic Research Papers
          </h2>
          <div className="flex space-x-2">
            <label className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] cursor-pointer">
              Upload Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a]"
            >
              Add Paper
            </button>
          </div>
        </div>

        <Toolbar
          className="mb-4"
          right={
            <InputText
              placeholder="Search..."
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
            />
          }
        />

        {/* 🔹 Main Research Papers Table */}
        <DataTable
          value={papers}
          dataKey="id"
          paginator
          rows={10}
          filters={filters}
          globalFilterFields={[
            "title",
            "authors",
            "journal",
            "year",
            "listedIn",
            "publicationType",
          ]}
          header={
            <h3 className="text-xl font-semibold text-[#2f4883]">
              Research Papers Records
            </h3>
          }
          className="p-datatable-sm p-datatable-gridlines"
        >
          <Column field="title" header="Title of Paper" sortable />
          <Column field="authors" header="Author(s)" sortable />
          <Column field="journal" header="Journal" sortable />
          <Column field="year" header="Year" sortable />
          <Column field="listedIn" header="Listed In" sortable />
          <Column field="publicationType" header="Type of Publication" sortable />
        </DataTable>
      </div>

      {/* 🔹 Summary Table */}
      {papers.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-semibold text-[#2f4883] mb-4">
            Publication Summary
          </h3>
          <DataTable
            value={generateSummary()}
            dataKey="faculty"
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column field="faculty" header="Faculty Name" />
            {getAllYears().map((y) => (
              <Column key={y} field={String(y)} header={String(y)} />
            ))}
          </DataTable>
        </div>
      )}

      {/* 🔹 Category-wise Summary Table */}
      {papers.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto mt-8">
          <h3 className="text-xl font-semibold text-[#2f4883] mb-4">
            Category-wise Publication Summary
          </h3>
          <DataTable
            value={generateCategorySummary().rows}
            dataKey="listedIn"
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column field="listedIn" header="Listed In" />
            {generateCategorySummary().pubTypes.map((t) => (
              <Column key={t} field={t} header={t} />
            ))}
          </DataTable>
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2f4883]">
                Add Research Paper
              </h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]"
              />
              <input
                type="text"
                placeholder="Authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]"
              />
              <input
                type="text"
                placeholder="Journal"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]"
              />
              <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883]"
              />
              <Dropdown
                value={listedIn}
                options={listedInOptions}
                onChange={(e) => setListedIn(e.value)}
                placeholder="Listed In"
                className="w-full"
              />
              <Dropdown
                value={publicationType}
                options={publicationTypeOptions}
                onChange={(e) => setPublicationType(e.value)}
                placeholder="Type of Publication"
                className="w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a] float-right"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicResearch;
