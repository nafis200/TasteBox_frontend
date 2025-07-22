"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Clock, Utensils, Truck } from "lucide-react";

const images = [
  "https://i.postimg.cc/y6nynJc1/01.jpg",
  "https://i.postimg.cc/xC5Ms7kx/02.jpg",
  "https://i.postimg.cc/rw4W6z0t/03-2.png",
  "https://i.postimg.cc/gcB6n33Z/04.jpg",
];

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full lg:h-[500px] md:h-[400px] h-[300px]"
          >
            <Image
              src={src}
              alt={`Banner Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        ))}
      </Carousel>
      <section className="text-center p-8 bg-gray-100 dark:bg-black dark:text-white">
        <h2 className="text-3xl font-bold text-blue-600 dark:bg-black dark:text-white">
          Why Choose Meal Box?
        </h2>
        <p className="mt-4 text-gray-700 text-lg dark:bg-black dark:text-white">
          Meal Box is your personalized meal planning & delivery service,
          designed to make your life easier with fresh, healthy, and
          customizable meals delivered to your doorstep.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-blue-200 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03]">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-7 h-7 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-blue-900 dark:text-white">
                Personalized Scheduling
              </h3>
            </div>
            <p className="text-blue-800 dark:text-gray-300 leading-relaxed">
              Choose your preferred delivery time and meal plan according to
              your routine.
            </p>
          </div>

          <div className="group p-6 bg-gradient-to-br from-green-100 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-green-200 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03]">
            <div className="flex items-center gap-4 mb-4">
              <Utensils className="w-7 h-7 text-green-700 dark:text-green-400 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-green-900 dark:text-white">
                Customizable Meals
              </h3>
            </div>
            <p className="text-green-800 dark:text-gray-300 leading-relaxed">
              Select ingredients and meal types based on your dietary
              preferences.
            </p>
          </div>

          <div className="group p-6 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-purple-200 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03]">
            <div className="flex items-center gap-4 mb-4">
              <Truck className="w-7 h-7 text-purple-700 dark:text-purple-400 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-purple-900 dark:text-white">
                Fast & Reliable Delivery
              </h3>
            </div>
            <p className="text-purple-800 dark:text-gray-300 leading-relaxed">
              Enjoy fresh and hot meals delivered on time, every time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
