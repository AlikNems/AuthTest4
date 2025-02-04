import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LogInForm() {
  const { login } = useAuth(); // Берем login из контекста
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    try {
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
      {error && <p>{error}</p>}
      <button type="submit" disabled={loading}>Войти</button>
    </form>
  );
}

export default LogInForm;
