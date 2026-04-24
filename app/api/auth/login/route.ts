import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/auth/supabaseServer'

type LoginPayload = {
  email?: string
  password?: string
}

export async function POST(request: Request) {
  let payload: LoginPayload

  try {
    payload = (await request.json()) as LoginPayload
  } catch {
    return NextResponse.json({ message: 'Payload tidak valid.' }, { status: 400 })
  }

  const email = payload.email?.trim() ?? ''
  const password = payload.password ?? ''

  if (!email || !password) {
    return NextResponse.json({ message: 'Email dan password wajib diisi.' }, { status: 400 })
  }

  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      return NextResponse.json({ message: error?.message ?? 'Login gagal.' }, { status: 401 })
    }

    const response = NextResponse.json(
      {
        message: 'Login berhasil.',
      },
      { status: 200 }
    )

    response.cookies.set('sb-access-token', data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: data.session.expires_in,
    })

    response.cookies.set('sb-refresh-token', data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (e) {
    return NextResponse.json({ message: 'Terjadi kesalahan server saat login.'+ (e as Error).message }, { status: 500 })
  }
}
