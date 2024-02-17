'use client'

import PageHeader from "@/app/_components/heading";
import {columns, OrderColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/column";

import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";

interface OrderClientProps {
  initialData : OrderColumnsType[]
}

const OrderClient = ({initialData} : OrderClientProps) => {

  return (
      <div className={"p-4 md:mx-12"}>
        <div className={"flex items-center justify-between pb-2"}>
          <PageHeader title={`Order (${initialData.length})`} description={"Your all orders"}/>
        </div>

        <Separator />

        <div className={"my-4 p-2"}>
          <DataTable searchKey={"product"} columns={columns} data={initialData} placeholder={"Orders"}/>
        </div>
      </div>
  )
};
export default OrderClient;