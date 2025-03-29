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
        // Store session token in localStorage
        localStorage.setItem("session", JSON.stringify({ email, token: response.data.token }));
  
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
    <div className="flex justify-center items-center min-h-screen 2E4053">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-white-400">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the OTP sent to <span className="text-teal-300">{email}</span>
        </p>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-gray-700 text-white border-none focus:ring-2 focus:ring-teal-500"
        />
        <Button
          onClick={handleOtpSubmit}
          disabled={loading}
          className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  );
}
