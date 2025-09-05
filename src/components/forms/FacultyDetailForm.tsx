import React, { useState } from "react";
import axios from "axios";
import { useApi } from "@/contexts/ApiContext";

const FacultyBulkUpload = () => {
  const { apiBaseUrl } = useApi();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Send FormData to backend
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // ✅ backend expects "file"

    setUploading(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/faculty/upload`,
        formData,
        {
          withCredentials: true, // send session cookies if needed
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Faculty Details Upload</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Upload an Excel file with the following columns:
        </p>
        <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
          <li>name (required)</li>
          <li>appointment_letter (date format: YYYY-MM-DD)</li>
          <li>salary_slip</li>
          <li>specialization</li>
          <li>subject_allocation</li>
          <li>type</li>
        </ul>
      </div>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {file && (
        <div className="mb-4 text-green-600">
          ✅ {file.name} selected and ready to upload
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className={`px-4 py-2 text-white rounded ${
          uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Submit to Server"}
      </button>
    </div>
  );
};

export default FacultyBulkUpload;
