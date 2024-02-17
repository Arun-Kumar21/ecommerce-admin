import {auth} from "@/auth";
import {NextResponse} from "next/server";
import db from "@/lib/db";

export async function POST (
  req : Request , {
    params
  } : {
    params : {storeId : string}
  }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthenticated" , {status : 401});
    }

    const body = await req.json();
    const { name , value } = body;

    if (!name) {
      return new NextResponse("name is require" ,{status :400})
    }

    if (!value) {
      return new NextResponse("value is required" ,  {status:400});
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required" , {status :400});
    }

    const storeByUserId = await db.store.findFirst({
      where : {
        id : params.storeId,
        userId
      }
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized" , {status:403});
    }

    const size = await db.size.create({
      data : {
        storeId : params.storeId,
        name ,
        value
      }
    })

    return NextResponse.json(size);

  } catch (error) {
    console.log("SIZE_POST",error);
  }
}

export async function GET (
  req : Request , {
    params
  } : {
    params : {storeId : string}
  }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required" , {status :400});
    }

    const size = await db.size.findMany({
      where : {
        storeId : params.storeId
      }
    })

    return NextResponse.json(size);

  } catch (error) {
    console.log("SIZE_GET",error);
  }
}