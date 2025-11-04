import { betterFetch } from "@better-fetch/fetch";
import type { getSession } from "../convex/auth";
import { NextRequest, NextResponse } from "next/server";
 
type Session = typeof getSession.$Infer.Session;
 
export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
		},
	});
 
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard"], // Apply middleware to specific routes
};