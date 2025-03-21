


// import { NextRequest, NextResponse } from 'next/server';
// import cookie from 'cookie';

// export async function middleware(request) {
//     const cookies = cookie.parse(request.headers.get('cookie') || '');
//     const token = cookies.token;

//     // Allow access to /admin/account/login and /admin/account/forgot-password without authentication
//     if (!token && (request.nextUrl.pathname.startsWith('/admin/account/login') || request.nextUrl.pathname.startsWith('/admin/account/forgot-password') || request.nextUrl.pathname.startsWith('/admin/account/reset-password'))) {
//         return NextResponse.next();
//     }

//     // If the user is logged in, allow access to the admin panel and its pages
//     if (token && request.nextUrl.pathname.startsWith('/admin')) {
//         return NextResponse.next();
//     }

//     // If the user is not logged in and trying to access any page in /admin, redirect to login page.
//     if (!token && request.nextUrl.pathname.startsWith('/admin')) {
//         return NextResponse.redirect(new URL('/admin/account/login', request.url));
//     }

//     // Default case, allow the request to proceed if no conditions are met.
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/admin/:path*', '/admin/account/login', '/admin/account/forgot-password','/admin/account/reset-password'],
// };









import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

export async function middleware(request) {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    const pathname = request.nextUrl.pathname;

    // ✅ Allow access to login & reset-password pages without authentication
    if (!token && (pathname.startsWith('/admin/account/login') || pathname.startsWith('/admin/account/forgot-password') || pathname.startsWith('/admin/account/reset-password'))) {
        return NextResponse.next();
    }

    // ✅ If logged in, allow access to the admin panel
    if (token && pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // ❌ If not logged in and trying to access /admin, redirect to login
    if (!token && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/account/login', request.url));
    }

    // ✅ Inject 'x-system-key' header for /sitemap.xml requests
    if (pathname === '/sitemap.xml') {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-system-key', process.env.NEXT_PUBLIC_SYSTEM_KEY || 'my-secret-key');

        const response = NextResponse.rewrite(new URL('/api/sitemap', request.url));
        response.headers.set('x-system-key', process.env.NEXT_PUBLIC_SYSTEM_KEY || 'my-secret-key');

        return response;
    }

    // ✅ Default case: allow all other requests
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/admin/account/login',
        '/admin/account/forgot-password',
        '/admin/account/reset-password',
        '/sitemap.xml', // ✅ Middleware will handle sitemap.xml
    ],
};
