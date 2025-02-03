import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProfile, loginUser } from "@/api/auth";

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  token: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) return;

      try {
        const userData = await getProfile(token);
        setUser(userData);
      } catch {
        logout();
      }
    };

    checkAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      setToken(response.token);
      localStorage.setItem("token", response.token);

      const userData = await getProfile(response.token);
      setUser(userData);
    } catch {
      logout();
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен быть использован внутри AuthProvider");
  }
  return context;
};
