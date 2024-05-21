/**
 * Middleware function for processing incoming requests.
 * @param {import('next').NextRequest} request - The incoming request object.
 */



export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token) {
    // Token not found, redirect to login page
    
  } 


  }