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
      const response = await axios.post("https://madms-bounceback-backend.onrender.com/auth/verify-otp", {
        email,
        otp
      }, {
        withCredentials: true  // ✅ Must be set!
      });
      
      
      if (response.data.success) {
        localStorage.setItem("session", JSON.stringify({ email, token: response.data.token }));
        alert("OTP verified successfully!");
        navigate("/dashboard");
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
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#A9B7B8" }}>
      <div className="p-8 rounded-2xl shadow-lg w-96" style={{ backgroundColor: "#2E4054", color: "#A9B7B8" }}>
        <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "#ffffff" }}>
          OTP Verification
        </h2>
        <p className="text-sm text-center mb-6" style={{ color: "#ffffff" }}>
          Enter the OTP sent to <span style={{ color: "#ffffff" }}>{email}</span>
        </p>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full"
          style={{
            backgroundColor: "#ffffff",
            color: "#2f4883",
            border: "none",
            outline: "none",
          }}
        />
        <Button
          onClick={handleOtpSubmit}
          disabled={loading}
          className="w-full mt-4 font-semibold py-2 rounded-lg"
          style={{
            backgroundColor: "#ffffff",
            color: "#2f4883",
          }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
}
