import Graph from "@/components/modules/graph/Graph";
import { getCouponGraphData } from "@/services/Cupon";


export default async function UserDashboard() {
  const results = await getCouponGraphData();     
  return (
    <div>
      <Graph result={results?.data} />
    </div>
  );
}


