import React from "react";
import EnrollmentPage from "./EnrollmentPage";  // your first table
import CustomTable from "./customtable";        // your second table

export default function MainEnroll() {
  return (
    <div className="p-6">
      <EnrollmentPage />
      <CustomTable />
    </div>
  );
}