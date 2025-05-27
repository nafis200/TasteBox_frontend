"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
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
import { UpdateMeal } from "@/services/MealMenu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpdatedSingle = ({ Data, id }: { Data: any; id: string }) => {
  const form = useForm({
    defaultValues: {
      name: Data[0]?.name || "",
      cuisine: Data[0]?.cuisine || "",
      image:
        "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-3-370x247.jpg",
      ingredient: Data[0]?.ingredient || " ",
      rating: Data[0]?.rating || 2,
      availability: Data[0]?.availability || true,
      portion_size: Data[0]?.portion_size || "medium",
      price: Data[0]?.price || 13.5,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formattedData = {
        ...data,
        ingredient: data?.ingredient?.split(",").map((item: string) => item.trim()),
      };

      const res = await UpdateMeal(formattedData, id);

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
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="border-2 border-gray-300 bg-white shadow-lg rounded-xl max-w-2xl lg:max-w-7xl w-full p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold dark:text-gray-100">Updated Meal</h1>
          <p className="text-gray-600 text-sm dark:text-gray-300">
            Fill out the details below to add a meal.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Meal Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meal name"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Cuisine</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter cuisine type"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter image URL"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portion_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Portion Size</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter portion size"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="ingredient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Ingredients (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter ingredients"
                      {...field}
                      className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min="0"
                        max="5"
                        placeholder="Enter rating"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Available</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="ml-2 mt-2 dark:ring-offset-gray-900 dark:ring-gray-500"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90"
            >
              {isSubmitting ? "updating..." : "Update Meal"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdatedSingle;
