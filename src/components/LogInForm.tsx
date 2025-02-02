import {
 Form,
 FormField,
 FormItem,
 FormControl,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/api/auth"; // Импортируем функцию логина

const LogInForm = () => {
 const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
   .string()
   .min(6, { message: "Password must be at least 6 characters long." }),
 });

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: "",
   password: "",
  },
 });

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setLoading(true);
  setError("");

  try {
   const response = await loginUser(data.email, data.password);
   localStorage.setItem("token", response.token);
   alert("Логин успешен!");

  } catch (err: any) {
   setError(err.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-8">
    <Form {...form} >
     {" "}

     <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
       <FormItem>
        <FormControl>
         <Input placeholder="Email" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
       <FormItem>
        <FormControl>
         <Input type="password" placeholder="Password" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     {error && <p className="text-red-500">{error}</p>}{" "}

     <Button type="submit" disabled={loading}>
      {loading ? "Загрузка..." : "Log In"}
     </Button>
    </Form>
   </form>
  </div>
 );
};

export default LogInForm;
