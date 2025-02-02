import "@/styles/index.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
 FormControl,
 FormField,
 FormItem,
 FormMessage,
 Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Убедись, что путь правильный

const formSchema = z
 .object({
  email: z.string().email({
   message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
   message: "Password must be at least 6 characters long.",
  }),
  copyPassword: z.string().min(6, {
   message: "Password confirmation must be at least 6 characters long.",
  }),
 })
 .refine((data) => data.password === data.copyPassword, {
  message: "Passwords don't match",
  path: ["copyPassword"],
 });

function RegistrationForm() {
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   email: "",
   password: "",
   copyPassword: "",
  },
 });

 const onSubmit = (data: z.infer<typeof formSchema>) => {
  console.log("Form submitted:", data);
 };

 return (
  <div>
   {/* Оборачиваем форму в настоящий <form> */}
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Form {...form}>
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

     <FormField
      control={form.control}
      name="copyPassword"
      render={({ field }) => (
       <FormItem>
        <FormControl>
         <Input type="password" placeholder="Copy Password" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
    </Form>

    {/* Кнопка отправки формы */}
    <Button type="submit">Register</Button>
   </form>
  </div>
 );
}

export default RegistrationForm;
