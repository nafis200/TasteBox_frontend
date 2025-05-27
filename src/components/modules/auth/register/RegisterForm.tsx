"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { registerUser } from "@/services/AuthService";

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
import { Mail, Lock, Phone, MapPin, User } from "lucide-react";

const RegisterForm = () => {
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    phone_number: z.string().min(10, { message: "Enter a valid phone number." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Registration failed.");
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
          <h1 className="text-2xl font-semibold">Register</h1>
          <p className="text-sm text-white/80">
            Create an account to get started.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
                      <Input
                        {...field}
                        placeholder="Enter your name"
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/50 border border-white/30"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/50 border border-white/30"
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
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/50 border border-white/30"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
                      <Input
                        {...field}
                        placeholder="Enter your phone number"
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/50 border border-white/30"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/80" />
                      <Input
                        {...field}
                        placeholder="Enter your address"
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/50 border border-white/30"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-white/70 text-center mt-4">
          Already have an account?
          <Link href="/login" className="text-white underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
