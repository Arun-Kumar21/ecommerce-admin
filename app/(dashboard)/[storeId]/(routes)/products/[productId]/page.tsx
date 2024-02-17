import db from "@/lib/db";
import PageHeader from "@/app/_components/heading";
import {Separator} from "@/components/ui/separator";
import ProductForm from "@/app/_components/product-form";

const ProductIdPage = async ({
  params
} : {params :  {productId : string , storeId : string}}) => {

  const product = await db.product.findFirst({
    where : {
      id : params.productId
    },
    include: {
      images: true,
    }

  });

  const categories = await db.category.findMany({
    where : {
      storeId : params.storeId
    }
  })

  const sizes = await db.size.findMany({
    where : {
      storeId : params.storeId
    }
  })

  const colors = await db.color.findMany({
    where : {
      storeId : params.storeId
    }
  })

  return (
    <div className={"md:mx-12 p-2"}>
      <div className={"my-2"}>
        <PageHeader title={product ? "Update Product" : "Add Product"} description={"Manage Your Products"} />
      </div>
      <Separator />

      <ProductForm initialData={product} categories={categories} colors={colors} sizes={sizes}/>
    </div>
  )
}

export default ProductIdPage;