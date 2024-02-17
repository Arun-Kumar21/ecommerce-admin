"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumnsType = {
  id: string
  phone : string
  address : string
  isPaid : boolean
  totalPrice : string
  product : string
  createdAt : string
}

export const columns: ColumnDef<OrderColumnsType>[] = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
]
