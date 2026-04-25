import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const auth = request.cookies.get("admin_auth")?.value;
    if (auth !== process.env.ADMIN_PASSWORD) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin-login";
      if (pathname !== "/admin-login") {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};