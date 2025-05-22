import Graph from "@/components/modules/graph/Graph";
import { getCouponGraphData } from "@/services/Cupon";


const HomePages = async() => {
    const results = await getCouponGraphData();

    
    
        
        

     
        
    return (
        <div>
            <Graph result={results?.data}/>
        </div>
    );
};

export default HomePages;