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
  studentName: string;
  productTitle: string;
  prototypeImage: string; // store base64 or URL
}

const dummyProjects: Project[] = [
  {
    id: "1",
    studentName: "Riya Patel",
    productTitle: "Smart Helmet",
    prototypeImage: "https://via.placeholder.com/100", // sample placeholder image
  },
  {
    id: "2",
    studentName: "Arjun Sharma",
    productTitle: "AI Health App",
    prototypeImage: "https://via.placeholder.com/100",
  },
];

const DevelopmentActivities: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [prototypeImage, setPrototypeImage] = useState("");
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [globalFilter, setGlobalFilter] = useState("");

  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrototypeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      studentName: studentName || "Unnamed Student",
      productTitle: productTitle || "Untitled Product",
      prototypeImage: prototypeImage || "https://via.placeholder.com/100",
    };

    setProjects((prev) => [...prev, newProject]);

    toast({
      title: "Submitted",
      description: "Project record submitted successfully!",
    });

    setIsDialogOpen(false);

    // Reset form
    setStudentName("");
    setProductTitle("");
    setPrototypeImage("");
  };

  const imageBodyTemplate = (rowData: Project) => {
    return (
      <img
        src={rowData.prototypeImage}
        alt="prototype"
        className="w-16 h-16 object-cover rounded"
      />
    );
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#2f4883]">
            Student Product Prototypes
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
                Prototype Records
              </h3>
            }
            className="p-datatable-sm p-datatable-gridlines"
          >
            <Column
              field="studentName"
              header="Student Name"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="productTitle"
              header="Product Title"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>
            <Column
              header="Prototype Design"
              body={imageBodyTemplate}
              style={{ minWidth: "12rem" }}
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
                Add Prototype Record
              </h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Student
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Product Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#2f4883] focus:border-transparent"
                  required
                />
              </div>

              {/* Prototype Design */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prototype Design (Image)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded"
                  required
                />
                {prototypeImage && (
                  <img
                    src={prototypeImage}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
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

export default DevelopmentActivities;
