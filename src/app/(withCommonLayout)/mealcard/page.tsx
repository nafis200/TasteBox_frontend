import MealCard from "@/components/modules/UserDashboard/MealCard/MealCard";
import { getAllMenu } from "@/services/MealMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taste_box_products",
  description: "Meal Shop restaurant",
   icons: {
    icon: "/faviconz.ico", 
  },
};


type SearchParams = Promise<{ [key: string]: string | string[] | undefined}>;
const MealCardsPage = async({
    searchParams,
  }: {
    searchParams: SearchParams;
  }) => {
    const query = await searchParams;
    
    const { data: products } = await getAllMenu (query);
   

    return (
        <div>
            <MealCard products={products?.result} meta={products.meta}/>
        </div>
    );
};

export default MealCardsPage;