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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Innovation {
  method: string;
  description: string;
  objective: string;
  outcome: string;
  proof?: { name: string; url: string };
}

function InnovationsByFaculties(): JSX.Element {
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [method, setMethod] = useState("");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [outcome, setOutcome] = useState("");
  const [proof, setProof] = useState<{ name: string; url: string } | null>(null);

  // Dummy data
  const [innovations, setInnovations] = useState<Innovation[]>([
    {
      method: "Experimental Research",
      description: "Developed interactive learning module",
      objective: "Improve student engagement",
      outcome: "Participation increased by 30%",
      proof: { name: "Screenshot1.png", url: "https://via.placeholder.com/150" },
    },
    {
      method: "Simulation Study",
      description: "Created lab experiment simulations",
      objective: "Optimize process workflow",
      outcome: "Reduced errors by 20%",
      proof: { name: "Screenshot2.png", url: "https://via.placeholder.com/150" },
    },
    {
      method: "Survey & Analysis",
      description: "Implemented survey tool for courses",
      objective: "Collect student feedback",
      outcome: "Identified key areas for improvement",
      proof: { name: "Screenshot3.png", url: "https://via.placeholder.com/150" },
    },
  ]);

  const resetForm = () => {
    setMethod("");
    setDescription("");
    setObjective("");
    setOutcome("");
    setProof(null);
  };

  const handleProofChange = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProof({ name: file.name, url });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method || !description || !objective || !outcome) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    setInnovations((prev) => [
      ...prev,
      { method, description, objective, outcome, proof: proof || undefined },
    ]);
    toast({ title: "Success", description: "Innovation added!" });
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("innovationCards");
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Innovations.pdf");
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#2f4883]">
          Faculty Innovations
        </h2>
        <div className="flex gap-2">
          <ShadcnButton
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download PDF
          </ShadcnButton>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <ShadcnButton className="px-4 py-2 bg-[#2f4883] text-white rounded hover:bg-[#25376a]">
                Add Innovation
              </ShadcnButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Innovation</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                autoComplete="off"
              >
                <div className="space-y-2">
                  <Label>Method</Label>
                  <Input
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Objective</Label>
                  <Input
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Outcome</Label>
                  <Input
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Proof (Screenshot/Document)</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      handleProofChange(e.target.files?.[0] || null)
                    }
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
                    className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f]"
                  >
                    Submit
                  </ShadcnButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table view for screen */}
      <div
        id="innovationTable"
        className="p-4 border rounded-lg shadow-sm bg-gray-50 mb-8"
      >
        <table className="min-w-full text-sm text-left bg-white border border-gray-300">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4 font-semibold">Method</th>
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold">Objective</th>
              <th className="py-3 px-4 font-semibold">Outcome</th>
              <th className="py-3 px-4 font-semibold">Proof</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {innovations.map((f, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-3 px-4">{f.method}</td>
                <td className="py-3 px-4">{f.description}</td>
                <td className="py-3 px-4">{f.objective}</td>
                <td className="py-3 px-4">{f.outcome}</td>
                <td className="py-3 px-4">
                  {f.proof && (
                    <a
                      href={f.proof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {f.proof.name}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout only for PDF export */}
      <div
        id="innovationCards"
        className="absolute left-[-9999px] top-0 w-[800px] p-6 bg-gray-50"
      >
        {innovations.map((f, i) => (
          <div
            key={i}
            className="p-4 mb-4 rounded-lg shadow bg-white border border-gray-300"
          >
            <h3 className="text-xl font-bold text-[#2f4883] mb-2">
              {f.method}
            </h3>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {f.description}
            </p>
            <p>
              <span className="font-semibold">Objective:</span> {f.objective}
            </p>
            <p>
              <span className="font-semibold">Outcome:</span> {f.outcome}
            </p>
            {f.proof && (
              <p>
                <span className="font-semibold">Proof:</span>{" "}
                <a
                  href={f.proof.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {f.proof.name}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InnovationsByFaculties;
