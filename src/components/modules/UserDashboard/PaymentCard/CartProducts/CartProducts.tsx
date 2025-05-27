/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { orderedProductsSelector } from "@/redux/features/cartSlice";
import CardPaymentpage from "./CardPaymentpage";
import { useAppSelector } from "@/redux/hooks";

export default function CartProducts() {
  const products  = useAppSelector(orderedProductsSelector);
  return (
    <div className="border-2 border-white bg-background dark:bg-gray-900 brightness-105 rounded-md col-span-8 h-full row-span-3 p-10 space-y-5 flex-1">
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p className="mt-2">
          Looks like your cart is on vacation—bring it back to work by adding
          some items!
        </p>
      </div>
     
  
     {products?.map((product:any) => (
        <CardPaymentpage key={product._id}  product={product} />
      ))}
    </div>
  );
}
