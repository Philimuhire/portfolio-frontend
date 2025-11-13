import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if token is valid
  const checkAuth = async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(null);
      setIsLoading(false);
      return false;
    }

    try {
      // Validate token by making a test API call to the profile endpoint
      await api.get("/api/users/profile");
      setToken(storedToken);
      setIsLoading(false);
      return true;
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem("token");
      setToken(null);
      setIsLoading(false);
      return false;
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/api/users/login", { email, password });
      const newToken = response.data.token;

      localStorage.setItem("token", newToken);
      setToken(newToken);

      return Promise.resolve();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const value = {
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
