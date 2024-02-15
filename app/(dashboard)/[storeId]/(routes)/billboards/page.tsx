'use client'

import PageHeader from "@/app/_components/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";

const BillboardsPage = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <div className={"p-4 md:mx-12"}>
      <div className={"flex items-center justify-between pb-2"}>
        <PageHeader title={"Billboards (0)"} description={"Manage billboards for your store"}/>

        <Button variant={"default"} className={"flex items-center justify-between gap-x-2"} onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className={"w-5 h-5"}/>
          <p>Create Billboard</p>
        </Button>
      </div>

      <Separator />

    </div>
  )
}

export default BillboardsPage;