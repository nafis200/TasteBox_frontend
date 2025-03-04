"use server"

export const getAllMeals = async()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/orders`, {
          next: {
            tags: ["Meals"],
          },
        });
        const data = await res.json();
        return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return Error(error.message);
      }
}