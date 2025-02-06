import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LogInForm from "./components/LogInForm";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";


function App() {
 const {  token } = useAuth();

 return (
  <div className="w-screen bg-gray-700 h-[85vh] flex justify-center items-center">
   <Routes>
    {!token ? (
     <>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LogInForm />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
     </>
    ): (
     <>
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
     </>
    )}
   </Routes>
  </div>
 );
}

export default App;
