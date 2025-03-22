import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { RoleSelection } from "./pages/rolesection";
import { LoginForm } from "./pages/login-form";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

const App: React.FC = () => {
  const location = useLocation();

  // Check if user is logged in
  const isLoggedIn = location.pathname !== "/" && location.pathname !== "/login";

  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <SidebarProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <AppSidebar />
            
            {/* Main Content */}
            <div className="flex-1 p-6" style={{ backgroundColor: "#AAB7B8" }}>
              <SidebarTrigger />
              <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/login" element={<LoginForm />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      ) : (
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
      )}
    </div>
  );
};

export default App;
