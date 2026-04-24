import type { Metadata } from 'next'
import Link from 'next/link'

const infoNavItems = [
  { id: 'tentang-kami',       label: 'Tentang Kami' },
  { id: 'kebijakan-privasi',  label: 'Kebijakan Privasi' },
  { id: 'syarat-penggunaan',  label: 'Syarat Penggunaan' },
  { id: 'hubungi-kami',       label: 'Hubungi Kami' },
]

export const metadata: Metadata = {
  title: 'Informasi',
  description:
    'Informasi resmi Aditek Security, termasuk profil perusahaan, kebijakan privasi, syarat penggunaan, dan kontak.',
}

export default function InformasiPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* subtle radial glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-gradient-to-b from-sky-100/60 to-transparent dark:from-sky-950/30 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-5 shadow-sm">
            <span className="size-1.5 rounded-full bg-sky-400" />
            Informasi Perusahaan
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
            Pusat Informasi
            <br className="hidden sm:block" />
            <span className="text-neutral-400 dark:text-neutral-500"> Aditek Security</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mb-10">
            Temukan profil perusahaan, kebijakan privasi, syarat penggunaan, dan informasi
            kontak kami di satu halaman.
          </p>

          {/* Quick Nav */}
          <div className="flex flex-wrap gap-2">
            {infoNavItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* ── Content ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-5">

        <div id="tentang-kami" className="scroll-mt-24">
          <InfoCard title="Tentang Kami">
            Aditek Security menyediakan solusi security system dan infrastruktur untuk organisasi
            yang membutuhkan standar operasional tinggi. Kami menggabungkan perangkat, integrasi,
            dan konsultasi implementasi agar sistem berjalan stabil dan terukur.
          </InfoCard>
        </div>

        <div id="kebijakan-privasi" className="scroll-mt-24">
          <InfoCard title="Kebijakan Privasi">
            Kami hanya mengumpulkan data yang dibutuhkan untuk proses penawaran, komunikasi,
            dan peningkatan layanan. Data pengguna dilindungi dengan kontrol akses internal,
            enkripsi, dan kebijakan retensi sesuai kebutuhan operasional.
          </InfoCard>
        </div>

        <div id="syarat-penggunaan" className="scroll-mt-24">
          <InfoCard title="Syarat Penggunaan">
            Pengguna wajib menggunakan platform secara legal dan tidak melakukan penyalahgunaan
            akses. Informasi teknis yang tersedia ditujukan untuk referensi implementasi dan dapat
            berubah mengikuti pembaruan produk, regulasi, serta ruang lingkup proyek.
          </InfoCard>
        </div>

        {/* Contact — sedikit berbeda tampilannya */}
        <div id="hubungi-kami" className="scroll-mt-24">
          <article className="group relative rounded-3xl border border-neutral-100 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

            <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
              Hubungi Kami
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
              Tim kami siap membantu kebutuhan asesmen lokasi, perencanaan anggaran, dan desain
              arsitektur sistem.
            </p>

            <ul className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: '✉', label: 'Email',    value: 'sales@aditeksecurity.id' },
                { icon: '☎', label: 'Telepon',  value: '+62 21 5555 0000' },
                { icon: '⌖', label: 'Alamat',   value: 'Jakarta Selatan, Indonesia' },
              ].map(({ icon, label, value }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 py-3.5"
                >
                  <span className="mt-0.5 text-base leading-none text-neutral-400">{icon}</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

      </section>

      {/* ── Footer note ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          © {new Date().getFullYear()} Aditek Security · Jakarta, Indonesia
        </p>
      </div>

    </main>
  )
}

type InfoCardProps = {
  title: string
  children: React.ReactNode
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <article className="group relative rounded-3xl border border-neutral-100 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute inset-x-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />
      <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-3 tracking-tight">
        {title}
      </h2>
      <div className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {children}
      </div>
    </article>
  )
}