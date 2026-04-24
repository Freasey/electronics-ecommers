import type { Metadata } from 'next'
import AuthSection from '@/components/features/AuthSection'

export const metadata: Metadata = {
  title: 'Daftar',
  description:
    'Daftarkan akun perusahaan di Aditek Security. Form terhubung ke API internal dengan Supabase Auth di sisi server.',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <AuthSection mode="register" />
    </main>
  )
}