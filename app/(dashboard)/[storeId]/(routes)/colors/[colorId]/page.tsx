import db from "@/lib/db";
import PageHeader from "@/app/_components/heading";
import {Separator} from "@/components/ui/separator";
import ColorForm from "@/app/_components/color-form";

const ColorIdPage = async ({
  params
} : {params :  {colorId : string}}) => {

  const color = await db.color.findFirst({
    where : {
      id : params.colorId
    }
  });

  return (
    <div className={"md:mx-12 p-2"}>
      <div className={"my-2"}>
        <PageHeader title={color ? "Update Color" : "Add Color"} description={"Manage colors for products"} />
      </div>
      <Separator />

      <ColorForm initialData={color}/>
    </div>
  )
}

export default ColorIdPage;