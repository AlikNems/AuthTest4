import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


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
