// proxy.ts (in root or src directory)
import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

type Session = {
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string;
    userAgent?: string;
  };
};

export async function proxy(request: NextRequest) {
  const baseURL = process.env.NEXT_PUBLIC_CONVEX_SITE_URL || request.nextUrl.origin;

  try {
    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
      baseURL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    // Protected routes
    const protectedPaths = ["/dashboard"];
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    // Redirect to login if not authenticated
    if (isProtectedPath && !session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from auth pages
    const authPaths = ["/login", "/signup"];
    const isAuthPath = authPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    if (isAuthPath && session) {
      // Check for redirect parameter
      const redirectTo = request.nextUrl.searchParams.get("redirect");
      return NextResponse.redirect(
        new URL(redirectTo || "/dashboard", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy error:", error);
    
    // If error checking session on protected route, redirect to login
    const protectedPaths = ["/dashboard"];
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};