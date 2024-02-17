"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ProductCellActions} from "@/app/(dashboard)/[storeId]/(routes)/products/components/product-cell-action";

export type ProductColumnsType = {
  id: string
  name : string
  price : string
  size : string
  category : string
  color : string
  isFeatured : boolean
  isArchived : boolean
  createdAt : string
}

export const columns: ColumnDef<ProductColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archive",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell : ({row}) => (
      <div className={"flex items-center gap-x-3"}>
        <div className={"p-4 rounded-full border"} style={{backgroundColor:row.original.color}}/>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id : "actions",
    cell : ({row}) => <ProductCellActions data={row.original}/>
  }
]
