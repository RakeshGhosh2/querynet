

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDB from './models/server/dbsetup'
import getOrCreateStorage from './models/server/storageSetup'

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    
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

