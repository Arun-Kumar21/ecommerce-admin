import db from '@/lib/db'
import {format} from "date-fns";

import {CategoryColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/column";
import CategoryClient from "@/app/(dashboard)/[storeId]/(routes)/categories/components/client";

const CategoryPage = async ({params} : {params : { storeId : string }}) => {

  const categories = await db.category.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      billboard : true
    },
    orderBy : {
      createdAt : "desc"
    }
  });

  const formattedCategories : CategoryColumnsType[] = categories.map((item)=>({
    id : item.id,
    name : item.name,
    billboardLabel : item.billboard.label,
    createdAt : format(item.createdAt , "MMMM do, yyyy")
  }))

  return (
    <>
      <CategoryClient initialData={formattedCategories}/>
    </>
  )
}

export default CategoryPage;