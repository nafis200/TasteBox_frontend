/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TablePaginationProps = {
  totalPage: number;
  currentPage?: number;
  onPageChange?: (page: number, limit: number) => void;
};

const TablePagination = ({ totalPage, currentPage = 1, onPageChange }: TablePaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(currentPage);
  const [limit, setLimit] = useState<number>(parseInt(searchParams.get("limit") || "10", 10));

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const updateQueryParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
    onPageChange?.(newPage, newLimit);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      updateQueryParams(page - 1, limit);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
      updateQueryParams(page + 1, limit);
    }
  };

  return (
    <div className="flex items-center justify-between my-5 gap-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePrev}
          disabled={page === 1}
          variant="outline"
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          <ArrowLeft />
        </Button>

        {[...Array(totalPage)].map((_, index) => (
          <Button
            key={index}
            onClick={() => {
              setPage(index + 1);
              updateQueryParams(index + 1, limit);
            }}
            variant={page === index + 1 ? "default" : "outline"}
            size="sm"
            className="w-8 h-8 rounded-full flex items-center justify-center"
          >
            {index + 1}
          </Button>
        ))}

        <Button
          onClick={handleNext}
          disabled={page === totalPage}
          variant="outline"
          size="sm"
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          <ArrowRight />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Show:</span>
        <select
          value={limit}
          onChange={(e) => {
            const newLimit = parseInt(e.target.value, 10);
            setLimit(newLimit);
            updateQueryParams(1, newLimit);
          }}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
        >
          {[2,5,10, 20, 30, 50].map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TablePagination;
