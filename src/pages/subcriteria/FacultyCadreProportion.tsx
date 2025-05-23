import React from 'react';

const FacultyCadreProportion: React.FC = () => {
  // Data from the provided image
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

  const cadreProportionMarks = 26.84; // Calculated as (2+(0.5*0.6)+(1.84*0.4)) x10

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Faculty Cadre Proportion</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th rowSpan={2} className="py-2 px-4 border-b">Year</th>
              <th colSpan={2} className="py-2 px-4 border-b text-center">Professors</th>
              <th colSpan={2} className="py-2 px-4 border-b text-center">Associate Professors</th>
              <th colSpan={2} className="py-2 px-4 border-b text-center">Assistant Professors</th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b">Required</th>
              <th className="py-2 px-4 border-b">Available</th>
              <th className="py-2 px-4 border-b">Required</th>
              <th className="py-2 px-4 border-b">Available</th>
              <th className="py-2 px-4 border-b">Required</th>
              <th className="py-2 px-4 border-b">Available</th>
            </tr>
          </thead>
          <tbody>
            {cadreData.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{row.year}</td>
                <td className="py-2 px-4 border-b">{row.profRequired}</td>
                <td className="py-2 px-4 border-b">{row.profAvailable}</td>
                <td className="py-2 px-4 border-b">{row.assocProfRequired}</td>
                <td className="py-2 px-4 border-b">{row.assocProfAvailable}</td>
                <td className="py-2 px-4 border-b">{row.asstProfRequired}</td>
                <td className="py-2 px-4 border-b">{row.asstProfAvailable}</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4 border-b font-bold">Average Numbers</td>
              <td className="py-2 px-4 border-b">RF1={averageNumbers.RF1}</td>
              <td className="py-2 px-4 border-b">AF1={averageNumbers.AF1}</td>
              <td className="py-2 px-4 border-b">RF2={averageNumbers.RF2}</td>
              <td className="py-2 px-4 border-b">AF2={averageNumbers.AF2}</td>
              <td className="py-2 px-4 border-b">RF3={averageNumbers.RF3}</td>
              <td className="py-2 px-4 border-b">AF3={averageNumbers.AF3}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Calculations</h2>
        <p>AF1/RF1 = {afRfRatios.AF1_RF1}</p>
        <p>AF2/RF2 = {afRfRatios.AF2_RF2}</p>
        <p>AF3/RF3 = {afRfRatios.AF3_RF3}</p>
        <p className="mt-4"><strong>Cadre proportion marks = {cadreProportionMarks}</strong></p>
      </div>
    </div>
  );
};

export default FacultyCadreProportion; 