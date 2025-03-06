"use server"

import type { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";


export const CreateCustomerMeaMenu = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    revalidateTag("MealMenu");
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllPreferMeal = async (
    page?: string,
    limit?: string,
  ) => {
   
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/customers/orders?limit=${limit}&page=${page}`,
        {
          next: {
            tags: ["vieworders"],
          },
        }
      );
      const data = await res.json();
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return Error(error.message);
    }
  };

  export const UpdateMealprefer = async (userData: FieldValues,id:string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await res.json();
      revalidateTag("vieworders");
      return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return Error(error);
    }
  };