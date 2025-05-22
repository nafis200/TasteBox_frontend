"use client";

import { useForm } from "react-hook-form";
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
import { useDispatch } from "react-redux";
import { clearCart, subTotalSelector } from "@/redux/features/cartSlice";
import { PaymentUser } from "@/services/payment";
import { useAppSelector } from "@/redux/hooks";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const subTotal = useAppSelector(subTotalSelector);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      address: "",
      email: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const paymentDetails = {
      ...data,
      totalPrice: subTotal,
    };

    try {
      const result = await PaymentUser(paymentDetails);

      if (result?.data) {
        toast.success("Redirecting to payment gateway...");
        dispatch(clearCart());
        window.location.href = result.data;
      } else {
        toast.error("Payment initiation failed");
      }
    } catch (error) {
      toast.error("An error occurred during payment");
      console.error(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('https://i.postimg.cc/3w0QH6Kg/03-2.png')",
      }}
    >
      <div className="max-w-md w-full p-6 bg-white/90 shadow-xl rounded-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Payment Details
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                    <Input placeholder="Enter phone number" {...field} />
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
                    <Input placeholder="Enter your address" {...field} />
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
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              {isSubmitting ? "Processing..." : "Proceed to Pay"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
