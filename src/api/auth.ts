import axios from "axios";

const API_URL = "http://127.0.0.1:5000/auth";

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const verifyOtp = async (email: string, otp: string) => {
  return await axios.post(`${API_URL}/verify-otp`, { email, otp });
};
