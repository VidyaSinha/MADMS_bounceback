import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterService } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const EnrollmentPage: React.FC = () => {
  const [customers, setCustomers] = useState([
    { EnrollmentNo: 1, Name: 'Rajvi', AcademicYear: { name: '1019' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 2, Name: 'Vidya', AcademicYear: { name: '1234' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 3, Name: 'Dhruvi', AcademicYear: { name: '8200' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 4, Name: 'Devanshi', AcademicYear: { name: '7894' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 5, Name: 'Priyanshi', AcademicYear: { name: '9874' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 6, Name: 'DhruviPatel', AcademicYear: { name: '9874' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 7, Name: 'dhruviB', AcademicYear: { name: '7412' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 8, Name: 'Shyama', AcademicYear: { name: '9632' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 9, Name: 'Diya', AcademicYear: { name: '8000' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 10, Name: 'nandini', AcademicYear: { name: '9674' }, RegistrationForm: '', SSC: '', HSC: '' },
    { EnrollmentNo: 11, Name: 'ritesh', AcademicYear: { name: '7458' }, RegistrationForm: '', SSC: '', HSC: '' },
  ]);

  type Customer = {
    EnrollmentNo: number;
    Name: string;
    AcademicYear: { name: string };
    RegistrationForm: string;
    SSC: string;
    HSC: string;
  };

  useEffect(() => {
    FilterService.register('custom_activity', (value, filters) => {
      const [from, to] = filters ?? [null, null];
      if (from === null && to === null) return true;
      if (from !== null && to === null) return from <= value;
      if (from === null && to !== null) return value <= to;
      return from <= value && value <= to;
    });
  }, []);

  const handleDelete = (enrollmentNo: number) => {
    const updatedCustomers = customers.filter(c => c.EnrollmentNo !== enrollmentNo);
    setCustomers(updatedCustomers);
  };

  const actionBodyTemplate = (rowData:Customer) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info" tooltip="Edit" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" tooltip="Delete" onClick={() => handleDelete(rowData.EnrollmentNo)} />
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Table</h2>
        <DataTable
          value={customers}
          paginator
          rows={10}
          dataKey="EnrollmentNo"
          emptyMessage="No customers found."
        >
          <Column field="EnrollmentNo" header="Enrollment No" />
          <Column field="Name" header="Name" />
          <Column field="AcademicYear.name" header="Academic Year" />
          <Column header="Actions" body={actionBodyTemplate} style={{ width: '150px' }} />
        </DataTable>
      </div>
    </div>
  );
};

export default EnrollmentPage;
