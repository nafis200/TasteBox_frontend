"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addProduct,
  orderedProductsSelector,
} from "@/redux/features/cartSlice";
import Link from "next/link";

import Lottie from "react-lottie-player";
import animationData from '../../../../../public/lottie/Animation.json';

const SingleMeal = ({ result }: { result: any }) => {
  const productsNO = useAppSelector(orderedProductsSelector);
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct(result));
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1 text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={"full" + i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.95c.3.922-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.196-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.034 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.95z" />
          </svg>
        ))}

        {halfStar && (
          <svg
            key="half"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5"
          >
            <defs>
              <linearGradient id="halfGrad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#halfGrad)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.951c.3.922-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.196-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.034 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.95z"
            />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={"empty" + i}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 20 20"
            className="w-5 h-5 text-yellow-400"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.951c.3.922-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.196-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.034 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.95z" />
          </svg>
        ))}
      </div>
    );
  };

  const iconStyle = "inline-block w-4 h-4 mr-1 text-primary";

  return (
    <div className="w-full px-4 py-6 md:px-10 max-w-6xl mx-auto">
      <div className="w-full flex justify-center mb-6">
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: 250, height: 250 }}
        />
      </div>

      <div className="flex justify-end mb-6">
        <Link href="/cart">
          <Button
            className={`relative px-4 py-2 rounded-md transition ${
              !productsNO.length
                ? "bg-gray-400 text-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80"
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

      <div className="bg-background rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 dark:shadow-gray-700 dark:bg-gray-900">
        <div className="w-full h-full">
          <Image
            src={result.image}
            alt={result.name}
            width={600}
            height={400}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="p-6 space-y-4 flex flex-col justify-between text-foreground dark:text-gray-300">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">
                {result.name}
              </h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Cuisine: {result.cuisine}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h2 className="font-semibold text-foreground dark:text-gray-200 mb-2">
                Product Details
              </h2>
              <p className="text-muted-foreground dark:text-gray-400">
                {result.details || "No additional details available."}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground dark:text-gray-200 mb-3">Ingredients</h2>
              <p className="text-muted-foreground dark:text-gray-400 flex flex-wrap gap-2">
                {result.ingredient?.map((item: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-primary/20 text-primary rounded-full px-2 py-0.5 text-sm font-medium"
                  >
                    <CheckCircle className={iconStyle} />
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-foreground dark:text-gray-200 mb-3">Dietary Preferences</h2>
              <p className="text-muted-foreground dark:text-gray-400 flex flex-wrap gap-2">
                {result.dietary_preferences?.map((item: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-primary/20 text-primary rounded-full px-2 py-0.5 text-sm font-medium"
                  >
                    <CheckCircle className={iconStyle} />
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <h2 className="font-semibold text-foreground dark:text-gray-200">Portion Size</h2>
                <p className="text-muted-foreground capitalize dark:text-gray-400">
                  {result.portion_size}
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-foreground dark:text-gray-200 flex items-center gap-1 mt-5">
                  Rating
                </h2>
                <div>{renderStars(result.rating)}</div>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  {result.rating} / 5
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-2xl font-semibold text-foreground dark:text-gray-200">
              ৳ {result.price}
            </p>

            <Button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 dark:hover:bg-primary/80"
              aria-label={`Add ${result.name} to cart`}
            >
              Add to Cart <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMeal;
