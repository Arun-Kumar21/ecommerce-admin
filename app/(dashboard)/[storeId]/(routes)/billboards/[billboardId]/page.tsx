import db from "@/lib/db";
import BillboardForm from "@/app/_components/billboard-form";
import PageHeader from "@/app/_components/heading";
import {Separator} from "@/components/ui/separator";

const BillBoardIdPage = async ({
  params
} : {params :  {billboardId : string}}) => {

  const billboard = await db.billboard.findFirst({
    where : {
      billboardId : params.billboardId
    }
  });

  return (
    <div className={"md:mx-12 p-2"}>
      <div className={"my-2"}>
        <PageHeader title={billboard ? "Update Billboard" : "Create Billboard"} description={"Customize your billboard"} />
      </div>
      <Separator />

      <BillboardForm initialData={billboard}/>
    </div>
  )
}

export default BillBoardIdPage;