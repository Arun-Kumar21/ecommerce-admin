import db from "@/lib/db";
import ProductClient from "@/app/(dashboard)/[storeId]/(routes)/products/components/client";
import {ProductColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/products/components/column";
import {formatter} from "@/lib/utils";
import {format} from "date-fns";


const ProductsPage = async ({params} : {params : { storeId : string }}) => {

  const products = await db.product.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      category : true,
      size : true ,
      color : true
    }
  })

  const productData : ProductColumnsType[] = products.map((item) => ({
    id : item.id,
    name : item.name,
    isFeatured : item.isFeatured ,
    isArchived : item.isArchived,
    price : formatter.format(item.price),
    color : item.color.value,
    category : item.category.name,
    size : item.size.name,
    createdAt : format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <>
      <ProductClient initialData={productData}/>
    </>
  )
}

export default ProductsPage;