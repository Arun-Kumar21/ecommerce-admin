'use client'

import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import PageHeader from "@/app/_components/heading";
import {ProductColumnsType , columns} from "@/app/(dashboard)/[storeId]/(routes)/products/components/column";

import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";


interface ProductClientProps {
  initialData : ProductColumnsType[]
}

const ProductClient = ({initialData} : ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
      <div className={"p-4 md:mx-12"}>
        <div className={"flex items-center justify-between pb-2"}>
          <PageHeader title={`Products (${initialData.length})`} description={"Manage Products For Your Store"}/>
          <Button variant={"default"} className={"flex items-center justify-between gap-x-2"} onClick={()=> router.push(`/${params.storeId}/products/new`)}>
            <Plus className={"w-5 h-5"}/>
            <p>Add Product</p>
          </Button>
        </div>

        <Separator />

        <div className={"my-4 p-2"}>
          <DataTable searchKey={"name"} columns={columns} data={initialData} placeholder={"Products"}/>
        </div>
      </div>
  )
};

export default ProductClient;