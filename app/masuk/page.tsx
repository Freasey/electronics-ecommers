import type { Metadata } from 'next'
import AuthSection from '@/components/features/AuthSection'

export const metadata: Metadata = {
  title: 'Masuk',
  description:
    'Masuk ke portal Aditek Security melalui API internal dengan Supabase Auth di sisi server.',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <AuthSection mode="login" />
    </main>
  )
}