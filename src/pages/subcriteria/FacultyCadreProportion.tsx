import React from 'react';

const FacultyCadreProportion: React.FC = () => {
  // Data
  const cadreData = [
    { year: 'CAY 2024-25', profRequired: 1, profAvailable: 2, assocProfRequired: 2, assocProfAvailable: 2, asstProfRequired: 6, asstProfAvailable: 14 },
    { year: 'CAYm1 2023-24', profRequired: 1, profAvailable: 2, assocProfRequired: 2, assocProfAvailable: 1, asstProfRequired: 7, asstProfAvailable: 11 },
    { year: 'CAYm2 2022-23', profRequired: 1, profAvailable: 2, assocProfRequired: 2, assocProfAvailable: 0, asstProfRequired: 6, asstProfAvailable: 10 },
  ];

  const averageNumbers = {
    RF1: 1,
    AF1: 2,
    RF2: 2,
    AF2: 1,
    RF3: 6.33,
    AF3: 11.67,
  };

  const afRfRatios = {
    AF1_RF1: 2,
    AF2_RF2: 0.5,
    AF3_RF3: 1.84,
  };

  const cadreProportionMarks = 26.84;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-[#2f4883]">
        Faculty Cadre Proportion
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-2xl">
        <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#2f4883] text-white text-lg">
              <th rowSpan={2} className={thStyle}>Year</th>
              <th colSpan={2} className={thStyle}>Professors</th>
              <th colSpan={2} className={thStyle}>Associate Professors</th>
              <th colSpan={2} className={thStyle}>Assistant Professors</th>
            </tr>
            <tr className="bg-[#2f4883] text-white text-base">
              <th className={thStyle}>Required</th>
              <th className={thStyle}>Available</th>
              <th className={thStyle}>Required</th>
              <th className={thStyle}>Available</th>
              <th className={thStyle}>Required</th>
              <th className={thStyle}>Available</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-base">
            {cadreData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-50"}>
                <td className={tdStyle}>{row.year}</td>
                <td className={tdStyle}>{row.profRequired}</td>
                <td className={tdStyle}>{row.profAvailable}</td>
                <td className={tdStyle}>{row.assocProfRequired}</td>
                <td className={tdStyle}>{row.assocProfAvailable}</td>
                <td className={tdStyle}>{row.asstProfRequired}</td>
                <td className={tdStyle}>{row.asstProfAvailable}</td>
              </tr>
            ))}
            <tr className="bg-[#e0f2fe] font-semibold text-[#1e3a8a]">
              <td className={tdStyle}>Average Numbers</td>
              <td className={tdStyle}>RF1 = {averageNumbers.RF1}</td>
              <td className={tdStyle}>AF1 = {averageNumbers.AF1}</td>
              <td className={tdStyle}>RF2 = {averageNumbers.RF2}</td>
              <td className={tdStyle}>AF2 = {averageNumbers.AF2}</td>
              <td className={tdStyle}>RF3 = {averageNumbers.RF3}</td>
              <td className={tdStyle}>AF3 = {averageNumbers.AF3}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-white shadow-md p-6 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-[#2f4883]">Calculations</h2>
        <p className="text-base text-gray-700 mb-2">AF1/RF1 = {afRfRatios.AF1_RF1}</p>
        <p className="text-base text-gray-700 mb-2">AF2/RF2 = {afRfRatios.AF2_RF2}</p>
        <p className="text-base text-gray-700 mb-2">AF3/RF3 = {afRfRatios.AF3_RF3}</p>
        <p className="mt-4 text-lg font-bold text-[#1e3a8a]">
          Cadre Proportion Marks = {cadreProportionMarks}
        </p>
      </div>
    </div>
  );
};

const thStyle =
  "px-6 py-4 border text-center font-semibold tracking-wide";
const tdStyle =
  "px-6 py-4 border text-center whitespace-nowrap";

export default FacultyCadreProportion;
