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
import { ApiProvider } from "./contexts/ApiContext";


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
import Criteria5NBA from "./pages/criteria/Criteria5NBA";

import { OtpForm } from "./pages/otp-form";
import StudentDetailsForm from "./components/forms/StudentDetailsForm";
import EnrollmentPage from "./pages/subcriteria/EnrollmentPage";
import SuccessRatePage from "./pages/subcriteria/SuccessRatePage";
import Academic2ndyearPage from "./pages/subcriteria/Academic2ndyearPage";
import PlacementPage from "./pages/subcriteria/PlacementPage";
import societies from "./pages/subcriteria/SocietiesPage";
import SocietiesPage from "./pages/subcriteria/SocietiesPage";
import MagazinePage from "./pages/subcriteria/Magazine";
import AchievementsPage from "./pages/subcriteria/AchievementsPage";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

          <Routes>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/otp-form" element={<OtpForm />} />



          {/* Accreditation Body Routes */}
          <Route path="/dashboard/nba" element={<NBA />} />
          {/* <Route path="/dashboard/naac" element={<NAAC />} />
          <Route path="/dashboard/nirf" element={<NIRF />} />
          <Route path="/dashboard/coe" element={<COE />} />
          <Route path="/dashboard/qos" element={<QoS />} /> */}

          {/* Criteria Routes */}
          <Route path="/dashboard/:body/:criteriaId" element={<Criteria />} />
          <Route path="/dashboard/:body/:criteriaId/:subCriteriaId" element={<SubCriteria />} />

          {/* Specific Criteria Pages */}
          <Route path="/dashboard/nba/criteria4" element={<Criteria4NBA />} />
          <Route path="dashboard/nba/criteria5" element={<Criteria5NBA/>}/>
          
          {/* forms  */}
          <Route path="/components/forms/StudentDetailsForm" element={<StudentDetailsForm />} />

          {/* Sub criteria*/}

          <Route path="/enrollment" element={<EnrollmentPage/>}/>
          <Route path="/successrate" element={<SuccessRatePage/>}/>
          <Route path="/academic2ndyear" element={<Academic2ndyearPage/>}/>
          <Route path="/placement" element={<PlacementPage/>}/>
          <Route path="/societies" element={<SocietiesPage/>}/>
          <Route path="/magazine" element={<MagazinePage/>}/>
          <Route path="/achievements" element={<AchievementsPage/>}/>

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </TooltipProvider>
    </ApiProvider>
  </QueryClientProvider>
);

export default App;
