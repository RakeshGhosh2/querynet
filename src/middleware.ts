

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import getOrCreateDB from './models/server/dbsetup'
// import getOrCreateStorage from './models/server/storageSetup'

// export async function middleware(request: NextRequest) {
//     const pathname = request.nextUrl.pathname
    
//     if (pathname.startsWith('/users/')) {
//         return NextResponse.next()
//     }

//     try {
//         await Promise.all([
//             getOrCreateDB(),
//             getOrCreateStorage(),
//         ])
//     } catch (error) {
//         console.error('Middleware error:', error)
//     }
    
//     return NextResponse.next()
// }

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - api (API routes)
//          * - _next/static (static files)
//          * - _next/image (image optimization files)
//          * - favicon.ico (favicon file)
//          * - users (user profile routes) - Added this exclusion
//          */
//         "/((?!api|_next/static|_next/image|favicon.ico|users).*)"
//     ],
// }


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDB from './models/server/dbsetup'
import getOrCreateStorage from './models/server/storageSetup'

// Production-safe middleware
export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Skip middleware for certain paths
    const skipPaths = [
        '/api/',
        '/_next/',
        '/favicon.ico',
        '/images/',
        '/users/',
        '/__nextjs_original-stack-frame', // Vercel specific
        '/vercel.svg',
        '/robots.txt',
        '/sitemap.xml'
    ];

    if (skipPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Skip initialization in preview deployments to avoid conflicts
    if (process.env.VERCEL_ENV === 'preview') {
        console.log('Skipping middleware in preview environment');
        return NextResponse.next();
    }

    try {
        // Only initialize in production with a shorter timeout
        if (process.env.NODE_ENV === 'production') {
            const initTimeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Middleware timeout')), 5000)
            );

            const initialization = Promise.allSettled([
                getOrCreateDB(),
                getOrCreateStorage(),
            ]);

            await Promise.race([initialization, initTimeout]);
        }
    } catch (error) {
        console.error('Middleware error (non-blocking):', error);
        // Continue with request - don't block the app
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|users|vercel.svg|robots.txt|sitemap.xml).*)"
    ],
}
