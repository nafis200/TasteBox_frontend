"use client";

import { createCoupon } from "@/services/Cupon";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "sonner"; 

type FormInputs = {
  coupon_name: string;
  code: number;
};

const CreateCuponPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await createCoupon(data);
      if (response.success) {
        toast.success("Coupon created successfully!");
      } else {
        toast.error(response.message || "Failed to create coupon");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Create Coupon</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Coupon Name</label>
          <input
            type="text"
            {...register("coupon_name", { required: "Coupon name is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.coupon_name && (
            <p className="text-red-500 text-sm mt-1">{errors.coupon_name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Code (Number)</label>
          <input
            type="number"
            {...register("code", {
              required: "Code is required",
              valueAsNumber: true,
              min: { value: 1, message: "Code must be at least 1" },
              max: { value: 100, message: "Code must not be greater than 100" },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
};

export default CreateCuponPage;
