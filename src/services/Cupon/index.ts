"use server";

import type { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const createCoupon = async (couponData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_URL}/cupon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(couponData),
    });
    const result = await res.json();
    revalidateTag("Coupon");
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message || error);
  }
};

export const deleteCoupon = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/cupon/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    revalidateTag("Coupon");
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message || error);
  }
};

export const getCouponGraphData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cupon/graph`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message || error);
  }
};

export const getAllCoupons = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/cupon?limit=${limit || "10"}&page=${page || "1"}`,
      {
        method: "GET",
        next: { tags: ["CouponList"] },
      }
    );
    const data = await res.json();
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message || error);
  }
};
