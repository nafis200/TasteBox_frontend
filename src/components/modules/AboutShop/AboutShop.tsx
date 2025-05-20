import Image from "next/image";

const AboutMealShop = () => {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
        <div>
          <Image
            src="https://i.postimg.cc/y6nynJc1/01.jpg"
            alt="Meal Shop"
            width={800}
            height={500}
            className="rounded-xl w-full h-auto shadow-md"
          />
        </div>

      
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome to Our Meal Shop
          </h2>
          <p className="text-lg text-gray-600">
            At our Meal Shop, we bring you a delightful culinary experience
            filled with authentic flavors and premium ingredients. Whether
            you&apos;re craving something savory or sweet, our carefully prepared
            meals are designed to satisfy every palate.
          </p>
          <p className="text-lg text-gray-600">
            We believe in freshness, quality, and love in every bite. From
            traditional favorites to exciting new dishes, we aim to make your
            every mealtime special.
          </p>
          <p className="text-base font-medium text-blue-600">
            🍴 Eat well. Live well. Shop with us today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMealShop;
