import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing Credentials", { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }

    const isPasswordValid =  await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }

    if (isPasswordValid) {
      return new NextResponse(user.id, { status: 200 });
    }
    
  } catch (error) {
    console.log("LOGIN_ERROR", error);
    return new NextResponse("Internal Server Error Occur", { status: 500 });
  }
}   