import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const enrollmentData = [
  {
    academicYear: "2024-25 (CAY)",
    N: 60,
    N1: 60,
    ratio: "100%",
  },
  {
    academicYear: "2023-24 (CAYm1)",
    N: 60,
    N1: 60,
    ratio: "100%",
  },
  {
    academicYear: "2022-23 (CAYm2)",
    N: 60,
    N1: 42,
    ratio: "70%",
  },
];

const customtable: React.FC = () => {
  return (
    <div className="card mt-6 p-4 border border-gray-300 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Custom Enrollment Ratio Table</h2>
      <DataTable value={enrollmentData} paginator rows={3} responsiveLayout="scroll">
        <Column field="academicYear" header="Academic Year" />
        <Column field="N" header="N (From Table 4.1)" />
        <Column field="N1" header="N1 (From Table 4.1)" />
        <Column field="ratio" header="Enrollment Ratio [(N1/N)*100]" />
      </DataTable>
    </div>
  );
};

export default customtable;
