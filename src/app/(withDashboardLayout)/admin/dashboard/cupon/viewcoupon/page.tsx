import CouponsTable from "@/components/modules/AdminDashboard/Cupon/ViewCuponsPage";
import { getAllCoupons } from "@/services/Cupon";


const ViewCoupons = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) => {
  const { page, limit } = await searchParams;
  const results = await getAllCoupons(page, limit);

  const { result, meta } = results?.data || { result: [], meta: {} };

  return (
    <div>
      <CouponsTable coupons={result} meta={meta} />
    </div>
  );
};

export default ViewCoupons;
