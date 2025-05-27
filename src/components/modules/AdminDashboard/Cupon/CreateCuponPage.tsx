"use client";

import { createCoupon } from "@/services/Cupon";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
            Create New Coupon
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="coupon_name" className="dark:text-gray-300">Coupon Name</Label>
              <Input
                id="coupon_name"
                {...register("coupon_name", { required: "Coupon name is required" })}
                placeholder="Enter coupon name"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              {errors.coupon_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.coupon_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="code" className="dark:text-gray-300">Coupon Code (1 - 100)</Label>
              <Input
                id="code"
                type="number"
                {...register("code", {
                  required: "Code is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Code must be at least 1" },
                  max: { value: 100, message: "Code must not be greater than 100" },
                })}
                placeholder="Enter code"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Creating..." : "Create Coupon"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCuponPage;
