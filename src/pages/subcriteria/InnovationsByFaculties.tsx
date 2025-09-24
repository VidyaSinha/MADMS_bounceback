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

  // Dummy data with visible photos
const [innovations, setInnovations] = useState<Innovation[]>([
  {
    method: "Experimental Research",
    description: "Developed interactive learning module",
    objective: "Improve student engagement",
    outcome: "Participation increased by 30%",
    proof: { name: "Screenshot1.png", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" },
  },
  {
    method: "Simulation Study",
    description: "Created lab experiment simulations",
    objective: "Optimize process workflow",
    outcome: "Reduced errors by 20%",
    proof: { name: "Screenshot2.png", url: "https://images.unsplash.com/photo-1581090700227-4c4f50b3f6b4?w=600" },
  },
  {
    method: "Survey & Analysis",
    description: "Implemented survey tool for courses",
    objective: "Collect student feedback",
    outcome: "Identified key areas for improvement",
    proof: { name: "Screenshot3.png", url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600" },
  },
  {
    method: "Case Study",
    description: "Analyzed successful teaching methods",
    objective: "Adopt best practices",
    outcome: "Improved overall performance",
    proof: { name: "Screenshot4.png", url: "https://images.unsplash.com/photo-1581091870625-034b9d3f97b7?w=600" },
  },
  {
    method: "AI-based Evaluation",
    description: "Developed AI scoring tool",
    objective: "Reduce grading bias",
    outcome: "Fairer assessment",
    proof: { name: "Screenshot5.png", url: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=600" },
  },
  {
    method: "Peer Review",
    description: "Introduced peer feedback system",
    objective: "Encourage collaborative learning",
    outcome: "Enhanced teamwork skills",
    proof: { name: "Screenshot6.png", url: "https://images.unsplash.com/photo-1581090700227-4c4f50b3f6b4?w=600" },
  },
  {
    method: "Workshop",
    description: "Conducted hands-on workshop on modern tools",
    objective: "Improve practical knowledge",
    outcome: "Students gained real-time experience",
    proof: { name: "Screenshot7.png", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" },
  },
  {
    method: "Mentorship Program",
    description: "One-to-one mentoring sessions",
    objective: "Boost student confidence",
    outcome: "Better performance in exams",
    proof: { name: "Screenshot8.png", url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600" },
  },
]);

  const resetForm = () => {
    setMethod("");
    setDescription("");
    setObjective("");
    setOutcome("");
    setProof(null);
  };

  // ✅ Fix: convert uploaded proof image to Base64
  const handleProofChange = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProof({ name: file.name, url: reader.result as string });
    };
    reader.readAsDataURL(file); // convert file to Base64
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

  html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // If content height is bigger than one page
    const pageHeight = pdf.internal.pageSize.getHeight();
    let remainingHeight = pdfHeight;
    let position = 0;

    while (remainingHeight > 0) {
      const height = remainingHeight > pageHeight ? pageHeight : remainingHeight;
      pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);
      remainingHeight -= pageHeight;
      position += pageHeight;
      if (remainingHeight > 0) pdf.addPage();
    }

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
            className="bg-[#2f4883] text-white px-4 py-2 rounded hover:bg-[#1a2a4f]"
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
                    accept="image/*"
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
      <td className="py-3 px-4 max-w-[150px] break-words">{f.method}</td>
      <td className="py-3 px-4 max-w-[250px] break-words">{f.description}</td>
      <td className="py-3 px-4 max-w-[200px] break-words">{f.objective}</td>
      <td className="py-3 px-4 max-w-[200px] break-words">{f.outcome}</td>
      <td className="py-3 px-4">
        {f.proof && (
          <img
            src={f.proof.url}
            alt={f.proof.name}
            className="w-24 h-16 object-cover rounded border"
          />
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Card layout for PDF export */}
<div id="innovationCards" className="p-4 space-y-4 bg-gray-50">
  {innovations.map((f, i) => (
    <div key={i} className="p-4 mb-4 rounded-lg shadow bg-white border border-gray-300">
      <h3 className="text-xl font-bold text-[#2f4883] mb-2">{f.method}</h3>
      <p><span className="font-semibold">Description:</span> {f.description}</p>
      <p><span className="font-semibold">Objective:</span> {f.objective}</p>
      <p><span className="font-semibold">Outcome:</span> {f.outcome}</p>
      {f.proof && (
        <div className="mt-2">
          <span className="font-semibold">Proof:</span>
          <div className="mt-1">
            {/* Larger image for PDF */}
            <img src={f.proof.url} alt={f.proof.name} className="w-84 h-78 object-cover rounded border" />
          </div>
        </div>
      )}
    </div>
  ))}
</div>
    </div>
  );
}

export default InnovationsByFaculties;
