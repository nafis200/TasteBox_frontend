"use client"


import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginUser } from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

const LoginForm = () => {
  const formSchema = z.object({
    email: z.string().min(5, {
      message: "Enter a valid email or phone number.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center" 
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/abstract-textured-backgound_1258-30484.jpg?t=st=1740852113~exp=1740855713~hmac=3664be79b4588f692d3cc44508da2613a9183efd32bf20f521420951441af953&w=900')" }}
    >
      <div className="border-2 border-gray-300 bg-white shadow-lg rounded-xl max-w-md w-full p-6 backdrop-blur-md bg-opacity-90">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-gray-600 text-sm">Welcome back! Please login to your account.</p>
        </div>
        
        <Form {...form}>
          {/* Suspense Boundary added here */}
       
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email or phone" {...field} className="rounded-lg" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-5 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
        </Form>
        
        <p className="text-sm text-gray-600 text-center mt-4">
          Don&#39;t have an account? 
          <Link href="/register" className="text-primary font-semibold hover:underline"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
