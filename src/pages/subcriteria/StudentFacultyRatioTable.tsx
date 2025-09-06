import React from "react";

const StudentFacultyRatioTable: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#2f4883]">
        Student-Faculty Ratio (SFR)
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#2f4883] text-white text-lg">
              <th className={thStyle}>Year</th>
              <th className={thStyle}>
                CAY <br />
                <span className="text-sm font-normal">(2024-25)</span>
              </th>
              <th className={thStyle}>
                CAYm1 <br />
                <span className="text-sm font-normal">(2023-24)</span>
              </th>
              <th className={thStyle}>
                CAYm2 <br />
                <span className="text-sm font-normal">(2022-23)</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-base">
            <tr className="hover:bg-gray-50">
              <td className={tdStyle}>(u1.1) No. of Students in UG 2nd Year</td>
              <td className={tdStyle}>66</td>
              <td className={tdStyle}>76</td>
              <td className={tdStyle}>66</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className={tdStyle}>(u1.2) No. of Students in UG 3rd Year</td>
              <td className={tdStyle}>76</td>
              <td className={tdStyle}>66</td>
              <td className={tdStyle}>76</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className={tdStyle}>(u1.3) No. of Students in UG 4th Year</td>
              <td className={tdStyle}>66</td>
              <td className={tdStyle}>76</td>
              <td className={tdStyle}>60</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 font-medium">
              <td className={tdStyle}>
                Total No. of Students in the Department (S)
              </td>
              <td className={tdStyle}>208</td>
              <td className={tdStyle}>218</td>
              <td className={tdStyle}>202</td>
            </tr>
            <tr className="hover:bg-gray-50 font-medium">
              <td className={tdStyle}>
                No. of Faculty <u>in the</u> Department (F)
              </td>
              <td className={tdStyle}>18</td>
              <td className={tdStyle}>14</td>
              <td className={tdStyle}>12</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 font-semibold">
              <td className={tdStyle}>Student Faculty Ratio (SFR)</td>
              <td className={tdStyle}>11.56</td>
              <td className={tdStyle}>15.57</td>
              <td className={tdStyle}>16.83</td>
            </tr>
            <tr className="bg-[#e0f2fe] font-bold text-[#1e3a8a] text-lg">
              <td className={tdStyle}>Average SFR</td>
              <td className={tdStyle} colSpan={3}>
                14.65
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle =
  "px-6 py-4 border text-center text-lg font-semibold tracking-wide";
const tdStyle =
  "px-6 py-4 border text-center whitespace-nowrap";

export default StudentFacultyRatioTable;
