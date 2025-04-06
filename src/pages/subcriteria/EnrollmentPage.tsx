import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterService } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // or your preferred theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const EnrollmentPage: React.FC = () => {
  useEffect(() => {
    FilterService.register('custom_activity', (value, filters) => {
      const [from, to] = filters ?? [null, null];
      if (from === null && to === null) return true;
      if (from !== null && to === null) return from <= value;
      if (from === null && to !== null) return value <= to;
      return from <= value && value <= to;
    });
  }, []);

  type Customer = {
    id: number;
    name: string;
    country: { name: string };
    representative: string;
    activity: number;
    status: string;
    verified: boolean;
  };

  const customers = [
    {
      id: 1,
      name: 'Rajvi',
      country: { name: 'India' },
      representative: 'Foram',
      activity: 50,
      status: 'Active',
      verified: true,
    },
    {
      id: 2,
      name: 'Nandini',
      country: { name: 'India' },
      representative: 'Dharmi',
      activity: 80,
      status: 'Inactive',
      verified: false,
    },
  ];

  const filters = null;
  const loading = false;

const countryBodyTemplate = (rowData: Customer) => rowData.country.name;
const representativeBodyTemplate = (rowData: Customer) => rowData.representative;
const representativeRowFilterTemplate = () => <input type="text" className="p-inputtext p-component" />;
const activityRowFilterTemplate = () => <input type="text" className="p-inputtext p-component" />;
const statusBodyTemplate = (rowData: Customer) => rowData.status;
const statusRowFilterTemplate = () => <input type="text" className="p-inputtext p-component" />;
const verifiedBodyTemplate = (rowData: Customer) => (rowData.verified ? 'Yes' : 'No');
const verifiedRowFilterTemplate = () => <input type="checkbox" />;

  const header = <div className="text-lg font-semibold mb-4">Customer Table</div>;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow p-6">
        {header}
        <DataTable
          value={customers}
          paginator
          rows={10}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          globalFilterFields={['name', 'country.name', 'representative.name', 'status']}
          emptyMessage="No customers found."
        >
          <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
          <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
          <Column
            header="Agent"
            filterField="representative"
            showFilterMenu={false}
            filterMenuStyle={{ width: '14rem' }}
            style={{ minWidth: '14rem' }}
            body={representativeBodyTemplate}
            filter
            filterElement={representativeRowFilterTemplate}
          />
          <Column
            header="Activity(Custom Filter)"
            field="activity"
            showFilterMenu={false}
            showClearButton={false}
            style={{ minWidth: '14rem' }}
            filter
            filterElement={activityRowFilterTemplate}
          />
          <Column
            field="status"
            header="Status"
            showFilterMenu={false}
            filterMenuStyle={{ width: '14rem' }}
            style={{ minWidth: '12rem' }}
            body={statusBodyTemplate}
            filter
            filterElement={statusRowFilterTemplate}
          />
          <Column
            field="verified"
            header="Verified"
            dataType="boolean"
            style={{ minWidth: '6rem' }}
            body={verifiedBodyTemplate}
            filter
            filterElement={verifiedRowFilterTemplate}
          />
        </DataTable>
      </div>

      {/* Enrollment Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-[#2f4883] mb-4">Enrollment Ratio Details</h2>
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2 px-4">Academic Year</th>
              <th className="py-2 px-4">N (From Table 4.1)</th>
              <th className="py-2 px-4">N1 (From Table 4.1)</th>
              <th className="py-2 px-4">Enrollment Ratio [(N1/N)*100]</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b">
              <td className="py-2 px-4">2024-25 (CAY)</td>
              <td className="py-2 px-4">60</td>
              <td className="py-2 px-4">60</td>
              <td className="py-2 px-4">100%</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">2023-24 (CAYm1)</td>
              <td className="py-2 px-4">60</td>
              <td className="py-2 px-4">60</td>
              <td className="py-2 px-4">100%</td>
            </tr>
            <tr>
              <td className="py-2 px-4">2022-23 (CAYm2)</td>
              <td className="py-2 px-4">60</td>
              <td className="py-2 px-4">42</td>
              <td className="py-2 px-4">70%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentPage;
