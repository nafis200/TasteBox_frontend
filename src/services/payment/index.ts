"use server"

import type { FieldValues } from "react-hook-form";

export const PaymentUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};


export const VerifyOrder = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/verify?order_id=${id}`, {
        });
        const data = await res.json();
        return data;
     
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return Error(error.message);
      }
}