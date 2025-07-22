/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent } from "@/components/ui/card";
import { getAllMeals } from "@/services/getAllmeal";
import Image from "next/image";
import Rating from "../Rating/Rating";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const MealCard = async () => {
  const { data } = await getAllMeals();

  return (
    <section className="p-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-blue-700 dark:text-white text-center mb-4">
        Savor the Taste of Our Delicious Meals
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
        Discover a carefully curated selection of mouthwatering dishes, designed
        to satisfy every craving. From hearty meals to light bites, each one is
        made with love and the freshest ingredients. Order now and indulge in a
        world of flavors!
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.result.slice(0, 8).map((meal: any) => (
          <Card
            key={meal._id}
            className="group w-full max-w-xs p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer flex flex-col justify-between"
          >
            <div className="overflow-hidden rounded-md">
              <Image
                src={meal.image}
                alt={meal.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>

            <CardContent className="pt-4 flex flex-col gap-2 flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {meal.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">{meal.cuisine}</p>

              <div className="flex items-center mt-1">
                <Rating rating={meal?.rating} />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {meal.rating}
                </span>
              </div>

              <p className="mt-2 text-gray-800 dark:text-white font-semibold">
                ${meal.price.toFixed(2)}
              </p>

              <Link
                href={`/mealcard/${meal._id}`}
                className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Product Detail <FaArrowRight />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MealCard;
