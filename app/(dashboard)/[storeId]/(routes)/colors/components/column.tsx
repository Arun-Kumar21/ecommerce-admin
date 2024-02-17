"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ColorCellAction} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/color-cell-action";

export type ColorColumnsType = {
  id: string
  name : string
  value : string
  createAt : string
}

export const columns: ColumnDef<ColorColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell : ({row})=> (
      <div className={"flex items-center gap-x-3"}>
        <div
          className={"border p-4 rounded-full"}
          style={{backgroundColor : row.original.value}}
        ></div>
        {row.original.value}
      </div>
    )
  },
  {
    accessorKey: "createAt",
    header: "Created At",
  },
  {
    id : "actions",
    cell : ({row}) => <ColorCellAction data={row.original}/>
  }
]
