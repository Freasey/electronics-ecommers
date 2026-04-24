import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authPages = ['/masuk', '/daftar']

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isAuthenticated = Boolean(request.cookies.get('sb-access-token')?.value)

  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    const loginUrl = new URL('/masuk', request.url)
    const redirectPath = `${pathname}${search}`
    loginUrl.searchParams.set('redirect', redirectPath)
    return NextResponse.redirect(loginUrl)
  }

  if (authPages.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/masuk', '/daftar'],
}
