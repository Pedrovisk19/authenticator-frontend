import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  const privatePrefixes = ['/dashboard', '/admin', '/conta']; // 🔐 pastas protegidas
  const isPrivateRoute = privatePrefixes.some(prefix => path.startsWith(prefix));
  const isAuthRoute = ['/login', '/signup', '/reset-password', 'new-password-reset'].includes(path); // rotas públicas

  console.log(`Token: ${token}, Rota: ${path}, Privada: ${isPrivateRoute}, Pública: ${isAuthRoute}`);
  // 🔒 Bloqueia acesso às privadas sem token
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 🔁 Se logado, não deixa acessar rotas públicas como login ou signup
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)',
  ],
}
