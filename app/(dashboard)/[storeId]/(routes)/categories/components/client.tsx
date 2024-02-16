'use client'

import {format} from "date-fns";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import PageHeader from "@/app/_components/heading";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";

import {columns} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/column";
import {CategoryColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/column";

interface CategoryClientProps {
  initialData : CategoryColumnsType[]
}

const CategoryClient = ({initialData} : CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();


  return (
      <div className={"p-4 md:mx-12"}>
        <div className={"flex items-center justify-between pb-2"}>
          <PageHeader title={`Categories (${initialData.length})`} description={"Manage Categories for your store"}/>
          <Button variant={"default"} className={"flex items-center justify-between gap-x-2"} onClick={()=> router.push(`/${params.storeId}/categories/new`)}>
            <Plus className={"w-5 h-5"}/>
            <p>New Category</p>
          </Button>
        </div>

        <Separator />

        <div className={"my-4 p-2"}>
          <DataTable columns={columns} data={initialData} searchKey={"name"} placeholder={"Category"}/>
        </div>
      </div>
  )
};

export default CategoryClient;