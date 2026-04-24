import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeJwt } from 'jose'

const authPages = ['/masuk', '/daftar']

interface JwtPayload {
    app_metadata?: {
        role?: string
    }
}
export async function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl
    const token = request.cookies.get('sb-access-token')?.value

    let role: string | null = null

    // ... di dalam fungsi proxy:
    if (token) {
        try {
            // 1. Cek algoritma token
            const payload : JwtPayload= decodeJwt(token)
            role = payload.app_metadata?.role as string
        } catch (e) {
            console.error('Error:', (e as Error).message)
        }
    }

    const isAuthenticated = Boolean(token)
    if (pathname.startsWith('/dashboard') && !isAuthenticated) {
        const loginUrl = new URL('/masuk', request.url)
        loginUrl.searchParams.set('redirect', pathname + search)
        return NextResponse.redirect(loginUrl)
    }
    if (pathname.startsWith('/dashboard') && role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (authPages.includes(pathname) && isAuthenticated && role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}