import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./pages/login-form";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { RoleSelection } from "./pages/rolesection";
import { ApiProvider } from "./contexts/ApiContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";


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
import StudentFacultyRatioTable from "./pages/subcriteria/StudentFacultyRatioTable";

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/otp-form" element={<OtpForm />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Admin Only Routes */}
            <Route path="/dashboard/nba" element={
              <ProtectedRoute requireAdmin>
                <NBA />
              </ProtectedRoute>
            } />

            {/* Protected Criteria Routes */}
            <Route path="/dashboard/:body/:criteriaId" element={
              <ProtectedRoute>
                <Criteria />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/:body/:criteriaId/:subCriteriaId" element={
              <ProtectedRoute>
                <SubCriteria />
              </ProtectedRoute>
            } />

            {/* Protected Specific Criteria Pages */}
            <Route path="/dashboard/nba/criteria4" element={
              <ProtectedRoute>
                <Criteria4NBA />
              </ProtectedRoute>
            } />
            <Route path="dashboard/nba/criteria5" element={
              <ProtectedRoute>
                <Criteria5NBA/>
              </ProtectedRoute>
            } />
            
            {/* Protected Forms */}
            <Route path="/components/forms/StudentDetailsForm" element={
              <ProtectedRoute>
                <StudentDetailsForm />
              </ProtectedRoute>
            } />

            {/* Protected Sub criteria routes */}
            <Route path="/enrollment" element={
              <ProtectedRoute>
                <EnrollmentPage/>
              </ProtectedRoute>
            }/>
            <Route path="/successrate" element={
              <ProtectedRoute>
                <SuccessRatePage/>
              </ProtectedRoute>
            }/>
            <Route path="/academic2ndyear" element={
              <ProtectedRoute>
                <Academic2ndyearPage/>
              </ProtectedRoute>
            }/>
            <Route path="/placement" element={
              <ProtectedRoute>
                <PlacementPage/>
              </ProtectedRoute>
            }/>
            <Route path="/societies" element={
              <ProtectedRoute>
                <SocietiesPage/>
              </ProtectedRoute>
            }/>
            <Route path="/magazine" element={
              <ProtectedRoute>
                <MagazinePage/>
              </ProtectedRoute>
            }/>
            <Route path="/achievements" element={
              <ProtectedRoute>
                <AchievementsPage/>
              </ProtectedRoute>
            }/>
            <Route path="/studnetfacultyratio" element={
              <ProtectedRoute>
                <StudentFacultyRatioTable/>
              </ProtectedRoute>
            }/>

            {/* Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </ApiProvider>
  </QueryClientProvider>
);

export default App;
