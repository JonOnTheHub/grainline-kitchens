import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const res = NextResponse.redirect(new URL("/admin-login", siteUrl));

  res.cookies.set("admin_auth", "", {
    maxAge: 0,
    path:   "/",
  });

  return res;
}