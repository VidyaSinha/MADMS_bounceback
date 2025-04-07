import axios from "axios";

const API_URL = "/api";

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const verifyOTP = async (email: string, otp: string) => {
  return await axios.post(`${API_URL}/auth/verify-otp`, { email, otp }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
