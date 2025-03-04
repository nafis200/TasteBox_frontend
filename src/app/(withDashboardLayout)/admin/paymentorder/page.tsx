import PaymentOrders from "@/components/modules/AdminDashboard/PaymentOrder/PaymentOrder";
import { PaymentOrder } from "@/services/MealMenu";




const ViewOrder=  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await PaymentOrder(page, limit);

    const {result,meta} = results?.data


   
    return (
        <div>
            <PaymentOrders products={result} meta={meta}/>
        </div>
    );
};

export default ViewOrder;