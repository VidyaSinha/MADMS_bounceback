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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const location = useLocation();
  const navigate = useNavigate();
  const role = new URLSearchParams(location.search).get("role") || "User";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("OTP sent to your email!");
        navigate(`/otp-form?email=${encodeURIComponent(email)}`); // Redirect to OTP verification page
      }
    } catch (error) {
      alert("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card
          style={{
            backgroundColor: "#2E4053",
            color: "#AAB7B8",
            width: "300px",
          }}
        >
          <CardHeader className="text-center flex flex-col items-center">
            <CardTitle className="text-2xl" style={{ color: "#AAB7B8" }}>
              Login
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account {role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" style={{ color: "#AAB7B8" }}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" style={{ color: "#AAB7B8" }}>
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      style={{ color: "#AAB7B8" }}
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
                    style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-3/4 mx-auto"
                  style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
