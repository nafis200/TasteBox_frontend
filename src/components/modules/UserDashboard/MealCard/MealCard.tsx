

/* eslint-disable @typescript-eslint/no-explicit-any */
import Filtered from "@/components/ui/core/filtered/FIltered";
import EachCard from "./EachCard";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MealCard = ({products}:any) => {
    return (
        <div className="flex gap-8 my-10">
        <div>
          <Filtered />
        </div>
        <div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 lg:ml-20">
          
            {products?.map((product:any, idx: number) => (
              <EachCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default MealCard;