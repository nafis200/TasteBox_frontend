"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Filtered from "@/components/ui/core/filtered/FIltered";
import EachCard from "./EachCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import Link from "next/link";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";

const MealCard = ({ products, meta }: any) => {
  console.log(meta);
  const productsNO = useAppSelector(orderedProductsSelector);

  return (
    <div className="relative my-10">
      <div className="top-0 bg-white z-10 p-4 flex justify-end">
        <Link href="/cart">
          <Button
            className={`relative px-4 py-2 rounded-md ${
              !productsNO.length
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={!productsNO.length}
          >
            Go to Payment
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {productsNO.length}
            </span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div>
          <Filtered />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20 lg:ml-20">
          {products?.map((product: any, idx: number) => (
            <EachCard key={idx} product={product} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <TablePagination totalPage={meta?.totalPage} />
      </div>
    </div>
  );
};

export default MealCard;
