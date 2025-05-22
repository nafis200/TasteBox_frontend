/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { NMTable } from "@/components/ui/core/NMTable";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";

import { IMeta } from "@/types";
import { deleteCoupon } from "@/services/Cupon";

const CouponsTable = ({ coupons, meta }: { coupons: any[]; meta: IMeta }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  

  const handleDelete = async (id: string) => {
    try {
      await deleteCoupon(id);
      toast.success("Coupon deleted successfully");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            const id = row.original._id;
            if (value) {
              setSelectedIds((prev) => [...prev, id]);
            } else {
              setSelectedIds((prev) => prev.filter((i) => i !== id));
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "coupon_name",
      header: "Coupon Name",
      cell: ({ row }) => <span>{row.original.coupon_name}</span>,
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <span>{row.original.code}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleDelete(row.original._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Coupons</h1>
      <NMTable columns={columns} data={coupons} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default CouponsTable;
