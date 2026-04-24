import type { Metadata } from 'next'
import AuthSection from '@/components/features/AuthSection'

export const metadata: Metadata = {
  title: 'Daftar',
  description:
    'Daftar akun baru Aditek Elektronik. Form siap terhubung API dan mendukung bypass sementara untuk pengembangan UI.',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <AuthSection mode="register" />
    </main>
  )
}