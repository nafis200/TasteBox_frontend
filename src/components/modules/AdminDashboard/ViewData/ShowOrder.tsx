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
import { ResponseOrder } from "@/services/MealMenu";
import { toast } from "sonner";

const ShowOrder = ({ products, meta }: { products: any[]; meta: IMeta }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResponse = async (id: string, action: string) => {
    setLoadingId(id);
    try {
      const products = {
        order: action,
      };
      const res = await ResponseOrder(products, id);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message || "Failed to update response");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoadingId(null);
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
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds((prev) =>
                prev.filter((id) => id !== row.original._id)
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
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
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
        const response = row.original.response?.toLowerCase();
        if (response === "pending") {
          return (
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleResponse(row.original._id, "accept")}
                disabled={loadingId === row.original._id}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleResponse(row.original._id, "decline")}
                disabled={loadingId === row.original._id}
              >
                Decline
              </Button>
            </div>
          );
        } else if (response === "accept") {
          return (
            <Button size="sm" variant="outline" disabled>
              Accepted
            </Button>
          );
        } else if (response === "decline") {
          return (
            <Button size="sm" variant="outline" disabled>
              Declined
            </Button>
          );
        } else {
          return (
            <Button size="sm" variant="outline" disabled>
              No Action
            </Button>
          );
        }
      },
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

export default ShowOrder;
