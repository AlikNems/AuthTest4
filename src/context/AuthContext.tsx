import {
 createContext,
 useContext,
 useState,
 useEffect,
 ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, loginUser } from "@/api/auth";

interface User {
 email: string;
 id: string;
}

interface AuthContextType {
 user: User | null;
 token: string | null;
 login: (email: string, password: string) => Promise<void>;
 logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState<string | null>(() =>
  localStorage.getItem("token")
 );
 const navigate = useNavigate();

 useEffect(() => {
  if (token) {
   fetchUserProfile(token);
  }
 }, [token]);

 const fetchUserProfile = async (currentToken: string) => {
  try {
   const userData = await getProfile(currentToken);

   setUser(userData);
  } catch (error) {
   console.error("❌ Error fetching profile:", error);
   logout();
  }
 };

 const login = async (email: string, password: string) => {
  try {
   const response = await loginUser(email, password);

   const receivedToken = response.token;
   if (!receivedToken) {
    throw new Error("No token received from the server.");
   }

   localStorage.setItem("token", receivedToken);
   setToken(receivedToken);

   await fetchUserProfile(receivedToken);
   navigate("/profile");
  } catch (error) {
   console.error("❌ Login error:", error);
   logout();
  }
 };

 const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem("token");
  navigate("/login");
 };

 return (
  <AuthContext.Provider value={{ user, token, login, logout }}>
   {children}
  </AuthContext.Provider>
 );
}

export function useAuth() {
 const context = useContext(AuthContext);
 if (!context) throw new Error("useAuth must be used within an AuthProvider");
 return context;
}
