import { NextResponse, type NextRequest } from "next/server"

/**
 * Hybrid mobile/desktop split:
 *
 * 1. Detects mobile UA on the server and silently rewrites the URL to the
 *    matching `/m/...` route (the user still sees the original URL).
 * 2. The mobile route imports zero desktop scenes — separate JS bundle, no
 *    framer-motion, no D3, no scroll-pinning.
 *
 * The rewrite preserves search params and falls through if a mobile route
 * doesn't exist for the requested path. We exclude /m/* (already mobile),
 * the Next.js internals, and asset paths so this stays cheap.
 */

const MOBILE_UA =
  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile Safari/i

const SKIP_PREFIXES = ["/m", "/api", "/_next", "/data", "/curated", "/gallery", "/audio", "/video"]
const SKIP_FILE_EXT = /\.[a-zA-Z0-9]{2,5}$/ // any /something.ext
const USER_AGENT_VARY =
  "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding, User-Agent"

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (pathname === "/m" || pathname.startsWith("/m/")) {
    const target = req.nextUrl.clone()
    target.pathname = pathname === "/m" ? "/" : pathname.slice(2)
    return NextResponse.redirect(target, {
      status: 308,
      headers: {
        Vary: USER_AGENT_VARY,
      },
    })
  }

  // Already mobile, internal, or static asset — no work to do.
  if (SKIP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/")) || SKIP_FILE_EXT.test(pathname)) {
    return NextResponse.next()
  }

  const ua = req.headers.get("user-agent") || ""
  if (!MOBILE_UA.test(ua)) {
    return NextResponse.next({
      headers: {
        Vary: USER_AGENT_VARY,
      },
    })
  }

  // Rewrite /  → /m and /leadership → /m/leadership, etc.
  const target = req.nextUrl.clone()
  target.pathname = "/m" + (pathname === "/" ? "" : pathname)
  target.search = search
  return NextResponse.rewrite(target, {
    headers: {
      Vary: USER_AGENT_VARY,
    },
  })
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
