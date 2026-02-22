import { NextResponse } from "next/server";

export function proxy(request) {
  const auth = request.cookies.get("auth")?.value;
  if (auth !== process.env.SHOP_PASSWORD) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/muqadme/:path*", "/muvakkil/:path*", "/fees/:path*"],
};