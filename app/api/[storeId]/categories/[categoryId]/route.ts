import {NextResponse} from "next/server";
import {auth} from "@/auth";
import db from "@/lib/db";

export async function GET(
  req : Request ,
  { params } : { params : { categoryId : string }}
){
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id missing" , {status:400});
    }

    const category = await db.category.findMany({
      where : {
        id : params.categoryId
      }
    })

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY-ID_GET",error);
  }
}

export async function DELETE (
  req : Request,
  { params } : { params : { storeId : string  , categoryId : string} }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    if (!params.storeId || !params.categoryId) {
      return new NextResponse("Missing Id's" , {status:400});
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id : params.storeId,
        userId : userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await  db.category.deleteMany({
      where : {
        id : params.categoryId,
      }
    })

    return NextResponse.json(category);

  } catch (error) {
    console.log("CATEGORY-ID_DELETE" , error);
    return new NextResponse("Internal Server Error Occur" , {status : 500});
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

    if (!params.storeId || !params.categoryId) {
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