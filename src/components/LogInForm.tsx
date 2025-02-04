import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
 email: z.string().email(),
 password: z.string().min(6),
});

function LogInForm() {
 const { login } = useAuth();
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "", password: "" },
 });

 const onSubmit = async (data: z.infer<typeof formSchema>) => {
  try {
   await login(data.email, data.password);
  } catch (error: any) {
   console.error(error.message);
  }
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <input {...register("email")} placeholder="Email" />
   {errors.email && <p>{errors.email.message}</p>}
   <input {...register("password")} type="password" placeholder="Пароль" />
   {errors.password && <p>{errors.password.message}</p>}
   <button type="submit">Войти</button>
  </form>
 );
}

export default LogInForm;
