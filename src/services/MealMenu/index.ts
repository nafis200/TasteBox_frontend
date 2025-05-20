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
export const getAllMenu = async (
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("price", query?.price.toString());
  }

  if (query?.dietary_preferences) {
    params.append("dietary_preferences", query?.dietary_preferences.toString());
  }
  if (query?.cuisine) {
    params.append("cuisine", query?.cuisine.toString());
  }
  if (query?.rating) {
    params.append("rating", query?.rating.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/orders?${params}`,
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

export const getSingleMeal = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch meal");
    }

    const result = await res.json();
    return result.data[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message || "Something went wrong");
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
export const ResponseOrder = async (userData: FieldValues,id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/response/${id}`, {
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
export const getAllOrder = async (
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
export const PaymentOrder = async (
  page?: string,
  limit?: string,
) => {
 

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/Surjopay?limit=${limit}&page=${page}`,
    );
    const data = await res.json();
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error.message);
  }
};



