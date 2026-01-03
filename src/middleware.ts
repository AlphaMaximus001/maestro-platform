import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the zones
const isStudentRoute = createRouteMatcher(['/dashboard(.*)']);
const isTeacherRoute = createRouteMatcher(['/teacher/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();
  const userId = authObject.userId;
  const sessionClaims = authObject.sessionClaims;
  
  // Get the role from the token
  const role = (sessionClaims?.metadata as any)?.role;

  // 1. IF ADMIN IS LOGGED IN
  if (userId && role === 'admin') {
    // If they try to go to student dashboard or teacher dashboard, FORCE them to Admin Panel
    if (isStudentRoute(req) || isTeacherRoute(req)) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  // 2. IF TEACHER IS LOGGED IN
  if (userId && role === 'teacher') {
    // If they try to go to student dashboard, FORCE them to Teacher Dashboard
    if (isStudentRoute(req)) {
      return NextResponse.redirect(new URL('/teacher/dashboard', req.url));
    }
    // Prevent them from accessing Admin
    if (isAdminRoute(req)) {
      return NextResponse.redirect(new URL('/teacher/dashboard', req.url));
    }
  }

  // 3. IF STUDENT IS LOGGED IN (or No Role)
  if (userId && (!role || role === 'student')) {
    // Prevent them from accessing Admin or Teacher routes
    if (isAdminRoute(req) || isTeacherRoute(req)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // 4. Protect routes from logged-out users
  if ((isStudentRoute(req) || isTeacherRoute(req) || isAdminRoute(req)) && !userId) {
    return authObject.redirectToSignIn();
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};