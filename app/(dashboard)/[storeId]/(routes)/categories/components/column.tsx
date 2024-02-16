"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CategoryCellAction} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/category-cell-action";

export type CategoryColumnsType = {
  id: string
  name : string
  billboardLabel : string
  createdAt : string
}

export const columns: ColumnDef<CategoryColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell : ({row}) => row.original.billboardLabel
  },
  {
    accessorKey : "createdAt",
    header:"Date"
  },
  {
    id : "actions",
    cell : ({row}) => <CategoryCellAction data={row.original}/>
  }
]
