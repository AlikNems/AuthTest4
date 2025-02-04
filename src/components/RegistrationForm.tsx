import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/api/api";

const formSchema = z
 .object({
  email: z.string().email(),
  password: z.string().min(6),
  copyPassword: z.string().min(6),
 })
 .refine((data) => data.password === data.copyPassword, {
  message: "Пароли не совпадают",
  path: ["copyPassword"],
 });

function RegistrationForm() {
 const { login } = useAuth(); // Берем login из контекста
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "", password: "", copyPassword: "" },
 });

 const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setLoading(true);
  setError("");

  try {
   await registerUser(data.email, data.password);
   await login(data.email, data.password);
  } catch (err: any) {
   setError(err.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <form onSubmit={form.handleSubmit(onSubmit)}>
   <input {...form.register("email")} placeholder="Email" />
   <input {...form.register("password")} type="password" placeholder="Пароль" />
   <input
    {...form.register("copyPassword")}
    type="password"
    placeholder="Повторите пароль"
   />
   {error && <p>{error}</p>}
   <button type="submit" disabled={loading}>
    Регистрация
   </button>
  </form>
 );
}

export default RegistrationForm;
