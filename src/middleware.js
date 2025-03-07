


import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

export async function middleware(request) {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    // Allow access to /admin/account/login and /admin/account/forgot-password without authentication
    if (!token && (request.nextUrl.pathname.startsWith('/admin/account/login') || request.nextUrl.pathname.startsWith('/admin/account/forgot-password') || request.nextUrl.pathname.startsWith('/admin/account/reset-password'))) {
        return NextResponse.next();
    }

    // If the user is logged in, allow access to the admin panel and its pages
    if (token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // If the user is not logged in and trying to access any page in /admin, redirect to login page.
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/account/login', request.url));
    }

    // Default case, allow the request to proceed if no conditions are met.
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/admin/account/login', '/admin/account/forgot-password','/admin/account/reset-password'],
};






// import { NextResponse } from 'next/server';

// export async function middleware(request) {
//     const systemKey = process.env.NEXT_PUBLIC_SYSTEM_KEY;
//     const requestKey = request.headers.get('x-system-key');

//     console.log("🔑 Server System Key:", systemKey);
//     console.log("📩 Request System Key:", requestKey);

//     // Validate System Key
//     if (!requestKey || requestKey !== systemKey) {
//         console.log("❌ Unauthorized Access: Invalid System Key");
//         return NextResponse.json({ message: "Unauthorized Access" }, { status: 401 });
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/api/:path*'], // Apply middleware to API routes
// };






// import { NextResponse } from 'next/server';
// import cookie from 'cookie';

// export async function middleware(request) {
//     const { pathname } = request.nextUrl;
//     const cookies = cookie.parse(request.headers.get('cookie') || '');
//     const token = cookies.token;

//     // 🔹 API Authentication using x-system-key
//     if (pathname.startsWith('/api/')) {
//         const systemKey = process.env.NEXT_PUBLIC_SYSTEM_KEY;
//         const requestKey = request.headers.get('x-system-key');

//         console.log("🔑 Server System Key:", systemKey);
//         console.log("📩 Request System Key:", requestKey);

//         if (!requestKey || requestKey !== systemKey) {
//             console.log("❌ Unauthorized Access: Invalid System Key");
//             return NextResponse.json({ message: "Unauthorized Access" }, { status: 401 });
//         }
//         return NextResponse.next();
//     }

//     // 🔹 Allow access to login, forgot password & reset password without authentication
//     if (
//         pathname.startsWith('/admin/account/login') ||
//         pathname.startsWith('/admin/account/forgot-password') ||
//         pathname.startsWith('/admin/account/reset-password')
//     ) {
//         return NextResponse.next();
//     }

//     // 🔹 Protect Admin Pages (Require Authentication)
//     if (pathname.startsWith('/admin')) {
//         if (!token) {
//             console.log("❌ Unauthorized: Redirecting to login");
//             return NextResponse.redirect(new URL('/admin/account/login', request.url));
//         }
//     }

//     // ✅ Default: Allow access
//     return NextResponse.next();
// }

// // Middleware applies to API & Admin routes
// export const config = {
//     matcher: ['/api/:path*', '/admin/:path*'],
// };
