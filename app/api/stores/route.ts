'use server'
import db from "@/lib/db";
import { NextResponse } from "next/server"
import {auth} from "@/auth";

export async function POST(
  req : Request
) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized" , {status : 401});
    }

    const id = user.id;
    if (!id) {
      return new NextResponse('Unauthorized' , {status:401});
    }
    const body = await req.json();

    const { name } = body;

    if(!name) {
      return new NextResponse("Name is Required" , {status : 400});
    }

    const store = await db.store.create({
      data : {
        name,
        userId : id
      }
    });
    return NextResponse.json(store);

  } catch (error) {
    console.log("[STORES_POST]" , error)
    return new NextResponse("Internal error" , {status : 500});
  }
}