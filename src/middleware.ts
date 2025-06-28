import { type NextRequest, NextResponse } from "next/server";
import { getUserFromSession } from "./auth/session";

const privateRoutes = [
  "/dashboard",
  "/dashboard/projects",
  "/dashboard/clients",
  "/dashboard/tasks",
];

const adminRoutes = [
  "/admin",
  "/admin/tasks",
  "/admin/users",
  "/admin/users/[userId]",
  "/admin/profile",
  "/admin/settings",
];

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const user = await getUserFromSession(request.cookies);

  // 👉 Αν user είναι logged in και πάει σε public route → redirect στο σωστό dashboard
  if (publicRoutes.includes(pathname)) {
    if (user) {
      if (user.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    // Αν δεν είναι logged in → τον αφήνεις να δει public route
    return NextResponse.next();
  }

  // 👉 Private routes
  if (privateRoutes.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 👉 Admin routes
  if (adminRoutes.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Αν δεν ταιριάζει τίποτα, άφησέ τον να προχωρήσει
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};
