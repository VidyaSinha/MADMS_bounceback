import React from "react";

const StudentFacultyRatioTable: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Student-Faculty Ratio (SFR)
      </h2>

      <table style={{ borderCollapse: "collapse", width: "80%", margin: "0 auto" }}>
        <thead>
          <tr>
            <th style={thStyle}>Year</th>
            <th style={thStyle}>
              CAY<br />
              <a href="#">( 2024-25)</a>
            </th>
            <th style={thStyle}>
              CAYm1<br />
              <a href="#">( 2023-24)</a>
            </th>
            <th style={thStyle}>
              CAYm2<br />
              <a href="#">( 2022-23)</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>(u1.1) No. of Students in UG 2nd Year</td>
            <td style={tdStyle}>66</td>
            <td style={tdStyle}>76</td>
            <td style={tdStyle}>66</td>
          </tr>
          <tr>
            <td style={tdStyle}>(u1.2) No. of Students in UG 3rd Year</td>
            <td style={tdStyle}>76</td>
            <td style={tdStyle}>66</td>
            <td style={tdStyle}>76</td>
          </tr>
          <tr>
            <td style={tdStyle}>(u1.3) No. of Students in UG 4th Year</td>
            <td style={tdStyle}>66</td>
            <td style={tdStyle}>76</td>
            <td style={tdStyle}>60</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Total No. of Students in the Department (S)</strong></td>
            <td style={tdStyle}>208</td>
            <td style={tdStyle}>218</td>
            <td style={tdStyle}>202</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>No. of Faculty <u>in the</u> Department (F)</strong></td>
            <td style={tdStyle}>18</td>
            <td style={tdStyle}>14</td>
            <td style={tdStyle}>12</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Student Faculty Ratio (SFR)</strong></td>
            <td style={tdStyle}>11.56</td>
            <td style={tdStyle}>15.57</td>
            <td style={tdStyle}>16.83</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Average SFR</strong></td>
            <td style={tdStyle} colSpan={3}>14.65</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  border: "1px solid black",
  padding: "8px 12px",
  backgroundColor: "#f2f2f2",
  textAlign: "center",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid black",
  padding: "8px 12px",
  textAlign: "center",
};

export default StudentFacultyRatioTable;
