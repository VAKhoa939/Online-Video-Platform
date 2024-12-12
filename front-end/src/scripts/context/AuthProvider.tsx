import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/user";
import axios from "axios";
import { toast } from "react-toastify";

export interface Auth {
  email: string | null;
  user: User | null;
}

export interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({} as Auth);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("You are not logged in");
      return;
    }
    setAuth((prev) => ({ ...prev, email }));

    const fetchUser = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth`);
        const { data } = res.data;
        setAuth((prev) => ({ ...prev, user: data as User }));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { message } = error.response.data;
          toast.error(message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
