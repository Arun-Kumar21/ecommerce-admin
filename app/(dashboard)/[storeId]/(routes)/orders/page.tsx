import db from "@/lib/db";
import OrderClient from "@/app/(dashboard)/[storeId]/(routes)/orders/components/client";
import {format} from "date-fns";
import {formatter} from "@/lib/utils";
import {OrderColumnsType} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/column";

const OrdersPage = async ({params} : {params : { storeId : string }}) => {

  const order = await db.order.findMany({
    where : {
      storeId : params.storeId
    } ,
    include : {
      orderItems : {
        include : {
          product : true
        }
      }
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const orderData:OrderColumnsType[] = order.map((item) => ({
    id : item.id,
    phone : item.phone,
    address : item.address,
    product : item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice : formatter.format(item.orderItems.reduce((total:number , item)=> {
      return total + Number(item.product.price)
    },0)),
    isPaid : item.isPaid,
    createdAt : format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <>
      <OrderClient initialData={orderData}/>
    </>
  )
}

export default OrdersPage;