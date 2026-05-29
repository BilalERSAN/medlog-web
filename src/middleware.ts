import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

const authMiddleware = withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // 1. STRICT ORDER OF OPERATIONS: WWW Redirect FIRST
  // Instantly 301 redirect curelogturkey.com to www.curelogturkey.com BEFORE checking locales
  if (hostname === "curelogturkey.com") {
    url.hostname = "www.curelogturkey.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  // 2. BOT HANDLING & i18n fallback
  // Ensure that bots without a proper Accept-Language header do not get stuck in a redirect loop
  // Cleanly fall back to default language without looping
  const acceptLanguage = request.headers.get("Accept-Language");
  let defaultLocale = "en"; // Default fallback

  if (acceptLanguage && acceptLanguage.trim() !== "" && acceptLanguage !== "*") {
    try {
      const preferredLang = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
      if (preferredLang === "ar") {
        defaultLocale = "ar";
      }
    } catch (e) {
      // Safely catch parsing errors
      defaultLocale = "en";
    }
  }

  // The application handles language via client-side Context and localStorage.
  // We avoid strict path redirects here to prevent loops, cleanly falling back.
  
  // 3. PRESERVE FUNCTIONALITY: NextAuth protection for /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // @ts-expect-error - NextAuth middleware typing
    return authMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths to catch the www redirect, but ignore Next.js internals and static files
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
