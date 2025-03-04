"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { IMeta, IMeal } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import Image from "next/image";

const UpdateMeal = ({ products, meta }: { products: IMeal[]; meta: IMeta }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  console.log(products)

  const handleUpdate = (meal: IMeal) => {
    console.log("Updating meal:", meal);
  };

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
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "cuisine",
      header: "Cuisine",
      cell: ({ row }) => <span>{row.original.cuisine}</span>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <span>{row.original.rating}</span>,
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => (
        <span
          className={row.original.availability ? "text-green-600" : "text-red-600"}
        >
          {row.original.availability ? "Available" : "Unavailable"}
        </span>
      ),
    },
    {
      accessorKey: "portion_size",
      header: "Portion Size",
      cell: ({ row }) => <span>{row.original.portion_size}</span>,
    },
    {
      accessorKey: "price",
      header: "Price ($)",
      cell: ({ row }) => <span>{row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Button size="sm" variant="outline" onClick={() => handleUpdate(row.original)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Meals</h1>
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default UpdateMeal;
