import type { Metadata } from 'next'
import AuthSection from '@/components/features/AuthSection'

export const metadata: Metadata = {
  title: 'Masuk',
  description:
    'Masuk ke akun Aditek Elektronik. Form siap terhubung API dan mendukung bypass sementara saat API belum aktif.',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <AuthSection mode="login" />
    </main>
  )
}