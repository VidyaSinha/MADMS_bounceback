import { LoginForm } from "./pages/login-form"

export default function App() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" 
    style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}>
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-6">
        <h1 className="text-3xl font-bold text-[#2E4053]  text-center mb-10">
          Marwadi Accreditation and Data Management System
        </h1>
        <LoginForm />
      </div>
    </div>  
  )
}

// import { LoginForm } from "../pages/login-form"

// export default function App() {
//   return (
//     <div 
//       className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
//       style={{ backgroundColor: "#AAB7B8", color: "#2E4053" }}
//     >
      
//       <div className="w-full max-w-sm">
//         <LoginForm />
//       </div>
//     </div>
//   )
// }
