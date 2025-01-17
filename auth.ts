import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import {getUserById} from "@/data/user";
import db from "@/lib/db";

export const {
  handlers : { GET , POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks : {
    async session({token , session} ) {
      if(session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        //@ts-ignore
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({token}) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter : PrismaAdapter(db),
  session : { strategy : "jwt" },
  pages : {
    signIn : "/login"
  },

  ...authConfig

})