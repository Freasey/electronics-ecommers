import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/auth/supabaseServer'

type RegisterPayload = {
  name?: string
  email?: string
  password?: string
}

export async function POST(request: Request) {
  let payload: RegisterPayload

  try {
    payload = (await request.json()) as RegisterPayload
  } catch {
    return NextResponse.json({ message: 'Payload tidak valid.' }, { status: 400 })
  }

  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const password = payload.password ?? ''

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Nama, email, dan password wajib diisi.' }, { status: 400 })
  }

  if (!email.includes('@')) {
    return NextResponse.json({ message: 'Format email tidak valid.' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ message: 'Password minimal 6 karakter.' }, { status: 400 })
  }

  try {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: 'Registrasi berhasil. Silakan cek email untuk verifikasi akun.',
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: 'Terjadi kesalahan server saat registrasi.' }, { status: 500 })
  }
}
