'use client'

import {format} from "date-fns";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import {Billboard} from "@prisma/client";
import PageHeader from "@/app/_components/heading";
import {BillboardColumnsType, columns} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/column";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";

interface BillboardClientProps {
  initialData : Billboard[]
}

const BillboardClient = ({initialData} : BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  const billboardData:BillboardColumnsType[] = initialData.map((item) => ({
    id : item.billboardId,
    label : item.label,
    createAt : format(item.createAt, 'MMMM do, yyyy'),
  }))


  return (
      <div className={"p-4 md:mx-12"}>
        <div className={"flex items-center justify-between pb-2"}>
          <PageHeader title={`Billboards (${billboardData.length})`} description={"Manage billboards for your store"}/>
          <Button variant={"default"} className={"flex items-center justify-between gap-x-2"} onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className={"w-5 h-5"}/>
            <p>Create Billboard</p>
          </Button>
        </div>

        <Separator />

        <div className={"my-4 p-2"}>
          <DataTable searchKey={"label"} columns={columns} data={billboardData} placeholder={"Billboards"}/>
        </div>
      </div>
  )
};

export default BillboardClient;