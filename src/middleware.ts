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

// middleware.ts
// Place this file in your root directory (same level as package.json)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getOrCreateDB from './models/server/dbsetup';
import getOrCreateStorage from './models/server/storageSetup';

// Track if setup has been completed to avoid running it multiple times
let setupCompleted = false;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    // Run database and storage setup only once
    if (!setupCompleted) {
        try {
            await Promise.all([
                getOrCreateDB(),
                getOrCreateStorage(),
            ]);
            setupCompleted = true;
            console.log('Database and storage setup completed');
        } catch (error) {
            console.error('Setup failed:', error);
            // Continue anyway to avoid blocking requests
        }
    }

    // Get session from cookies
    const authToken = request.cookies.get('a_session_console')?.value;

    // Static files and API routes - always allow
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/images/') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    // Public routes that don't need authentication
    const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/questions',
        '/about',
        '/privacy-policy',
        '/terms-of-service'
    ];

    // Allow public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Profile routes (/users/[userId]/[userSlug]) - ALWAYS ALLOW
    if (pathname.startsWith('/users/')) {
        return NextResponse.next();
    }

    // Question detail pages (/questions/[quesId]/[quesName]) - Public
    if (pathname.match(/^\/questions\/[^\\/]+\/[^\\/]+$/)) {
        return NextResponse.next();
    }

    // Only protect specific routes that absolutely need authentication
    const protectedRoutes = ['/questions/ask'];

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Only redirect if it's a protected route and no auth token
    if (isProtectedRoute && !authToken) {
        url.pathname = '/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // For all other routes, just continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

// Alternative simpler middleware if the above causes issues:
/*
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only handle specific protected routes
  if (pathname.startsWith('/questions/ask')) {
    const session = request.cookies.get('a_session_console')?.value;
    
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/questions/ask/:path*']
};
*/
