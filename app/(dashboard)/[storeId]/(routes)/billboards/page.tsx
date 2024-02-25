import db from "@/lib/db";
import BillboardClient from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/client";
import axios from "axios";

const BillboardsPage = async ({params} : {params : { storeId : string }}) => {

  const billboards = await db.billboard.findMany({
    where : {
      storeId : params.storeId
    }
  })

  return (
    <>
      <BillboardClient initialData={billboards}/>
    </>
  )
}

export default BillboardsPage;