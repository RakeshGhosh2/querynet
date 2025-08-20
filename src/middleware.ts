// import { NextResponse } from 'next/server'
// import getOrCreateDB from './models/server/dbsetup'
// import getOrCreateStorage from './models/server/storageSetup'

// // This function can be marked `async` if using `await` inside
// export async function middleware() {

//     await Promise.all([
//         getOrCreateDB(),
//         getOrCreateStorage(),
//     ])
//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         "/((?!api|_next/static|_next/image|favicon.ico).*)"
//     ],
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDB from './models/server/dbsetup'
import getOrCreateStorage from './models/server/storageSetup'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Skip middleware for user profile routes to prevent conflicts
    const pathname = request.nextUrl.pathname
    
    // Skip middleware for user profile routes
    if (pathname.startsWith('/users/')) {
        return NextResponse.next()
    }

    try {
        await Promise.all([
            getOrCreateDB(),
            getOrCreateStorage(),
        ])
    } catch (error) {
        console.error('Middleware error:', error)
        // Continue anyway to prevent blocking the request
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - users (user profile routes) - Added this exclusion
         */
        "/((?!api|_next/static|_next/image|favicon.ico|users).*)"
    ],
}

