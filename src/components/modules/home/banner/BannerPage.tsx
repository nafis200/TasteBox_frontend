
"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const images = [
  "https://i.postimg.cc/y6nynJc1/01.jpg",
  "https://i.postimg.cc/xC5Ms7kx/02.jpg",
  "https://i.postimg.cc/rw4W6z0t/03-2.png",
  "https://i.postimg.cc/gcB6n33Z/04.jpg"
];

const Banner = () => {
  return (
    <div>
      {/* Banner Carousel */}
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-[600px]">
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
      <section className="text-center p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-blue-600">Why Choose Meal Box?</h2>
        <p className="mt-4 text-gray-700 text-lg">
          Meal Box is your personalized meal planning & delivery service, designed to make your life easier with fresh, healthy, and customizable meals delivered to your doorstep.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold"> Personalized Scheduling</h3>
            <p className="mt-2 text-gray-600">
              Choose your preferred delivery time and meal plan according to your routine.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold"> Customizable Meals</h3>
            <p className="mt-2 text-gray-600">
              Select ingredients and meal types based on your dietary preferences.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold"> Fast & Reliable Delivery</h3>
            <p className="mt-2 text-gray-600">
              Enjoy fresh and hot meals delivered on time, every time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
