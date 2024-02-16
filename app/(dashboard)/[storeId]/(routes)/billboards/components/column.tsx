"use client"

import { ColumnDef } from "@tanstack/react-table"
import {BillboardCellActions} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/billboard-cell-action";

export type BillboardColumnsType = {
  id: string
  label : string
  createAt : string
}

export const columns: ColumnDef<BillboardColumnsType>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createAt",
    header: "Created At",
  },
  {
    id : "actions",
    cell : ({row}) => <BillboardCellActions data={row.original}/>
  }
]
