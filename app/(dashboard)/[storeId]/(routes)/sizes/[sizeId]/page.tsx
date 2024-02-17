import db from "@/lib/db";
import PageHeader from "@/app/_components/heading";
import {Separator} from "@/components/ui/separator";
import SizeForm from "@/app/_components/size-form";

const SizeIdPage = async ({
  params
} : {params :  {sizeId : string}}) => {

  const size = await db.size.findFirst({
    where : {
      id : params.sizeId
    }
  });

  return (
    <div className={"md:mx-12 p-2"}>
      <div className={"my-2"}>
        <PageHeader title={size ? "Update Size" : "Create Size"} description={"Customize your Size"} />
      </div>
      <Separator />

      <SizeForm initialData={size}/>
    </div>
  )
}

export default SizeIdPage;