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
    const {
      name ,
      price ,
      colorId ,
      sizeId ,
      categoryId ,
      isFeatured ,
      images ,
      isArchived
    } = body;

   if (!name || !price || !colorId || !sizeId || !categoryId || !images || !images.length) {
     return new NextResponse("Missing details" , {status :400});
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

    const product = await db.product.create({
      data : {
        name ,
        price ,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId : params.storeId,
        images : {
          createMany : {
            data : [
              ...images.map((image : {url:string}) => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(product);

  } catch (error) {
    console.log("PRODUCT_POST",error);
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
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store Id is required" , {status :400});
    }

    const products = await db.product.findMany({
      where : {
        storeId : params.storeId,
        categoryId ,
        colorId,
        sizeId,
        isFeatured : isFeatured ? true : undefined,
        isArchived : false
      } ,
      include : {
        images : true,
        category : true ,
        size : true,
        color : true,
      } ,
      orderBy : {
        createdAt : "desc"
      }
    })

    return NextResponse.json(products);

  } catch (error) {
    console.log("PRODUCT_GET",error);
  }
}