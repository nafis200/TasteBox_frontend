"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { CheckCircle, Star, Utensils, Info, ShoppingCart } from "lucide-react";

const SingleMeal = ({ result }: { result: any }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct(result));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-10">
      <section className="text-center">
        <Image
          src={result.image}
          alt={result.name}
          width={600}
          height={400}
          className="w-full max-h-[400px] object-contain rounded-lg mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-blue-600 mb-1">{result.name}</h2>
        <p className="text-muted-foreground text-sm">
          Cuisine: {result.cuisine}
        </p>
      </section>

    
      <section className="p-4 sm:p-6 rounded-lg shadow-md space-y-4 dark:bg-gray-900">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground">
          <Info className="text-blue-600" /> Meal Details
        </h3>
        <p className="text-muted-foreground">
          {result.details
            ? result.details
            : `Enjoy a delicious ${
                result.name
              }, a flavorful ${result.cuisine?.toLowerCase()} dish served in a satisfying ${
                result.portion_size
              } portion. 
       Made with fresh ingredients like ${result.ingredient
         ?.slice(0, 3)
         ?.join(", ")}, it's a perfect meal for any time of day.`}
        </p>

        <div className="flex flex-wrap gap-4">
          <div>
            <h4 className="font-medium">Portion Size:</h4>
            <p className="text-muted-foreground capitalize">
              {result.portion_size}
            </p>
          </div>

          <div>
            <h4 className="font-medium">Price:</h4>
            <p className="text-blue-600 font-semibold">৳ {result.price}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-1">Availability:</h4>
          <p className="flex items-center text-green-600 gap-1">
            <CheckCircle className="w-4 h-4" /> Available
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-primary/80"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </section>

      <section className="p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-900">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground mb-2">
          <Star className="text-yellow-400" /> User Rating
        </h3>
        <p className="text-muted-foreground flex items-center gap-2">
          <span className="text-yellow-400 font-bold">{result.rating} / 5</span>
        </p>
      </section>

      <section className="p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-900">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground mb-2">
          <Utensils className="text-green-500" /> Ingredients
        </h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {result.ingredient?.map((item: string, idx: number) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-900">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Dietary Preferences
        </h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {result.dietary_preferences?.map((item: string, idx: number) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="p-4 sm:p-6 rounded-lg shadow-md dark:bg-gray-900">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Suggested Meals
        </h3>
        <p className="text-muted-foreground">
          Similar meals from <strong>{result.cuisine}</strong> cuisine will be
          listed here.
        </p>
      </section>
    </div>
  );
};

export default SingleMeal;
