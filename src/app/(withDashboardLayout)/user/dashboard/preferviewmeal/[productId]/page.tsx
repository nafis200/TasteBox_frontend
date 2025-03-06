

import UpdateMealPrefernce from "@/components/modules/UserDashboard/updatemealpreference/UpdateMealPrefernce";
import { getAllPreferMeal } from "@/services/customerMeal";




const UpdatePreferMeal =async ({
    params,
  }: {
    params: Promise<{ productId: string }>;
  }) => {
    const { productId } = await params;
    const results = await getAllPreferMeal();
    const {result} = results?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = result.filter((da:any)=> da._id === productId)
    return (
        <div>
            <UpdateMealPrefernce  Data={filtered} id={productId} />
        </div>
    );
};

export default UpdatePreferMeal;