"use client";
import { Button } from "@/components/ui/button";
import {
  disabledButton,
  discount,
  removeButton,
  setDiscount,
  subTotalSelector,
  totalAfterDiscountSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { getCoupon } from "@/services/Cupon";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { toast } from "sonner";

const PaymentDetails = () => {
  const subTotal = useAppSelector(subTotalSelector);
  const disabled = useAppSelector(disabledButton);
  const Discount = useAppSelector(discount);
  const AfterDiscount = useAppSelector(totalAfterDiscountSelector);
  const dispatch = useDispatch();
  const route = useRouter();
  const [couponCode, setCouponCode] = useState("");

  const handlePaymentProceed = async () => {
    route.push("/checkout");
  };

  const handleAddCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    try {
      const result = await getCoupon(couponCode.trim());

      const CouponCode = Number(result?.data?.code);

      if (result && result.success) {
        toast.success(`Coupon Applied Successfully`);
        dispatch(removeButton());
        dispatch(setDiscount(CouponCode));
      } else {
        toast.error("Invalid coupon");
      }
      setCouponCode("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch coupon");
    }
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
            <span className="font-medium text-gray-800 dark:text-white">
              ${subTotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>${Discount}%</span>
          </div>
          <div className="flex justify-between">
            <span>Shipment</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between">
            <span>Discount price</span>
            <span>${subTotal - AfterDiscount}</span>
          </div>
          <hr className="border-gray-300 dark:border-gray-700" />
          <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>${AfterDiscount}</span>
          </div>
        </div>

        <div className="flex mt-8">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-background dark:border-gray-600 dark:text-white"
          />
          <Button
            disabled={!disabled}
            onClick={handleAddCoupon}
            className="whitespace-nowrap w-[90px] p-2"
          >
            Add Coupon
          </Button>
        </div>

        <Button
          onClick={handlePaymentProceed}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 transition-all duration-300"
        >
          <FaCreditCard />
          Go to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
