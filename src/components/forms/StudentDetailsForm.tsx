import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const StudentBulkUpload = () => {
  const [studentsData, setStudentsData] = useState<any[]>([]);
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
        enrollment_number: item.enrollment_number || '',
        pcm: Number(String(item.pcm).replace(/[^0-9.]/g, '')) || 0,
        tenth: Number(String(item['10th']).replace(/[^0-9.]/g, '')) || 0,
        twelfth: Number(String(item['12th']).replace(/[^0-9.]/g, '')) || 0,
        acpc: item.acpc || '',
        student_type: item.student_type || 'Degree',
        admission_quota: item.admission_quota || '',
        nationality: item.nationality || '',
        gender: item.gender || '',
        batch_period: item.batch_period || '',
        gr_no: item.gr_no || '',
      }));
            
      setStudentsData(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (studentsData.length === 0) {
      alert('Please upload a file first.');
      return;
    }

    setUploading(true);
    try {
      const response = await axios.post('https://madms-bounceback-backend.onrender.com/submit-form', studentsData, {
        withCredentials: true, // important for session handling
        headers: { 'Content-Type': 'application/json' } // important for session handling
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
      <h2 className="text-2xl font-bold mb-4">Bulk Student Upload</h2>

      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {studentsData.length > 0 && (
        <div className="mb-4 text-green-600">
          ✅ {studentsData.length} students ready to upload
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

export default StudentBulkUpload;
