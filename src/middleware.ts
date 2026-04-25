import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const auth = request.cookies.get("admin_auth")?.value;
    if (auth !== process.env.ADMIN_PASSWORD) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      // Avoid redirect loop
      if (pathname !== "/admin/login") {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};