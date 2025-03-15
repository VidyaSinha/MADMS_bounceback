import { useState } from "react";

export default function LoginPage() {
  const [userType, setUserType] = useState(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!userType ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Select User Type</h2>
          <button
            className="bg-[#2E4053] text-white px-6 py-2 rounded-lg m-2 hover:bg-[#1C2833]"
            onClick={() => setUserType("admin")}
          >
            Admin
          </button>
          <button
            className="bg-[#AAB7B8] text-black px-6 py-2 rounded-lg m-2 hover:bg-[#909A9C]"
            onClick={() => setUserType("guest")}
          >
            Guest
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-[#2E4053] mb-4">Login</h2>
          <p className="text-[#AAB7B8] mb-4">Enter your email below to login to your account</p>
          <label className="block text-[#2E4053] mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 mb-4 border rounded-lg text-black border-gray-300"
            placeholder="m@example.com"
          />
          <div className="flex justify-between items-center">
            <label className="text-[#2E4053]">Password</label>
            <a href="#" className="text-[#AAB7B8] text-sm">Forgot your password?</a>
          </div>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded-lg text-black border-gray-300"
          />
          <button className="w-full bg-[#2E4053] text-white py-2 rounded-lg hover:bg-[#1C2833]">Login</button>
          <button className="w-full bg-[#AAB7B8] text-black py-2 rounded-lg mt-2 hover:bg-[#909A9C]">
            Login with Google
          </button>
          <p className="text-center mt-4 text-[#2E4053]">
            Don't have an account? <a href="#" className="text-[#AAB7B8]">Sign up</a>
          </p>
        </div>
      )}
    </div>
  );
}
