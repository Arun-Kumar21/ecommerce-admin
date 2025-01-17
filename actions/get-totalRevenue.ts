import db from "@/lib/db";

export const getTotalRevenue = async (storeId : string) => {
  const orders = await db.order.findMany({
    where : {
      storeId ,
      isPaid : true
    } ,
    include : {
      orderItems : {
        include : {
          product : true
        }
      }
    }
  })

  const totalRevenue = orders.reduce((total ,  order)=>{
    const orderTotal = order.orderItems.reduce((orderSum , item)=>{
      return orderSum + item.product.price;
    },0)

    return total+orderTotal;
  },0)

  return totalRevenue;
}