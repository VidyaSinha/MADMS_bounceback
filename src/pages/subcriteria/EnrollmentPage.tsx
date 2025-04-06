import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const EnrollmentPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Enrollment Ratio Details */}
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
