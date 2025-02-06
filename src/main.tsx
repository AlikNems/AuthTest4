import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@/styles/custom-styles/buttons/custom-button.css'
import '@/styles/custom-styles/buttons/secondary-custom-button.css'
import '@/styles/custom-styles/cards/card1.css'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(

 <StrictMode>
    <QueryClientProvider client={queryClient}>
  <BrowserRouter>
   <AuthProvider>
    <Header />
    <App />
    <Footer />
   </AuthProvider>
  </BrowserRouter>
  </QueryClientProvider>
 </StrictMode>
);
