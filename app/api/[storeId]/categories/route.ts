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
    const { name , billboardId } = body;

    if (!name) {
      return new NextResponse("Label is require" ,{status :400})
    }

    if (!billboardId) {
      return new NextResponse("imageUrl is required" ,  {status:400});
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

    const category = await db.category.create({
      data : {
        storeId : params.storeId,
        billboardId ,
        name,
      }
    })

    return NextResponse.json(category);

  } catch (error) {
    console.log("CATEGORIES_POST",error);
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

    const categories = await db.category.findMany({
      where : {
        storeId : params.storeId
      }
    })

    return NextResponse.json(categories);

  } catch (error) {
    console.log("CATEGORIES_GET",error);
  }
}