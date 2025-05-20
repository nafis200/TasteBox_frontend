"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addProduct,
  orderedProductsSelector,
} from "@/redux/features/cartSlice";
import Link from "next/link";

const SingleMeal = ({ result }: { result: any }) => {
  const productsNO = useAppSelector(orderedProductsSelector);
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct(result));
  };

  return (
    <div className="w-full px-4 py-6 md:px-10 max-w-6xl mx-auto">
      <div className="flex justify-end mb-6">
        <Link href="/cart">
          <Button
            className={`relative px-4 py-2 rounded-md transition ${
              !productsNO.length
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={!productsNO.length}
          >
            Go to Payment
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {productsNO.length}
            </span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
   
        <div className="w-full h-full">
          <Image
            src={result.image}
            alt={result.name}
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{result.name}</h1>
              <p className="text-sm text-gray-500">Cuisine: {result.cuisine}</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">Ingredients</h2>
              <p className="text-gray-600">{result.ingredient?.join(", ")}</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">Dietary Preferences</h2>
              <p className="text-gray-600">
                {result.dietary_preferences?.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <h2 className="font-semibold text-gray-700">Portion Size</h2>
                <p className="text-gray-600 capitalize">
                  {result.portion_size}
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-gray-700">Rating</h2>
                <p className="text-gray-800">{result.rating} / 5</p>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-gray-700">Price</h2>
              <p className="text-2xl font-bold text-blue-600">
                ${result.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <Button
              onClick={handleAddProduct}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMeal;
