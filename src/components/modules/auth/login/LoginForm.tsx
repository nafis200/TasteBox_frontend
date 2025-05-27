"use client";

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
import { Mail, Lock } from "lucide-react";

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

  const AdminCredentials = async () => {
    const data = {
      email: "admin@gmail.com",
      password: "123456",
    };
    const res = await loginUser(data);
    setIsLoading(true);
    if (res?.success) {
      toast.success(res?.message);
      router.push(redirect || "/");
    } else {
      toast.error(res?.message);
    }
  };

  const UserCredentials = async () => {
    const data = {
      email: "nafis@gmail.com",
      password: "123456",
    };
    const res = await loginUser(data);
    setIsLoading(true);
    if (res?.success) {
      toast.success(res?.message);
      router.push(redirect || "/");
    } else {
      toast.error(res?.message);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push(redirect || "/");
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
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://i.postimg.cc/rF5fBgKn/04-2.jpg')",
      }}
    >
      <div className="border border-white/20 shadow-xl rounded-xl max-w-md w-full p-6 backdrop-blur-md bg-white/10 dark:bg-white/10 text-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-white/80">
            Welcome back! Please login to your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
                      <Input
                        {...field}
                        placeholder="Enter your email or phone"
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white/90 placeholder:text-white/50 border border-white/30 focus:ring-2 focus:ring-primary"
                      />
                    </div>
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
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white/90 placeholder:text-white/50 border border-white/30 focus:ring-2 focus:ring-primary"
                      />
                    </div>
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

        <div className="mt-4 flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={AdminCredentials}
            className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
          >
            Login as Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={UserCredentials}
            className="w-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
          >
            Login as User
          </Button>
        </div>

        <p className="text-sm text-white/80 text-center mt-4">
          Don&#39;t have an account?
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
