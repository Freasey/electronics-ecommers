'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type AuthMode = 'login' | 'register'

type AuthSectionProps = {
  mode: AuthMode
}

const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL ?? ''

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function AuthSection({ mode }: AuthSectionProps) {
  const router = useRouter()
  const isLogin = mode === 'login'
  const hasApiBaseUrl = AUTH_API_BASE_URL.trim().length > 0
  const [enableBypass, setEnableBypass] = useState(!hasApiBaseUrl)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pageText = useMemo(
    () =>
      isLogin
        ? {
            eyebrow: 'Akses Akun',
            title: 'Masuk ke akun Anda',
            subtitle: 'Lanjutkan belanja elektronik favorit Anda dengan pengalaman yang lebih personal.',
            submitText: 'Masuk',
            altPrompt: 'Belum punya akun?',
            altLinkLabel: 'Daftar sekarang',
            altHref: '/daftar',
          }
        : {
            eyebrow: 'Buat Akun',
            title: 'Daftar akun baru',
            subtitle: 'Siapkan akun untuk checkout lebih cepat dan pantau riwayat transaksi Anda nanti.',
            submitText: 'Buat Akun',
            altPrompt: 'Sudah punya akun?',
            altLinkLabel: 'Masuk di sini',
            altHref: '/masuk',
          },
    [isLogin]
  )

  function validateForm() {
    if (!email.trim() || !password.trim()) {
      return 'Email dan password wajib diisi.'
    }

    if (!email.includes('@')) {
      return 'Masukkan format email yang valid.'
    }

    if (password.length < 6) {
      return 'Password minimal 6 karakter.'
    }

    if (!isLogin) {
      if (!name.trim()) {
        return 'Nama lengkap wajib diisi.'
      }

      if (confirmPassword !== password) {
        return 'Konfirmasi password belum sama.'
      }
    }

    return ''
  }

  async function submitToApi() {
    const endpoint = isLogin ? '/auth/login' : '/auth/register'
    const payload = isLogin
      ? { email: email.trim(), password }
      : { name: name.trim(), email: email.trim(), password }

    // Endpoint ini siap dipakai saat API auth sudah tersedia.
    const response = await fetch(`${AUTH_API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      let apiMessage = 'Autentikasi gagal. Coba lagi.'

      try {
        const body = (await response.json()) as { message?: string }
        if (body.message) {
          apiMessage = body.message
        }
      } catch {
        // Abaikan kegagalan parsing body jika API belum konsisten.
      }

      throw new Error(apiMessage)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const validationError = validateForm()
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      if (enableBypass) {
        await delay(500)
        setSuccessMessage(
          isLogin
            ? 'Bypass aktif. Anda masuk sebagai pengguna demo.'
            : 'Bypass aktif. Pendaftaran demo berhasil, lanjut ke login.'
        )

        if (isLogin) {
          router.push('/')
        } else {
          router.push('/masuk')
        }
        return
      }

      await submitToApi()
      setSuccessMessage(isLogin ? 'Login berhasil.' : 'Registrasi berhasil. Silakan login.')

      if (isLogin) {
        router.push('/')
      } else {
        router.push('/masuk')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <aside className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 p-6 sm:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-3">
            {pageText.eyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
            {pageText.title}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            {pageText.subtitle}
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-500 mb-1">
                Status API Auth
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {hasApiBaseUrl
                  ? 'Endpoint auth terdeteksi. Form siap melakukan request real.'
                  : 'Endpoint auth belum diset. Gunakan bypass sementara.'}
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-500 mb-1">
                Catatan
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Halaman ini fokus ke UI/UX dan alur form. Manajemen session akan disiapkan di tahap berikutnya.
              </p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Daffa Ardhana"
                  className={cn(
                    'w-full h-11 rounded-xl px-3.5 text-sm',
                    'border border-neutral-200 dark:border-neutral-700',
                    'bg-white dark:bg-neutral-900',
                    'text-neutral-900 dark:text-white',
                    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
                    'focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all'
                  )}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@email.com"
                className={cn(
                  'w-full h-11 rounded-xl px-3.5 text-sm',
                  'border border-neutral-200 dark:border-neutral-700',
                  'bg-white dark:bg-neutral-900',
                  'text-neutral-900 dark:text-white',
                  'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
                  'focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all'
                )}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimal 6 karakter"
                className={cn(
                  'w-full h-11 rounded-xl px-3.5 text-sm',
                  'border border-neutral-200 dark:border-neutral-700',
                  'bg-white dark:bg-neutral-900',
                  'text-neutral-900 dark:text-white',
                  'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
                  'focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all'
                )}
              />
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  Konfirmasi Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Ulangi password"
                  className={cn(
                    'w-full h-11 rounded-xl px-3.5 text-sm',
                    'border border-neutral-200 dark:border-neutral-700',
                    'bg-white dark:bg-neutral-900',
                    'text-neutral-900 dark:text-white',
                    'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
                    'focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all'
                  )}
                />
              </div>
            )}

            <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/70 p-3.5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableBypass}
                  onChange={(event) => setEnableBypass(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-300 dark:border-neutral-600"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Aktifkan bypass sementara jika API auth belum siap. Ini hanya untuk pengembangan UI.
                </span>
              </label>
            </div>

            {errorMessage && (
              <p className="text-sm rounded-xl border border-red-200 dark:border-red-900/70 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 px-3.5 py-2.5">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="text-sm rounded-xl border border-emerald-200 dark:border-emerald-900/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-3.5 py-2.5">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full h-11 rounded-xl text-sm font-medium transition-all',
                'bg-neutral-900 dark:bg-white text-white dark:text-black',
                'hover:bg-neutral-700 dark:hover:bg-neutral-200',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Memproses...' : pageText.submitText}
            </button>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              {pageText.altPrompt}{' '}
              <Link
                href={pageText.altHref}
                className="font-medium text-neutral-900 dark:text-white underline underline-offset-2"
              >
                {pageText.altLinkLabel}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}