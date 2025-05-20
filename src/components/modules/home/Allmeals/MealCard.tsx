
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
    <section className="p-8 bg-gray-100">
      <h2 className="text-4xl font-bold text-blue-700 text-center mb-4">
        Savor the Taste of Our Delicious Meals
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        Discover a carefully curated selection of mouthwatering dishes, designed
        to satisfy every craving. From hearty meals to light bites, each one is
        made with love and the freshest ingredients. Order now and indulge in a
        world of flavors!
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.result.slice(0, 8).map((meal: any) => (
          <Card
            key={meal._id}
            className="w-full max-w-xs p-4 bg-white shadow-md rounded-lg transition-all hover:shadow-xl flex flex-col justify-between"
          >
            <Image
              src={meal.image}
              alt={meal.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <CardContent className="pt-4 flex flex-col gap-2 flex-grow">
              <h3 className="text-xl font-semibold text-gray-800">
                {meal.name}
              </h3>
              <p className="text-gray-500">{meal.cuisine}</p>
              <div className="flex items-center mt-1">
                <Rating rating={meal?.rating} />
                <span className="ml-2 text-sm text-gray-600">
                  {meal.rating}
                </span>
              </div>
              <p className="mt-2 text-gray-800 font-semibold">
                ${meal.price.toFixed(2)}
              </p>
              <Link
                href={`/mealcard/${meal._id}`}
                className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all"
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
