// middleware.ts
import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  const publicRoutes = ['/', '/signup']
  const isPublicRoute = publicRoutes.includes(path)
  const isDashboardRoute = path.startsWith('/dashboard')

  // 🔐 Bloqueia acesso à dashboard se não estiver autenticado
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 🔁 Redireciona para /dashboard se usuário autenticado acessar rota pública
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)',
  ],
}
