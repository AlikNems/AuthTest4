import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/api/auth"; 

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
  copyPassword: z.string().min(6, { message: "Password confirmation must be at least 6 characters long." }),
}).refine((data) => data.password === data.copyPassword, {
  message: "Passwords don't match",
  path: ["copyPassword"],
});

function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      copyPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    try {
      const response = await registerUser(data.email, data.password);
      localStorage.setItem("token", response.token);
      alert("Регистрация успешна!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Form {...form}>
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormControl><Input placeholder="Email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormControl><Input type="password" placeholder="Password" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="copyPassword" render={({ field }) => (
            <FormItem>
              <FormControl><Input type="password" placeholder="Copy Password" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </Form>

        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
