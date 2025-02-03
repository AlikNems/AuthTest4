import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider } from "@/context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider> 
      <Header />
      <App />
      <Footer />
    </AuthProvider>
  </StrictMode>
);
