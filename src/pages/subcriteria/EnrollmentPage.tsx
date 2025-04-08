import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Student {
  
  name: string;
  enrollmentNo: string;
  academicyear: string;
  registrationform: string;
  SSCform: string;
  HSCform: string;
}

interface Student {
    name: string;
    enrollmentNumber: string;
    marksheet10: string | null;
    marksheet12: string | null;
    registrationForm: string | null;
}

function EnrollmentPage(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [products, setProducts] = useState([
    {name: 'Rajvi', enrollmentNo: '1', academicyear: '2023', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Vidya', enrollmentNo: '2', academicyear: '2021', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Dhruvi', enrollmentNo: '3', academicyear: '2029', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Umang', enrollmentNo: '4', academicyear: '2020', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Diya', enrollmentNo: '5', academicyear: '2014', registrationform: '',SSCform: '', HSCform: '' },
    {name: 'Shyama', enrollmentNo: '6', academicyear: '2008', registrationform: '',SSCform: '', HSCform: '' },
  ]);

  

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#2f4883] text-white px-4 py-2 rounded-md hover:bg-[#1a2a4f] transition-colors"
        >
          Add Details
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Ratio Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4 font-semibold">Academic Year</th>
                <th className="py-3 px-4 font-semibold">N (From Table 4.1)</th>
                <th className="py-3 px-4 font-semibold">N1 (From Table 4.1)</th>
                <th className="py-3 px-4 font-semibold">Enrollment Ratio [(N1/N)*100]</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2024-25 (CAY)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2023-24 (CAYm1)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">100%</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">2022-23 (CAYm2)</td>
                <td className="py-3 px-4">60</td>
                <td className="py-3 px-4">42</td>
                <td className="py-3 px-4">70%</td>
              </tr>
            </tbody>
          </table>

          <DataTable value={products} tableStyle={{ minWidth: '50rem' }} dataKey="enrollmentNo">
          <Column field="enrollmentNo" header="enrollmentNo" sortable style={{ width: '25%' }}></Column>
          <Column field="name" header="name" sortable style={{ width: '25%' }}></Column>
          <Column field="academicyear" header="academicyear" sortable style={{ width: '25%' }}></Column>
           <Column field="registrationform" header="registrationform" body={(rowData) => (
                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                      )} style={{ minWidth: '10rem' }}></Column>
           <Column field="SSCform" header="SSCform" body={(rowData) => (
                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                      )} style={{ minWidth: '10rem' }}></Column>
           <Column field="HSCform" header="HSCform" body={(rowData) => (
                        <Button icon="pi pi-file-pdf" className="p-button-rounded p-button-text" onClick={() => {}} tooltip="View Grade History" />
                      )} style={{ minWidth: '10rem' }}></Column>
           <Column body={(rowData) => (
            <div className="flex gap-2 justify-center">
              <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => {}} />
              <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => (rowData)} />
              </div>
            )} exportable={false} style={{ minWidth: '8rem' }}></Column>
      </DataTable>
                
</div>
        </div>
      </div>        
  );
}

export default EnrollmentPage;
