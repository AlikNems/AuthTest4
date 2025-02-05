import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button"; // Assuming you're using a custom button component
import { Link } from "react-router-dom"; // Для перехода между страницами

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LogInForm() {
  const { login } = useAuth();
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
    <div className="w-full h-full flex items-center justify-center bg-gray-700">
      <div className="w-[40%] h-[60%] bg-gray-400 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Войти</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...form.register("email")}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              {...form.register("password")}
              type="password"
              placeholder="Пароль"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span>Нет аккаунта? </span>
          <Link to="/register">
            <Button variant="secondary" size="sm">
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
