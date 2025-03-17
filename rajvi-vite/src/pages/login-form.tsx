import React from "react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card style={{ backgroundColor: "#2E4053", color: "#AAB7B8", width: "300px" }}>
        <CardHeader className="text-center flex flex-col items-center">
          <CardTitle className="text-2xl" style={{ color: "#AAB7B8" }}>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" style={{ color: "#AAB7B8" }}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" style={{ color: "#AAB7B8" }}>Password</Label>
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
                  required 
                  style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
                />
              </div>
              <Button type="submit" className="w-3/4 mx-auto" style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}>
                Login
              </Button>
              {/* <Button variant="outline" className="w-full" style={{ borderColor: "#AAB7B8", color: "#AAB7B8" }}>
                Login with Google
              </Button> */}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4" style={{ color: "#AAB7B8" }}>
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}