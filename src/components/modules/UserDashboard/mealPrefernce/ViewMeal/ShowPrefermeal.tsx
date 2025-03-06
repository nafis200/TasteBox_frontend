



"use client";

import { NMTable } from "@/components/ui/core/NMTable/index";
import { IMeta} from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import Image from "next/image";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const ShowPrefermeal= ({ products, meta }: { products: any; meta: IMeta }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const router = useRouter();
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        accessorKey: "portion_size",
        header: "Portion Size",
        cell: ({ row }) => <span>{row.original.portion_size}</span>,
      },
      {
        accessorKey: "author_email",
        header: "Author Email",
        cell: ({ row }) => <span>{row.original.author?.email || "N/A"}</span>,
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/user/dashboard/preferviewmeal/${row.original._id}`)}
          >
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
  export default ShowPrefermeal;
