"use client";
import Image from "next/image";
import Link from "next/link";

const ShoppingSection = () => {
  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-12 px-6 md:px-20 md:-ml-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            Your Favorite{" "}
            <span className="text-blue-600 dark:text-green-400">Food</span> Delivered Fast
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Craving something delicious? Explore our curated food selection featuring fresh meals,
            tasty snacks, and mouth-watering shawarmas – all delivered to your door. Fast, fresh,
            and full of flavor.
          </p>
          <Link href="/mealcard">
            <button className="bg-blue-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Order Now
            </button>
          </Link>
        </div>

        <div className="flex justify-center md:ml-60">
          <Image
            src="https://i.postimg.cc/bv0TMvrZ/side-view-shawarma-with-fried-potatoes-board-cookware.jpg"
            alt="Delicious Shawarma"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ShoppingSection;
