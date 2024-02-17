"use client"

import { ColumnDef } from "@tanstack/react-table"
import {SizeCellAction} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/size-cell-action";

export type SizeColumnsType = {
  id: string
  name : string
  value : string
  createAt : string
}

export const columns: ColumnDef<SizeColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createAt",
    header: "Created At",
  },
  {
    id : "actions",
    cell : ({row}) => <SizeCellAction data={row.original}/>
  }
]
