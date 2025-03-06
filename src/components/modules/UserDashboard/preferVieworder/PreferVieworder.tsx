/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { IMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import Image from "next/image";
import { useUser } from "@/context/UserContext";



const PreferViewOrders = ({ products, meta }: { products: any[]; meta: IMeta }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const {user} = useUser()

  const product = products.filter((da:any)=>da?.author?.email === user?.jwtPayload?.email)

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
      accessorKey: "author.name",
      header: "Author Name",
      cell: ({ row }) => <span>{row.original.author?.name}</span>,
    },
    {
      accessorKey: "author.email",
      header: "Author Email",
      cell: ({ row }) => <span>{row.original.author?.email}</span>,
    },
    {
      accessorKey: "response",
      header: "Response",
      cell: ({ row }) => {
        const response = row.original.response;
       return <Button size="sm" variant="outline" disabled>{response}</Button>
      },
    },
  ];
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Meals</h1>
      <NMTable columns={columns} data={product || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default PreferViewOrders;
