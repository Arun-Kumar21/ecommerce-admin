import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

import {
  authRoutes , 
  apiAuthPrefix,
} from '@/routes'


const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return null
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/" , nextUrl));
    }
    return null
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login" , nextUrl));
  }

  return null;
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};