

import PreferpaymentOrder from "@/components/modules/UserDashboard/PreferpaymentOrder/PreferPaymentOrder";
import { PaymentOrder } from "@/services/MealMenu";




const Viewpreferpaymentorder=  async ({
    searchParams,
  }: {
    searchParams: Promise<{ page: string, limit:string }>;
  }) => {
    const { page, limit } = await searchParams;
    const results = await PaymentOrder(page, limit);

    const {result,meta} = results?.data


   
    return (
        <div>
            <PreferpaymentOrder products={result} meta={meta}/>
        </div>
    );
};

export default Viewpreferpaymentorder;