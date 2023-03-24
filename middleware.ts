import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Redirect to /dream if the user is not logged in
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("next-auth.session-token")?.value;
  if (cookie) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/dream", request.url));
  }
}

export const config = {
  matcher: "/buy-credits",
};
