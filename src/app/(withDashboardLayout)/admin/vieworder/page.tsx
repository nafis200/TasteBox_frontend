import ShowOrder from "@/components/modules/AdminDashboard/ViewData/ShowOrder";
import { getAllOrder } from "@/services/MealMenu";




const ViewOrder=  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await getAllOrder(page, limit);

    const {result,meta} = results?.data

   
    return (
        <div>
            <ShowOrder products={result} meta={meta}/>
        </div>
    );
};

export default ViewOrder;