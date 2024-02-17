'use client'

import {format} from "date-fns";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import {Size} from "@prisma/client";
import PageHeader from "@/app/_components/heading";
import {columns} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/column";
import {SizeColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/column";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";

interface SizeClientProps {
  initialData : Size[]
}

const SizesClient = ({initialData} : SizeClientProps) => {
  const router = useRouter();
  const params = useParams();

  const sizeData:SizeColumnsType[] = initialData.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createAt : format(item.createdAt , "MMMM do, yyyy")
  }))


  return (
      <div className={"p-4 md:mx-12"}>
        <div className={"flex items-center justify-between pb-2"}>
          <PageHeader title={`Size (${sizeData.length})`} description={"Manage Sizes for your store"}/>
          <Button variant={"default"} className={"flex items-center justify-between gap-x-2"} onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
            <Plus className={"w-5 h-5"}/>
            <p>Add New Size</p>
          </Button>
        </div>

        <Separator />

        <div className={"my-4 p-2"}>
          <DataTable searchKey={"name"} columns={columns} data={sizeData} placeholder={"Search Sizes"}/>
        </div>
      </div>
  )
};

export default SizesClient;