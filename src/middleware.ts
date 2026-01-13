import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; //helps to get the url's pathname

  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl)); 
    //telling us that redirect the user to the '/login' and request.nextUrl saying that you have to replace the curr. address w/ given 1st argument
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup"
  ],
};
