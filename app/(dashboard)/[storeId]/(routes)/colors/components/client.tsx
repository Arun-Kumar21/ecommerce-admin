'use client'

import {format} from "date-fns";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import {Color} from "@prisma/client";
import PageHeader from "@/app/_components/heading";
import {columns} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/column";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {ColorColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/column";

interface ColorClientProps {
  initialData : Color[]
}

const ColorsClient = ({initialData} : ColorClientProps) => {
  const router = useRouter();
  const params = useParams();

  const colorData:ColorColumnsType[] = initialData.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createAt : format(item.createdAt , "MMMM do, yyyy")
  }))


  return (
      <div className={"p-4 md:mx-12"}>
        <div className={"flex items-center justify-between pb-2"}>
          <PageHeader title={`Color (${colorData.length})`} description={"Manage Color For Your Store"}/>
          <Button variant={"default"} className={"flex items-center justify-between gap-x-2"} onClick={()=> router.push(`/${params.storeId}/colors/new`)}>
            <Plus className={"w-5 h-5"}/>
            <p>Add New Color</p>
          </Button>
        </div>

        <Separator />

        <div className={"my-4 p-2"}>
          <DataTable searchKey={"name"} columns={columns} data={colorData} placeholder={"Search Colors"}/>
        </div>
      </div>
  )
};

export default ColorsClient;