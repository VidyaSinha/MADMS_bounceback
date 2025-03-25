import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";

export function OtpForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/verify-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        alert("OTP verified successfully!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        alert("Invalid OTP!");
      }
    } catch (error) {
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Enter OTP</h2>
      <Input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button onClick={handleOtpSubmit} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </div>
  );
}
