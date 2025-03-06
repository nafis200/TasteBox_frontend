
import ShowPrefermeal from "@/components/modules/UserDashboard/mealPrefernce/ViewMeal/ShowPrefermeal";
import { getAllOrder } from "@/services/MealMenu";


const PreferMealView=  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await getAllOrder(page, limit);

    const {result,meta} = results?.data

   
    return (
        <div>
            <ShowPrefermeal products={result} meta={meta}/>
        </div>
    );
};

export default PreferMealView;