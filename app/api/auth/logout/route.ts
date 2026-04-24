import { NextResponse } from 'next/server'

function clearAuthCookies(response: NextResponse) {
  response.cookies.set('sb-access-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  response.cookies.set('sb-refresh-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

export async function POST(request: Request) {
  const redirectTarget = new URL('/masuk', request.url)
  const response = NextResponse.redirect(redirectTarget)
  clearAuthCookies(response)
  return response
}
