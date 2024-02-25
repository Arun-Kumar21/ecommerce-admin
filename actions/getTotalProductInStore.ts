import db from "@/lib/db";

export const getTotalProductInStore = async (storeId : string) => {
  const productsCount = await db.product.count({
    where : {
      storeId ,
    }
  })

  return productsCount;
}