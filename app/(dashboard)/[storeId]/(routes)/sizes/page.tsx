import db from "@/lib/db";
import SizesClient from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/client";
const SizesPage = async ({params} : {params : { storeId : string }}) => {

  const size = await db.size.findMany({
    where : {
      storeId : params.storeId
    }
  })

  return (
    <>
      <SizesClient initialData={size}/>
    </>
  )
}

export default SizesPage;