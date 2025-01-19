import Cookies from "js-cookie";
import { NextResponse } from "next/server"; // Import utilities to handle responses
import type { NextRequest } from "next/server"; // Type for the incoming request object

// Middleware function to handle authentication
export function middleware(req: NextRequest) {
  // Step 1: Retrieve the authentication token from cookies
  const token = req.cookies.get("token")?.value; // Safely retrieve the 'token' cookie

  console.log(token, "token from middleware");

  // Step 2: Define the routes that require authentication
  const protectedRoutes = ["/dashboard"]; // Add all private routes here

  // Step 3: Check if the current route is a protected route
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // Step 4: If no token exists, redirect to the login page
    if (!token) {
      const loginUrl = new URL("/login", req.url); // Build the full login URL
      return NextResponse.redirect(loginUrl); // Redirect to the login page
    }
  }

  // Step 5: If the route is not protected or the user is authenticated, allow the request
  return NextResponse.next(); // Proceed with the request
}

// Configuration for the middleware
export const config = {
  matcher: ["/dashboard/:path*"], // Specify protected routes
};
