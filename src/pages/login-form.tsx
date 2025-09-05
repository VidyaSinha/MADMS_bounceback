import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { useApi } from "@/contexts/ApiContext";
import { supabase } from "./supabaseClient"; // ✅ cleaner relative import

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { apiBaseUrl } = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const role = new URLSearchParams(location.search).get("role") || "User";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Google login handler
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      console.error("Google login error:", error.message);
      alert("Google sign-in failed. Please try again.");
    }
  };

  // ✅ Email/password submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("OTP sent to your email!");
        navigate(`/otp-form?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          alert("Network error: Cannot connect to the server. Try again later.");
        } else if (error.response.status === 401) {
          alert("Invalid email or password!");
        } else if (error.response.status === 429) {
          alert("Too many attempts. Please wait before trying again.");
        } else {
          alert(
            `Server error: ${
              error.response?.data?.message || "Please try again later."
            }`
          );
        }
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "#A9B7B8" }}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card
            style={{
              backgroundColor: "#2E4054",
              color: "#ffffff",
              width: "300px",
            }}
          >
            <CardHeader className="text-center flex flex-col items-center">
              <CardTitle className="text-2xl" style={{ color: "#ffffff" }}>
                Login
              </CardTitle>
              <CardDescription style={{ color: "#ffffff" }}>
                Enter your email below to login to your account {role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email" style={{ color: "#ffffff" }}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ backgroundColor: "#ffffff", color: "#2E4054" }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" style={{ color: "#ffffff" }}>
                        Password
                      </Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        style={{ color: "#ffffff" }}
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ backgroundColor: "#ffffff", color: "#2E4054" }}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-3/4 mx-auto"
                    style={{ backgroundColor: "#ffffff", color: "#2E4054" }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Login"}
                  </Button>

                  {/* ✅ Google Login Button */}
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-3/4 mx-auto"
                    style={{ backgroundColor: "#ffffff", color: "#2E4054" }}
                  >
                    Continue with Google
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
