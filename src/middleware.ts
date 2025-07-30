import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ['/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  // Allow public paths without auth
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // Continue if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // protect private routes only
}