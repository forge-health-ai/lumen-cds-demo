import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Route pharma-claims-demo subdomain to /demo/pharma
  if (hostname.startsWith('pharma-claims-demo')) {
    const url = request.nextUrl.clone();
    const path = url.pathname;
    
    // Don't rewrite if already on /demo/pharma path or static assets
    if (path.startsWith('/demo/pharma') || path.startsWith('/_next') || path.startsWith('/api') || path.includes('.')) {
      return NextResponse.next();
    }
    
    // Map routes
    if (path === '/' || path === '') {
      url.pathname = '/demo/pharma';
    } else if (path === '/without') {
      url.pathname = '/demo/pharma/without';
    } else if (path === '/with') {
      url.pathname = '/demo/pharma/with';
    } else if (path === '/compare') {
      url.pathname = '/demo/pharma/compare';
    }
    
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
