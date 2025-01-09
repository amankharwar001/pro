// import { NextRequest, NextResponse } from 'next/server';
// import cookie from 'cookie';


// export async function middleware(request) {
//     const cookies = cookie.parse(request.headers.get('cookie') || '');
//     const token = cookies.token;
    
//     if (token && !request.nextUrl.pathname.startsWith('/admin')) {
//         return NextResponse.redirect(new URL('/admin', request.url));
//     }
//     if (!token && !request.nextUrl.pathname.startsWith('/admin/account/login')) {
//         return NextResponse.redirect(new URL('/admin/account/login', request.url));
//     }
//     return NextResponse.next();
// }
// export const config = {
//     matcher: ['/admin/:path*',"/account/login","/account/signup"],
// };








import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';
// import AdminModel from '@/models/AdminModel.js';

export async function middleware(request) {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.token;
    
    // If the user is not logged in and trying to access the login/signup page, allow it.
    // if (!token && (request.nextUrl.pathname.startsWith('/admin/account/login') || request.nextUrl.pathname.startsWith('/admin/account/signup'))) {
    //     return NextResponse.next();
    // }

    // // If the user is not logged in and trying to access any page in /admin, redirect to login page.
    // if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    //     return NextResponse.redirect(new URL('/admin/account/login', request.url));
    // }

    // If the user is logged in and trying to access login/signup pages, redirect to the admin dashboard.
    if (token && (request.nextUrl.pathname.startsWith('/admin/account/login') || request.nextUrl.pathname.startsWith('/admin/account/signup'))) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // If the user is logged in, allow access to the admin panel and its pages.
    if (token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // Default case, allow the request to proceed if no conditions are met.
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/admin/account/login', '/admin/account/signup'],
};
