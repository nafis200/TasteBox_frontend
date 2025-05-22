import { getCurrentUser } from "./services/AuthService";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/profile/,/^\/cart/,/^\/mealcard/],
  admin: [/^\/admin/,/^\/profile/,/^\/cart/,/^\/mealcard/],
};
// 

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async(request: NextRequest)=>{
    const userInfo = await getCurrentUser();
    const { pathname } = request.nextUrl;
  
    if (!userInfo) {
      if (authRoutes.includes(pathname)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL(
            `https://meal-shop-frontend.vercel.app/login?redirectPath=${pathname}`,
            request.url
          )
        );
      }
    }
    if (userInfo?.jwtPayload?.role && roleBasedPrivateRoutes[userInfo?.jwtPayload?.role as Role]) {
      const routes = roleBasedPrivateRoutes[userInfo?.jwtPayload?.role as Role];
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }
  
    return NextResponse.redirect(new URL("/", request.url));
  };


export const config = {
    matcher: [
      "/login",
      "/profile",
      "/admin", 
      "/admin/:page",
      "/user/dashboard",
      "/user/dashboard/:page",
      "/mealcard"
      // "/cart"
    ],
  };