

import SingleMeal from "@/components/modules/home/SingleMeal/SingleMeal";
import { getSingleMeal } from "@/services/MealMenu";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Single Blogs page",
    description: "My Blogs pages",
  };
const SingleBlogPage = async({params}:{
    params:Promise<{mealid:string}>,
}) => {
    const {mealid} = await params
    const result = await getSingleMeal(mealid)
    return (
        <div>
           <SingleMeal result={result}/>
        </div>
    );
};

export default SingleBlogPage;