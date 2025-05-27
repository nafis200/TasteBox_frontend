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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/context/UserContext";
import { getAllUsers } from "@/services/AuthService";
import { useEffect, useState } from "react";
import { CreateCustomerMeaMenu } from "@/services/customerMeal";

const Mealpreference = () => {

const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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


  const formSchema = z.object({
    name: z.string().min(3, { message: "Meal name is required." }),
    cuisine: z.string().min(2, { message: "Cuisine type is required." }),
    image: z.string().url({ message: "Enter a valid image URL." }),
    dietary_preferences: z.string().optional(),
    ingredient: z.string().min(1, { message: "At least one ingredient is required." }),
    availability: z.boolean(),
    portion_size: z.string().min(3, { message: "Portion size is required." }),
    rating: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
      message: "Rating must be between 0 and 5.",
    }),
    price: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0, {
      message: "Price must be positive.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Chicken and Walnut Salad",
      cuisine: "salad",
      image: "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg",
      dietary_preferences: "pork belly, gratin potato, braised cabbage, gluten-free",
      ingredient: "pork belly, gratin potato, braised cabbage",
      rating: 4,
      availability: true,
      portion_size: "medium",
      price: 13.5,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  if(userData === null){
    return <p className="text-center">Loading......</p>
  }


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data)
      const formattedData = {
        ...data,
        author:userData?.data?._id,
        dietary_preferences: data.dietary_preferences.split(",").map((item: string) => item.trim()),
        ingredient: data.ingredient.split(",").map((item: string) => item.trim()),
      };

      

      const res = await CreateCustomerMeaMenu(formattedData);
    
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
    <div className="border-2 border-gray-300 dark:bg-black dark:text-white bg-white shadow-lg rounded-xl max-w-2xl lg:max-w-7xl w-full p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold dark:bg-black dark:text-white">Meal Preference</h1>
        <p className="text-gray-600 text-sm dark:bg-black dark:text-white">Fill out the details below to add a meal.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter meal name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="cuisine" render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cuisine type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="portion_size" render={({ field }) => (
              <FormItem>
                <FormLabel>Portion Size</FormLabel>
                <FormControl>
                  <Input placeholder="Enter portion size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="ingredient" render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients (comma separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter ingredients" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="dietary_preferences" render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preferences (comma separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter dietary preferences" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="rating" render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input type="number" step="1" min="0" max="5" placeholder="Enter rating" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="availability" render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <FormControl>
                <Checkbox className="ml-2 mt-2" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )} />
          <Button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90">
            {isSubmitting ? "Adding..." : "Add Meal"}
          </Button>
        </form>
      </Form>
    </div>
  </div>
  );
};

export default Mealpreference;
