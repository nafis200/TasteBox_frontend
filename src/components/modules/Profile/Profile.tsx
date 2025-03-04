/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getAllUsers, UpdateUser } from "@/services/AuthService";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"; 

const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters greater than 3" }).optional(),
  address: z
    .string()
    .min(3, { message: "Address is required" })
    .max(100, { message: "Address must be less than 100 characters greater than 3" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must be numeric" }).optional(),
});

const ProfilePageUpdate = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getAllUsers(user?.jwtPayload?.email);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.data?.name || "",
      address: userData?.data?.address || "",
      phone: userData?.data?.phone_number || "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    try {
      if (userData?.data?._id) {
        await UpdateUser(formData, userData?.data?._id);
        const updatedData = await getAllUsers(user?.jwtPayload?.email || " ");
        setUserData(updatedData);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Unable to update profile. User ID missing.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 lg:mb-10 w-full max-w-md">
              <h1 className="text-xl font-semibold text-center mb-4">Update Profile</h1>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="rounded-lg"
                          />
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
                          <Input
                            placeholder="Enter your address"
                            {...field}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            {...field}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Update Profile
                  </Button>
                </form>
              </Form>
              <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-lg">
                <h2 className="font-semibold text-lg">Current Profile Info</h2>
                <p><strong>Name:</strong> {userData?.data?.name}</p>
                <p><strong>Email:</strong> {userData?.data?.email}</p>
                <p><strong>Phone Number:</strong> {userData?.data?.phone_number}</p>
                <p><strong>Address:</strong> {userData?.data?.address}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center">User is not logged in</h1>
      )}
    </div>
  );
};

export default ProfilePageUpdate;
