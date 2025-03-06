import ShowOrder from "@/components/modules/AdminDashboard/ViewData/ShowOrder";
import { getAllPreferMeal } from "@/services/customerMeal";


const ViewOrder=  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await  getAllPreferMeal(page, limit);

    const {result,meta} = results?.data

   
    return (
        <div>
            <ShowOrder products={result} meta={meta}/>
        </div>
    );
};

export default ViewOrder;