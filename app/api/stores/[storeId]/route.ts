import db from "@/lib/db";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

export async function PATCH(
  req : Request ,
  { params } : { params : {storeId : string}}
) {
  try{
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing Details" , {status : 400});
    }

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    if (!params.storeId) {
      return new NextResponse("Missing Store Id" , {status:400});
    }

    const store = await db.store.updateMany({
      where : {
        id : params.storeId ,
        userId
      } ,
      data : {
        name
      }
    })

    return NextResponse.json(store);
  } catch (error) {
    console.log("PATCH_STORE" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized" , {status:401});
    }

    if (!params.storeId){
      return new NextResponse("Missing Store id" , {status:400});
    }

    await db.store.deleteMany({
      where : {
        id : params.storeId,
        userId
      }
    });

    return new NextResponse("Successfully delete store" , {status : 200});
  } catch (error) {
    console.log("DELETE_STORE" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}