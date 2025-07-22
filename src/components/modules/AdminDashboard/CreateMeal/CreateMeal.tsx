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
import { CreateMealMenu } from "@/services/MealMenu";

const CreateMeal = () => {
  const formSchema = z.object({
    name: z.string().min(3, { message: "Meal name is required." }),
    cuisine: z.string().min(2, { message: "Cuisine type is required." }),
    image: z.string().url({ message: "Enter a valid image URL." }),
    dietary_preferences: z.string().optional(),
    ingredient: z
      .string()
      .min(1, { message: "At least one ingredient is required." }),
    rating: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0 && val <= 5, {
        message: "Rating must be between 0 and 5.",
      }),
    price: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Price must be positive.",
      }),
    availability: z.boolean(),
    portion_size: z.string().min(3, { message: "Portion size is required." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Chicken and Walnut Salad",
      cuisine: "salad",
      image:
        "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg",
      dietary_preferences:
        "pork belly, gratin potato, braised cabbage, gluten-free",
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formattedData = {
        ...data,
        dietary_preferences: data.dietary_preferences
          .split(",")
          .map((item: string) => item.trim()),
        ingredient: data.ingredient
          .split(",")
          .map((item: string) => item.trim()),
      };

      const res = await CreateMealMenu(formattedData);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-foreground">
  <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700 shadow-2xl rounded-2xl max-w-2xl lg:max-w-7xl w-full p-8 transition-all duration-300">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white drop-shadow-sm">Add Meal</h1>
      <p className="text-muted-foreground text-sm">Fill out the details below to add a meal.</p>
    </div>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meal Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter meal name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Cuisine */}
          <FormField
            control={form.control}
            name="cuisine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuisine</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cuisine type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image URL */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Portion Size */}
          <FormField
            control={form.control}
            name="portion_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portion Size</FormLabel>
                <FormControl>
                  <Input placeholder="Enter portion size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ingredients */}
        <FormField
          control={form.control}
          name="ingredient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients (comma separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter ingredients" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dietary Preferences */}
        <FormField
          control={form.control}
          name="dietary_preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preferences (comma separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter dietary preferences" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="5"
                    placeholder="Enter rating"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Availability */}
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  id="available"
                  className="mt-1"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="available">Available</FormLabel>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Meal"}
        </Button>
      </form>
    </Form>
  </div>
</div>

  );
};

export default CreateMeal;
