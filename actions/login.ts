"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { LoginSchema } from "@/schema";
import db from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {router} from "next/client";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.hashedPassword) {
    return { error: "Invalid credentials" };
  }

  const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

  if (passwordsMatch) {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
      });
      return { success: "Logged in successfully!" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }

      throw error;
    }
  }

  return { error: "Invalid credentials" };
};
