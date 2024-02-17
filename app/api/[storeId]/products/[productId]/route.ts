import {NextResponse} from "next/server";
import {auth} from "@/auth";
import db from "@/lib/db";

export async function GET(
  req : Request,
  { params } : { params : { productId : string  }}
){
  try {
    if (!params.productId) {
      return new NextResponse("Missing product id" , {status:400});
    }

    const product = await db.product.findMany({
      where : {
        id: params.productId ,
      },
      include : {
        images : true,
        category : true ,
        size : true ,
        color : true
      }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT-ID_GET",error);
  }
}

export async function DELETE (
  req : Request ,
  { params } : { params : { storeId : string  , productId : string} }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    if (!params.storeId || !params.productId) {
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

    const product = await  db.product.deleteMany({
      where : {
        id : params.productId,
      }
    })

    return NextResponse.json(product);

  } catch (error) {
    console.log("PRODUCT-ID_DELETE" , error);
    return new NextResponse("Internal Server Error Occur");
  }
}

export async function PATCH(
  req : Request ,
  { params } : { params : {storeId : string , productId : string}}
) {
  try{
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("UnAuthorized" , {status : 401});
    }

    const body = await req.json();
    const {
      name ,
      price ,
      colorId ,
      sizeId ,
      categoryId ,
      isFeatured ,
      isArchived
    } = body;

    if (!name || !price || !colorId || !sizeId || !categoryId) {
      return new NextResponse("Missing details" , {status :400});
    }

    if (!params.storeId || !params.productId) {
      return new NextResponse("Missing Id's" , {status:400});
    }

    const product = await db.product.updateMany({
      where : {
        id : params.productId ,
        storeId : params.storeId
      } ,
      data : {
        name ,
        price ,
        colorId ,
        sizeId ,
        categoryId ,
        isFeatured ,
        isArchived,
      }
    })

    return NextResponse.json(product);

  } catch (error) {
    console.log("PRODUCT_PATCH" , error);
    return new NextResponse("Internal Error Occur" , {status : 500});
  }
}