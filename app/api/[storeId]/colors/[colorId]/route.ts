import {NextResponse} from "next/server";
import {auth} from "@/auth";
import db from "@/lib/db";

export async function GET(
  req : Request ,
  { params } : { params : { colorId : string }}
){
  try {
    if (!params.colorId) {
      return new NextResponse("Color Id missing" , {status:400});
    }

    const color = await db.color.findMany({
      where : {
        id : params.colorId
      }
    })

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR-ID_GET",error);
  }
}

export async function DELETE (
  req : Request,
  { params } : { params : { storeId : string  , colorId : string} }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    if (!params.storeId || !params.colorId) {
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

    const color = await  db.color.deleteMany({
      where : {
        id : params.colorId,
      }
    })

    return NextResponse.json(color);

  } catch (error) {
    console.log("COLOR-ID_DELETE" , error);
    return new NextResponse("Internal Server Error Occur" , {status : 500});
  }
}

export async function PATCH(
  req : Request ,
  { params } : { params : {storeId : string , colorId : string}}
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

    if (!params.storeId || !params.colorId) {
      return new NextResponse("Missing Id's" , {status:400});
    }

    const color = await db.color.updateMany({
      where : {
        id : params.colorId,
        storeId : params.storeId
      } ,
      data : {
        name ,
        value
      }
    })

    return NextResponse.json(color);
  } catch (error) {
    console.log("COLOR-ID_PATCH" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}