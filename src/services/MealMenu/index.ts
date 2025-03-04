"use server"

import type { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";


export const CreateMealMenu = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    revalidateTag("Menu");
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};
export const UpdateMeal = async (userData: FieldValues,id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    revalidateTag("Menu");
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};


export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }

  if (query?.rating) {
    params.append("ratings", query?.rating.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/orders?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["Menu"],
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



