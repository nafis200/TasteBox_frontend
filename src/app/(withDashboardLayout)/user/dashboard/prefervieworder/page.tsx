
import PreferViewOrders from "@/components/modules/UserDashboard/preferVieworder/PreferVieworder";
import { getAllPreferMeal } from "@/services/customerMeal";



const PreferViewOrder=  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await  getAllPreferMeal(page, limit);

    const {result,meta} = results?.data

   
    return (
        <div>
            <PreferViewOrders products={result} meta={meta}/>
        </div>
    );
};

export default PreferViewOrder;