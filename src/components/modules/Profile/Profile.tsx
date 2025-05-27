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
import { Button } from "@/components/ui/button";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, MapPin, Phone, Eye, EyeOff } from "lucide-react";

import { useState as useLocalState } from "react";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters greater than 3" })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address is required" })
    .max(100, { message: "Address must be less than 100 characters greater than 3" })
    .optional(),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^\d+$/, { message: "Phone number must be numeric" })
    .optional(),
  password: z.string().min(6).max(50).optional(),
});

const ProfilePageUpdate = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [showPassword, setShowPassword] = useLocalState(false);

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
      phone_number: userData?.data?.phone_number || "",
      password: "",
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
      toast.error("Failed to update profile!");
      console.error(err);
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="dark:bg-gray-800 shadow-lg rounded-lg p-6 lg:mb-10 w-full max-w-md transition-colors duration-300">
            <h1 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
              Update Profile
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <User size={18} />
                        Name
                      </FormLabel>
                      <FormControl>
                        <input
                          className="w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <MapPin size={18} />
                        Address
                      </FormLabel>
                      <FormControl>
                        <input
                          className="w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Phone size={18} />
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <input
                          type="tel"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-3 text-gray-500 dark:text-gray-400"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 dark:text-red-400" />
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
            <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg transition-colors duration-300">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Current Profile Info</h2>
              <p className="text-gray-800 dark:text-gray-200"><strong>Name:</strong> {userData?.data?.name}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Email:</strong> {userData?.data?.email}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Phone Number:</strong> {userData?.data?.phone_number}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Address:</strong> {userData?.data?.address}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-gray-900 dark:text-gray-100">User is not logged in</h1>
      )}
    </div>
  );
};

export default ProfilePageUpdate;
