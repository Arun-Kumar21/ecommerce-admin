import {NextResponse} from "next/server";
import {auth} from "@/auth";
import db from "@/lib/db";

export async function GET(
  req : Request,
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

export async function DELETE (
  req : Request ,
  { params } : { params : { storeId : string  , billboardId : string} }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    if (!params.storeId || !params.billboardId) {
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

    const billboard = await  db.billboard.deleteMany({
      where : {
        billboardId : params.billboardId,
      }
    })

    return NextResponse.json(billboard);

  } catch (error) {
    console.log("BILLBOARD-ID_DELETE" , error);
    return new NextResponse("Internal Server Error Occur");
  }
}

export async function PATCH(
  req : Request ,
  { params } : { params : {storeId : string , billboardId : string}}
) {
  try{
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    const body = await req.json();
    const { label , imageUrl } = body;

    if (!label && !imageUrl) {
      return new NextResponse("Missing details" , {status:400});
    }

    if (!params.storeId || !params.billboardId) {
      return new NextResponse("Missing Id's" , {status:400});
    }

    const billboard = await db.billboard.updateMany({
      where : {
        id : params.storeId ,
        billboardId : params.billboardId
      } ,
      data : {
        label ,
        imageUrl
      }
    })

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_PATCH" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}