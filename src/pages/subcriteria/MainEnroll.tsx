import React from "react";
import EnrollmentPage from "./EnrollmentPage";  // your first table
import CustomTable from "./customtable";        // your second table
import Academic2ndyearPage from "./Academic2ndyearPage"; // academic performance page

export default function MainEnroll() {
  return (
    <div className="p-6">
      <EnrollmentPage />
      <CustomTable />
      <Academic2ndyearPage />
    </div>
  );
}