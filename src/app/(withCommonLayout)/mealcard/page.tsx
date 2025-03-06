import MealCard from "@/components/modules/UserDashboard/MealCard/MealCard";
import { getAllMenu } from "@/services/MealMenu";


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MealCardsPage = async({
    searchParams,
  }: {
    searchParams: SearchParams;
  }) => {
    const query = await searchParams;
    const { data: products } = await getAllMenu (query);
    return (
        <div>
            <MealCard products={products?.result}/>
        </div>
    );
};

export default MealCardsPage;