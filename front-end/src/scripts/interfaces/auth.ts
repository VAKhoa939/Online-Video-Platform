import axios from "axios";

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  message: string;
}

const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (form: LoginForm): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${AUTH_API_URL}/login`, form);
  return res.data;
};

export const register = async (form: RegisterForm): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${AUTH_API_URL}/register`, form);
  return res.data;
};
