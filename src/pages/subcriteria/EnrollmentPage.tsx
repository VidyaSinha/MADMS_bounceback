import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FilterService } from 'primereact/api';


const EnrollmentPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customers, setCustomers] = useState([]); // Replace with actual data
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const header = (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-[#2f4883]">Customer Details</h2>
    </div>
  );
  
  useEffect(() => {
  FilterService.register('custom_activity', (value, filters) => {
    const [from, to] = filters ?? [null, null];
    if (from === null && to === null) return true;
    if (from !== null && to === null) return from <= value;
    if (from === null && to !== null) return value <= to;
    return from <= value && value <= to;
  });
}, []);

const countryBodyTemplate = (rowData) => <span>{rowData.country?.name}</span>;
  const representativeBodyTemplate = (rowData) => <span>{rowData.representative?.name}</span>;
  const statusBodyTemplate = (rowData) => <span>{rowData.status}</span>;
  const verifiedBodyTemplate = (rowData) => <span>{rowData.verified ? 'Yes' : 'No'}</span>;
  const representativeRowFilterTemplate = (options) => <InputText value={options.value} onChange={(e) => options.filterApplyCallback(e.target.value)} />;
  const activityRowFilterTemplate = (options) => <InputText value={options.value} onChange={(e) => options.filterApplyCallback(e.target.value)} />;
  const statusRowFilterTemplate = (options) => <InputText value={options.value} onChange={(e) => options.filterApplyCallback(e.target.value)} />;
  const verifiedRowFilterTemplate = (options) => <InputText value={options.value} onChange={(e) => options.filterApplyCallback(e.target.value)} />;
  
  
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

          <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
          globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header} emptyMessage="No customers found.">
      <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
      <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
      <Column header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
          body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
      <Column header="Activity(Custom Filter)" field="activity" showFilterMenu={false} showClearButton={false} style={{ minWidth: '14rem' }} filter filterElement={activityRowFilterTemplate} />
      <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
      <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
  </DataTable>

        </div>
      </div>
      </div>
  );
}
export default EnrollmentPage;
