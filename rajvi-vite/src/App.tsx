import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Router from 'react-router-dom'
import { RoleSelection } from "./pages/rolesection"; // Ensure default export
import { LoginForm } from "./pages/login-form"; // Ensure default export


const App: React.FC = () => {
  return (
    <Router>
      <div
        className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
        style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-6">
          <h1 className="text-3xl font-bold text-[#2E4053] text-center mb-10">
            Marwadi Accreditation and Data Management System
          </h1>
          <Routes>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;