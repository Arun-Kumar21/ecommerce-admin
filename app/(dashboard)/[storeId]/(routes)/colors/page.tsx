import db from "@/lib/db";
import ColorsClient from "@/app/(dashboard)/[storeId]/(routes)/colors/components/client";
const ColorsPage = async ({params} : {params : { storeId : string }}) => {

  const size = await db.color.findMany({
    where : {
      storeId : params.storeId
    }
  })

  return (
    <>
      <ColorsClient initialData={size}/>
    </>
  )
}

export default ColorsPage;