import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useApi } from '@/contexts/ApiContext';

const FacultyBulkUpload = () => {
  const { apiBaseUrl } = useApi();
  const [facultyData, setFacultyData] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map(item => ({
        name: item.name || '',
        appointment_letter: item.appointment_letter ? new Date(item.appointment_letter).toISOString().split('T')[0] : null,
        salary_slip: item.salary_slip || '',
        specialization: item.specialization || '',
        subject_allocation: item.subject_allocation || '',
        type: item.type || ''
      }));

      setFacultyData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (facultyData.length === 0) {
      alert('Please upload a file first.');
      return;
    }

    setUploading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/faculty/upload`, facultyData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      alert(response.data.message);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || 'An error occurred');
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
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        className="mb-4 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {facultyData.length > 0 && (
        <div className="mb-4 text-green-600">
          ✅ {facultyData.length} faculty members ready to upload
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className={`px-4 py-2 text-white rounded ${
          uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Uploading...' : 'Submit to Server'}
      </button>
    </div>
  );
};

export default FacultyBulkUpload;
