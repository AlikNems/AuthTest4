import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

function LogInForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            disabled={loading}
            className="text-xl w-full mt-4 bg-gray-600 hover:bg-gray-500 hover:scale-105 transition-colors transition-transform duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="mt-2 text-center flex flex-col items-center justify-center">
          <span>Don't have an account?</span>
          <Link to="/register">
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 text-lg w-[20vw] h-[5vh] bg-gray-600 hover:bg-gray-500 hover:scale-105 transition-colors transition-transform duration-300"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
