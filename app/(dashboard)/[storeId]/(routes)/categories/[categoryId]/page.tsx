import db from "@/lib/db";
import PageHeader from "@/app/_components/heading";
import {Separator} from "@/components/ui/separator";
import CategoryForm from "@/app/_components/category-form";

const CategoryIdPage = async ({
  params
} : {params :  {categoryId : string ,  storeId : string}}) => {

  const category = await db.category.findFirst({
    where : {
      id : params.categoryId
    }
  });

  const billboard = await db.billboard.findMany({
    where : {
      storeId : params.storeId
    }
  })

  return (
    <div className={"md:mx-12 p-2"}>
      <div className={"my-2"}>
        <PageHeader title={category ? "Update Category" : "Create Category"} description={"Manage your Category"} />
      </div>


      <Separator />

      <CategoryForm initialData={category} billboards={billboard}/>
    </div>
  )
}

export default CategoryIdPage;