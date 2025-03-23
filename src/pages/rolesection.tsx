import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-white">
      <h1 className="text-2xl font-bold text-center text-madms-charcoal">
        Choose Your Role
      </h1>
      <div className="flex gap-6">
        <Button
          className="px-6 py-3 hover:bg-madms-charcoal/90"
          style={{ backgroundColor: "#2E4053", color: "white" }} 
          onClick={() => navigate("/login?role=guest")}
        >
          Guest
        </Button>
        <Button
          className="px-6 py-3 hover:bg-madms-charcoal/90"
          style={{ backgroundColor: "#2E4053", color: "white" }} 
          onClick={() => navigate("/login?role=admin")}
        >
          Admin
        </Button>
      </div>
    </div>
  );
}