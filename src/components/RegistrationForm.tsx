import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { registerUser } from "@/api/api";
import { useSlideIn } from "@/hooks/cssHooks/cardHooks/useSlideIn";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    copyPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.copyPassword, {
    message: "Passwords do not match",
    path: ["copyPassword"],
  });

function RegistrationForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();
  const { isVisible } = useSlideIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", copyPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    try {
      await registerUser(data.email, data.password);
      await login(data.email, data.password);
      setIsFadingOut(true); // Запускаем анимацию исчезновения

      setTimeout(() => {
        navigate("/profile"); // Переход после завершения анимации
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    setIsFadingOut(true);

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-700">
      <div className={`card2 ${isVisible ? "visible" : ""} ${isFadingOut ? "fade-out" : ""}`}>
        <h2 className="text-3xl font-semibold text-center mb-8">Sign Up</h2>
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
          <div>
            <input
              {...register("copyPassword")}
              type="password"
              placeholder="Confirm password"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.copyPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.copyPassword && <p className="text-red-500 text-sm">{errors.copyPassword.message}</p>}
          </div>
          {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
          <Button variant="secondary" size="lg" type="submit" disabled={loading} className="custom-button">
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-2 text-center flex flex-col items-center justify-center">
          <span>Already have an account?</span>
          <Button variant="secondary" size="sm" className="secondary-custom-button" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
