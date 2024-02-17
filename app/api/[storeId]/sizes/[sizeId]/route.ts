import {NextResponse} from "next/server";
import {auth} from "@/auth";
import db from "@/lib/db";

export async function GET(
  req : Request ,
  { params } : { params : { sizeId : string }}
){
  try {
    if (!params.sizeId) {
      return new NextResponse("Size Id missing" , {status:400});
    }

    const size = await db.category.findMany({
      where : {
        id : params.sizeId
      }
    })

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE-ID_GET",error);
  }
}

export async function DELETE (
  req : Request,
  { params } : { params : { storeId : string  , sizeId : string} }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    if (!params.storeId || !params.sizeId) {
      return new NextResponse("Missing Id" , {status:400});
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

    const size = await  db.size.deleteMany({
      where : {
        id : params.sizeId,
      }
    })

    return NextResponse.json(size);

  } catch (error) {
    console.log("SIZE-ID_DELETE" , error);
    return new NextResponse("Internal Server Error Occur" , {status : 500});
  }
}

export async function PATCH(
  req : Request ,
  { params } : { params : {storeId : string , sizeId : string}}
) {
  try{
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    const body = await req.json();
    const { name , value } = body;

    if (!name && !value) {
      return new NextResponse("Missing details" , {status:400});
    }

    if (!params.storeId || !params.sizeId) {
      return new NextResponse("Missing Id's" , {status:400});
    }

    const size = await db.size.updateMany({
      where : {
        id : params.sizeId,
        storeId : params.storeId
      } ,
      data : {
        name ,
        value
      }
    })

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE-ID_PATCH" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}