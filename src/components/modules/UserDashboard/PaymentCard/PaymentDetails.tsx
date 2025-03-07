"use client"
import { Button } from "@/components/ui/button";
import { clearCart, subTotalSelector } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PaymentUser } from "@/services/payment";
import React from "react";

const PaymentDetails = () => {
  const subTotal = useAppSelector(subTotalSelector);
  const dispatch = useAppDispatch();
  const paymentDetails = {
    totalPrice: 200,
    name: "Nafis",
    phone_number: "01922208141",
    address: "Tongi",
    email: "n@gmail.com",
  };

  const handlePaymentProceed = async () => {
    const result = await PaymentUser(paymentDetails);

    if (result?.data) {
      dispatch(clearCart());
      window.location.href = result.data;
    }
  };
  return (
    <div>
      <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5 mt-20">
        <h1 className="text-2xl font-bold">Payment Details</h1>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <p className="text-gray-500 ">Subtotal</p>
            <p className="font-semibold">{subTotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 ">Discount</p>
            <p className="font-semibold">{0}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500 ">Shipment Cost</p>
            <p className="font-semibold">{0}</p>
          </div>
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <p className="text-gray-500 ">Grand Total</p>
          <p className="font-semibold">{subTotal}</p>
        </div>
        <Button
          onClick={handlePaymentProceed}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Go to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
