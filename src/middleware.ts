// import { auth } from "@/auth"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export async function middleware(request: NextRequest) {
//   const session = await auth()
  
//   // If the user is not signed in and trying to access a protected route
//   if (!session) {
//     const url = new URL('/api/auth/signin', request.url)
//     url.searchParams.set('callbackUrl', request.url)
//     return NextResponse.redirect(url)
//   }
  
//   return NextResponse.next()
// }

// // Enable edge runtime
// export const runtime = 'edge'

// // Configure which paths should be protected by the middleware
// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/api/:path*',
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }
import { isAuthenticated } from "./lib/jwtTokenControls"

// Limit the middleware to paths starting with `/api/`
// matcher: ['/about/:path*', '/dashboard/:path*'],
// export { auth as middleware } from "@/auth"
export const config = {
  matcher: '/api/v1/:function*'
}

export async function middleware(request:any) {
  const result = await isAuthenticated(request)

  if (!result) {
    return Response.json({ success: false, message: 'Invalid token. Paths starting with `/api/v1/`' }, { status: 401 })
  }
}