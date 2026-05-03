import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  const res = NextResponse.redirect(new URL("/admin-login", origin));

  res.cookies.set("admin_auth", "", {
    maxAge: 0,
    path:   "/",
  });

  return res;
}