"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/AuthService";
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

  const { setIsLoading } = useUser();
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
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
      <div className="border-2 border-gray-300 bg-white shadow-lg rounded-xl max-w-lg w-full p-6 backdrop-blur-md bg-opacity-90">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Register</h1>
          <p className="text-gray-600 text-sm">Create an account to get started.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} className="rounded-lg" />
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
                      <Input placeholder="Enter your email" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} className="rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} className="rounded-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-5 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account? 
          <Link href="/login" className="text-primary font-semibold hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
