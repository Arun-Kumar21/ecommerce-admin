import db from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
  req : Request
) {
  try {
    
    // TODO : ADD AUTHENTICATION

    const body = await req.json();

    const { name } = body;

    if(!name) {
      return new NextResponse("Name is Required" , {status : 400});
    }

  } catch (error) {
    console.log("[STORES_POST]" , error)
    return new NextResponse("Internal error" , {status : 500});
  }
}