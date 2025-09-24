import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from 'primereact/button';
import { Button as ShadcnButton } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { useApi } from '@/contexts/ApiContext';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface FacultyPublication {
  facultyName: string;
  academicSpecialization: string;
  researchSpecialization: string;
  publications: number;
  hIndex: number;
  coursesDevelopment: string;
  mappingToPSO: string;
  documents?: { name: string; url: string }[];
}

const FacultyResearchPublication = () => {
  const navigate = useNavigate();
  const { apiBaseUrl } = useApi();

  // --- Dummy Data ---
// --- Dummy Data ---
// --- Dummy Data ---
const dummyData: FacultyPublication[] = [
  {
    facultyName: "Dr. A. Sharma",
    academicSpecialization: "Computer Science",
    researchSpecialization: "AI & ML",
    publications: 25,
    hIndex: 12,
    coursesDevelopment: "Machine Learning",
    mappingToPSO: "PSO1, PSO2",
    documents: [{ name: "Proof_AI.pdf", url: "https://example.com/ai-proof.pdf" }],
  },
  {
    facultyName: "Dr. B. Patel",
    academicSpecialization: "Electrical Engineering",
    researchSpecialization: "Power Systems",
    publications: 18,
    hIndex: 9,
    coursesDevelopment: "Renewable Energy Systems",
    mappingToPSO: "PSO3, PSO4",
    documents: [{ name: "PowerSystems_Proof.pdf", url: "https://example.com/power.pdf" }],
  },
  {
    facultyName: "Dr. C. Rao",
    academicSpecialization: "Mechanical Engineering",
    researchSpecialization: "Thermal Engineering",
    publications: 32,
    hIndex: 15,
    coursesDevelopment: "Heat Transfer",
    mappingToPSO: "PSO2, PSO5",
    documents: [{ name: "ThermalResearch.pdf", url: "https://example.com/thermal.pdf" }],
  },
  {
    facultyName: "Dr. D. Kapoor",
    academicSpecialization: "Civil Engineering",
    researchSpecialization: "Structural Analysis",
    publications: 22,
    hIndex: 11,
    coursesDevelopment: "Advanced Structural Design",
    mappingToPSO: "PSO1, PSO3",
    documents: [{ name: "Structures.pdf", url: "https://example.com/structures.pdf" }],
  },
  {
    facultyName: "Dr. E. Mehta",
    academicSpecialization: "Information Technology",
    researchSpecialization: "Cybersecurity",
    publications: 27,
    hIndex: 13,
    coursesDevelopment: "Network Security",
    mappingToPSO: "PSO2, PSO4",
    documents: [{ name: "CyberProof.pdf", url: "https://example.com/cyber.pdf" }],
  },
  {
    facultyName: "Dr. F. Khan",
    academicSpecialization: "Electronics & Communication",
    researchSpecialization: "VLSI Design",
    publications: 19,
    hIndex: 8,
    coursesDevelopment: "Digital System Design",
    mappingToPSO: "PSO1, PSO5",
    documents: [{ name: "VLSI_Proof.pdf", url: "https://example.com/vlsi.pdf" }],
  },
  {
    facultyName: "Dr. G. Nair",
    academicSpecialization: "Biotechnology",
    researchSpecialization: "Genomics",
    publications: 40,
    hIndex: 17,
    coursesDevelopment: "Bioinformatics",
    mappingToPSO: "PSO2, PSO6",
    documents: [{ name: "GenomicsResearch.pdf", url: "https://example.com/genomics.pdf" }],
  },
  {
    facultyName: "Dr. H. Verma",
    academicSpecialization: "Mathematics",
    researchSpecialization: "Applied Statistics",
    publications: 14,
    hIndex: 6,
    coursesDevelopment: "Statistical Modeling",
    mappingToPSO: "PSO3, PSO5",
    documents: [{ name: "Statistics.pdf", url: "https://example.com/stats.pdf" }],
  },
  {
    facultyName: "Dr. I. Gupta",
    academicSpecialization: "Physics",
    researchSpecialization: "Quantum Mechanics",
    publications: 35,
    hIndex: 18,
    coursesDevelopment: "Quantum Computing",
    mappingToPSO: "PSO1, PSO6",
    documents: [{ name: "QuantumProof.pdf", url: "https://example.com/quantum.pdf" }],
  },
  {
    facultyName: "Dr. J. Singh",
    academicSpecialization: "Chemistry",
    researchSpecialization: "Organic Synthesis",
    publications: 20,
    hIndex: 10,
    coursesDevelopment: "Advanced Organic Chemistry",
    mappingToPSO: "PSO2, PSO4",
    documents: [{ name: "OrganicResearch.pdf", url: "https://example.com/organic.pdf" }],
  },
  {
    facultyName: "Dr. K. Das",
    academicSpecialization: "Management",
    researchSpecialization: "Operations Research",
    publications: 28,
    hIndex: 14,
    coursesDevelopment: "Operations Management",
    mappingToPSO: "PSO3, PSO5",
    documents: [{ name: "OR_Proof.pdf", url: "https://example.com/or.pdf" }],
  },
  {
    facultyName: "Dr. L. Mukherjee",
    academicSpecialization: "Economics",
    researchSpecialization: "Development Economics",
    publications: 16,
    hIndex: 7,
    coursesDevelopment: "Economic Policy",
    mappingToPSO: "PSO2, PSO4",
    documents: [{ name: "EconResearch.pdf", url: "https://example.com/econ.pdf" }],
  },
  {
    facultyName: "Dr. M. Reddy",
    academicSpecialization: "Environmental Science",
    researchSpecialization: "Climate Change",
    publications: 30,
    hIndex: 16,
    coursesDevelopment: "Sustainable Development",
    mappingToPSO: "PSO1, PSO6",
    documents: [{ name: "Climate.pdf", url: "https://example.com/climate.pdf" }],
  },
  {
    facultyName: "Dr. N. Iyer",
    academicSpecialization: "Philosophy",
    researchSpecialization: "Ethics",
    publications: 12,
    hIndex: 5,
    coursesDevelopment: "Professional Ethics",
    mappingToPSO: "PSO4, PSO5",
    documents: [{ name: "EthicsProof.pdf", url: "https://example.com/ethics.pdf" }],
  },
  {
    facultyName: "Dr. O. Banerjee",
    academicSpecialization: "Linguistics",
    researchSpecialization: "Computational Linguistics",
    publications: 21,
    hIndex: 9,
    coursesDevelopment: "Natural Language Processing",
    mappingToPSO: "PSO2, PSO3",
    documents: [{ name: "NLP.pdf", url: "https://example.com/nlp.pdf" }],
  },
];

  const [table, setTable] = useState<FacultyPublication[]>(dummyData);

  // --- Form states ---
  const [facultyName, setFacultyName] = useState('');
  const [academicSpecialization, setAcademicSpecialization] = useState('');
  const [researchSpecialization, setResearchSpecialization] = useState('');
  const [publications, setPublications] = useState<number | ''>('');
  const [hIndex, setHIndex] = useState<number | ''>('');
  const [coursesDevelopment, setCoursesDevelopment] = useState('');
  const [mappingToPSO, setMappingToPSO] = useState('');
  const [documents, setDocuments] = useState<{ name: string; url: string }[]>([]);

  const handleBack = () => {
    navigate('/dashboard/nba/criteria4');
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file); // simulate backend file upload
    setDocuments([{ name: file.name, url }]);
  };

  const handleSubmit = async () => {
    if (!facultyName || !academicSpecialization || !researchSpecialization || !publications || !hIndex || !coursesDevelopment || !mappingToPSO) {
      alert('Please fill all fields');
      return;
    }

    const newFaculty: FacultyPublication = {
      facultyName,
      academicSpecialization,
      researchSpecialization,
      publications: Number(publications),
      hIndex: Number(hIndex),
      coursesDevelopment,
      mappingToPSO,
      documents,
    };

    setTable((prev) => [...prev, newFaculty]);

    // Reset form
    setFacultyName('');
    setAcademicSpecialization('');
    setResearchSpecialization('');
    setPublications('');
    setHIndex('');
    setCoursesDevelopment('');
    setMappingToPSO('');
    setDocuments([]);

    alert('Faculty publication record added successfully!');
  };

  // Custom document template for table
  const documentTemplate = (rowData: FacultyPublication) => {
    return (
      <div className="flex flex-wrap gap-2">
        {rowData.documents?.map((doc, idx) => (
          <a
            key={idx}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:underline"
          >
            {doc.name}
          </a>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Back Button */}
          <div className="flex justify-between items-center">
            <ShadcnButton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Criteria 5
            </ShadcnButton>
          </div>

          {/* Title */}
          <div>
            <div className="bg-[#2F4883] text-white py-4 px-6 rounded-t-md">
              <h1 className="text-2xl font-bold text-center">
                Faculty Research Publications
              </h1>
            </div>
          </div>

          <Card className="p-6">
            {/* Header with Dialog Trigger */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Faculty Publication Details</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <ShadcnButton className="bg-[#2F4883] hover:bg-slate-900 hover:text-white">
                    + Add Faculty Publication
                  </ShadcnButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Faculty Publication</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="facultyName">Name of Faculty</Label>
                      <Input
                        id="facultyName"
                        placeholder="Enter faculty name"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="academicSpecialization">Academic Specialization</Label>
                      <Input
                        id="academicSpecialization"
                        placeholder="Enter academic specialization"
                        value={academicSpecialization}
                        onChange={(e) => setAcademicSpecialization(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="researchSpecialization">Research Specialization</Label>
                      <Input
                        id="researchSpecialization"
                        placeholder="Enter research specialization"
                        value={researchSpecialization}
                        onChange={(e) => setResearchSpecialization(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="publications">No. of Publications</Label>
                      <Input
                        id="publications"
                        type="number"
                        placeholder="Enter number"
                        value={publications}
                        onChange={(e) => setPublications(e.target.value ? Number(e.target.value) : '')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hIndex">H-Index</Label>
                      <Input
                        id="hIndex"
                        type="number"
                        placeholder="Enter H-index"
                        value={hIndex}
                        onChange={(e) => setHIndex(e.target.value ? Number(e.target.value) : '')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="coursesDevelopment">Courses Development</Label>
                      <Input
                        id="coursesDevelopment"
                        placeholder="Enter courses"
                        value={coursesDevelopment}
                        onChange={(e) => setCoursesDevelopment(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="mappingToPSO">Mapping of Capabilities to PSO</Label>
                      <Input
                        id="mappingToPSO"
                        placeholder="Enter mapping"
                        value={mappingToPSO}
                        onChange={(e) => setMappingToPSO(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="documentUpload">Upload Proof Document</Label>
                      <Input
                        id="documentUpload"
                        type="file"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="bg-[#2F4883] hover:bg-slate-900"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Data Table */}
            <DataTable value={table} tableStyle={{ minWidth: '80rem' }} responsiveLayout="scroll">
              <Column field="facultyName" header="Name of Faculty" sortable />
              <Column field="academicSpecialization" header="Academic Specialization" sortable />
              <Column field="researchSpecialization" header="Research Specialization" sortable />
              <Column field="publications" header="No. of Publications" sortable />
              <Column field="hIndex" header="H-Index" sortable />
              <Column field="coursesDevelopment" header="Courses Development" sortable />
              <Column field="mappingToPSO" header="Mapping of Capabilities to PSO" sortable />
              <Column header="Documents" body={documentTemplate} />
            </DataTable>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacultyResearchPublication;
