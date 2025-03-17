import { LoginForm } from "../pages/login-form"

export default function App() {
  return (
    <div 
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
      style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
    >
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
