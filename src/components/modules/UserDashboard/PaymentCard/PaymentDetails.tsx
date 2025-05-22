"use client";
import { Button } from "@/components/ui/button";
import { subTotalSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import React from "react";
import { FaCreditCard } from "react-icons/fa";

const PaymentDetails = () => {
  const subTotal = useAppSelector(subTotalSelector);
  const route = useRouter();

  const handlePaymentProceed = async () => {
     route.push('/checkout')
  };

  return (
    <div className="w-full md:w-[250px] md:sticky md:top-20 lg:w-[350px] lg:top-24 lg:sticky h-fit mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 dark:bg-background">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          💳 Payment Summary
        </h2>

        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-gray-800 dark:text-white">${subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between">
            <span>Shipment</span>
            <span>$0</span>
          </div>
          <hr className="border-gray-300 dark:border-gray-700" />
          <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${subTotal}</span>
          </div>
        </div>

        <Button
          onClick={handlePaymentProceed}
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all duration-300"
        >
          <FaCreditCard />
          Go to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
