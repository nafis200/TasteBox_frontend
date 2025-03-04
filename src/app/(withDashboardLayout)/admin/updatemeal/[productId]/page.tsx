import UpdatedSingle from "@/components/modules/AdminDashboard/UpdateMeal/UpdatedSingle";
import { getAllProducts } from "@/services/MealMenu";



const SingleUpdate =async ({
    params,
  }: {
    params: Promise<{ productId: string }>;
  }) => {
    const { productId } = await params;
    const results = await getAllProducts();
    const {result} = results?.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = result.filter((da:any)=> da._id === productId)
    return (
        <div>
            <UpdatedSingle Data={filtered} id={productId} />
        </div>
    );
};

export default SingleUpdate;