import {NextResponse} from "next/server";
import {auth} from "@/auth";
import db from "@/lib/db";

export async function GET(
  { params } : { params : { billboardId : string }}
){
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id missing" , {status:400});
    }

    const billboard = await db.billboard.findMany({
      where : {
        billboardId: params.billboardId
      }
    })

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD-ID_GET",error);
  }
}

export async function PATCH(
  req : Request ,
  { params } : { params : {storeId : string , categoryId : string}}
) {
  try{
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    const body = await req.json();
    const { name , billboardId } = body;

    if (!name && !billboardId) {
      return new NextResponse("Missing details" , {status:400});
    }

    if (!params.storeId && !params.categoryId) {
      return new NextResponse("Missing Id's" , {status:400});
    }

    const category = await db.category.updateMany({
      where : {
        id : params.categoryId,
        storeId : params.storeId
      } ,
      data : {
        name ,
        billboardId
      }
    })

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY-ID_PATCH" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}