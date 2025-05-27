"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { IMeta, IMeal } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UpdateMeal = ({ products, meta }: { products: IMeal[]; meta: IMeta }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const router = useRouter();

  const columns: ColumnDef<IMeal>[] = [
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
            if (value) {
                setSelectedIds((prev) => [...prev, row.original._id]);
              } else {
                setSelectedIds(
                  selectedIds.filter((id) => id !== row.original._id)
                );
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
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Meal Name",
      cell: ({ row }) => (
        <span className="font-medium dark:text-gray-200">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "cuisine",
      header: "Cuisine",
      cell: ({ row }) => <span className="dark:text-gray-300">{row.original.cuisine}</span>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <span className="dark:text-gray-300">{row.original.rating}</span>,
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => (
        <span
          className={
            row.original.availability
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }
        >
          {row.original.availability ? "Available" : "Unavailable"}
        </span>
      ),
    },
    {
      accessorKey: "portion_size",
      header: "Portion Size",
      cell: ({ row }) => <span className="dark:text-gray-300">{row.original.portion_size}</span>,
    },
    {
      accessorKey: "price",
      header: "Price ($)",
      cell: ({ row }) => (
        <span className="dark:text-gray-300">{row.original.price.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push(`/admin/dashboard/updatemeal/${row.original._id}`)}
          className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4 rounded-md">
      <h1 className="text-xl font-bold mb-4 dark:text-gray-100">Manage Meals</h1>
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default UpdateMeal;
