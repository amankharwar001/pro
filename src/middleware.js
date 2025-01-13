


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

















// import { NextRequest, NextResponse } from 'next/server';
// import cookie from 'cookie';

// // Dummy API Key (Store it securely in environment variables in production)
// const VALID_API_KEY = process.env.API_KEY || 'your-dummy-api-key'; // Set in your .env file

// // List of protected API folders
// const protectedApiFolders = [
//     '/api/aboutpage',    // Protect all routes under /api/aboutpage/*
//     '/api/adminpassword', // Protect all routes under /api/adminsetting/*
//     '/api/adminsetting', // Protect all routes under /api/adminsetting/*
//     '/api/blog',         // Protect all routes under /api/blog/*
//     '/api/common-term-policy-page',
//     '/api/commonseo',
//     '/api/contactpage',
//     '/api/gallery',
//     '/api/getintouch',
//     '/api/homepage',
//     '/api/partnerpage',
//     '/api/privacypage',
//     '/api/product',
//     '/api/refund-policy-page',
//     '/api/script',
//     '/api/sitemap',
//     '/api/term-condition-page',

//     // Add more API folders as needed
// ];

// export async function middleware(request) {
//     const cookies = cookie.parse(request.headers.get('cookie') || '');
//     const token = cookies.token; // User authentication token from cookies
//     const apiKey = request.headers.get('api-key'); // API Key from headers

//     const pathname = request.nextUrl.pathname;

//     // Allow public access to /api/public/* routes with API key validation
//     if (pathname.startsWith('/api/public')) {
//         if (!apiKey || apiKey !== VALID_API_KEY) {
//             return NextResponse.json({ error: 'Unauthorized: Invalid or missing API key' }, { status: 401 });
//         }
//     }

//     // Allow access to /admin/account/login, /forgot-password, and /reset-password without authentication
//     if (!token && (pathname.startsWith('/admin/account/login') ||
//         pathname.startsWith('/admin/account/forgot-password') ||
//         pathname.startsWith('/admin/account/reset-password'))) {
//         return NextResponse.next();
//     }

//     // Protect all routes under the specified folders
//     for (let folder of protectedApiFolders) {
//         if (pathname.startsWith(folder)) {
//             if (!token) {
//                 // Return unauthorized response if no token
//                 return NextResponse.json({ error: 'Unauthorized: Token is missing' }, { status: 401 });
//             }
//         }
//     }

//     // Handle /admin routes (requires cookie token for authentication)
//     if (pathname.startsWith('/admin') && !token) {
//         // Redirect to login if the user is not authenticated
//         return NextResponse.redirect(new URL('/admin/account/login', request.url));
//     }

//     // Default case, allow the request to proceed
//     return NextResponse.next();
// }



// export const config = {
//     matcher: [
//         '/api/aboutpage/:path*',   // Protect all routes under /api/aboutpage/*
//         '/api/adminpassword/:path*',   // Protect all routes under /api/aboutpage/*
//         '/api/adminsetting/:path*', // Protect all routes under /api/adminsetting/*
//         '/api/blog/:path*',         // Protect all routes under /api/blog/*
//         '/api/common-term-policy-page/:path*',
//         '/api/commonseo/:path*',
//         '/api/contactpage/:path*',
//         '/api/gallery/:path*',
//         '/api/getintouch/:path*',
//         '/api/homepage/:path*',
//         '/api/partnerpage/:path*',
//         '/api/privacypage/:path*',
//         '/api/product/:path*',
//         '/api/refund-policy-page/:path*',
//         '/api/script/:path*',
//         '/api/sitemap/:path*',
//         '/api/term-condition-page/:path*',
//         // Add more API folders as needed
//         '/admin/:path*',            // Match all /admin routes
//         '/admin/account/login',    // Login page for redirect if not authenticated
//         '/admin/account/forgot-password', // Forgot password page
//         '/admin/account/reset-password', // Reset password page
//         '/api/public/:path*',       // Match all /api/public routes (public routes should be excluded from token check)
//     ],
// };












