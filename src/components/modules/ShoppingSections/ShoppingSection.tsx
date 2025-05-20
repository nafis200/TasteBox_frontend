"use client";
import Image from "next/image";

const ShoppingSection = () => {
  return (
    <section className="bg-gray-100  md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Your One-Stop <span className="text-blue-600">Shopping</span> Destination
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Discover an unbeatable selection of the latest products at amazing prices.
            Shop with ease, speed, and confidence – all from the comfort of your home.
            From fashion to gadgets, we have it all.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Start Shopping
          </button>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://i.postimg.cc/K8Jy5GG4/shopping.png"
            alt="Shopping Banner"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ShoppingSection;
