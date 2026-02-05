import { NextResponse } from "next/server";

export function middleware(request) {
    const isAuth = request.cookies.get("auth");
    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/home", "/active", "/loom", "/form", "/category"];

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // 🚫 Not logged in → block access
    if (isProtected && !isAuth) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    // 🔁 Already logged in → block login page
    if (pathname === "/" && isAuth) {
        return NextResponse.redirect(
            new URL("/home", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
};
