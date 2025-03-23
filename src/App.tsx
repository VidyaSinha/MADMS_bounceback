import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginForm } from "./pages/login-form";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { RoleSelection } from "./pages/rolesection";

// Accreditation Body Pages
import NBA from "./pages/accreditation/NBA";
import NAAC from "./pages/accreditation/NAAC";
import NIRF from "./pages/accreditation/NIRF";
import COE from "./pages/accreditation/COE";
import QoS from "./pages/accreditation/QoS";

// Criteria Pages
import Criteria from "./pages/criteria/Criteria";
import SubCriteria from "./pages/criteria/SubCriteria";
import Criteria4NBA from "./pages/criteria/Criteria4NBA";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Accreditation Body Routes */}
          <Route path="/dashboard/nba" element={<NBA />} />
          <Route path="/dashboard/naac" element={<NAAC />} />
          <Route path="/dashboard/nirf" element={<NIRF />} />
          <Route path="/dashboard/coe" element={<COE />} />
          <Route path="/dashboard/qos" element={<QoS />} />
          
          {/* Criteria Routes */}
          <Route path="/dashboard/:body/:criteriaId" element={<Criteria />} />
          <Route path="/dashboard/:body/:criteriaId/:subCriteriaId" element={<SubCriteria />} />
          
          {/* Specific Criteria Pages */}
          <Route path="/dashboard/nba/criteria4/details" element={<Criteria4NBA />} />
          
          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
