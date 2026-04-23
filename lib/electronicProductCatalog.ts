export interface ElectronicCatalogItem {
  id: number
  slug: string
  name: string
  category: string
  summary: string
  description: string
  price: number
  stockStatus: 'Tersedia' | 'Stok Terbatas' | 'Preorder'
  keyFeatures: string[]
  badge?: string
  visualTone: string
  searchTokens: string[]
  isRecent: boolean
  isFeaturedOnHome?: boolean
}

export const electronicProductCatalog: ElectronicCatalogItem[] = [
  {
    id: 1,
    slug: 'smart-television-55-inch-uhd',
    name: 'Smart Television 55 Inch UHD',
    category: 'Televisi',
    summary: 'Panel 4K dengan dukungan HDR untuk kualitas visual tajam di ruang keluarga.',
    description:
      'Smart TV 55 inci dengan panel UHD dan dukungan HDR untuk pengalaman visual yang detail. Cocok untuk hiburan keluarga, streaming, dan konsol game modern.',
    price: 7499000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Resolusi 4K UHD', 'HDR10', 'Wi-Fi + Bluetooth', '3x HDMI, 2x USB'],
    badge: 'Recent',
    visualTone: 'linear-gradient(145deg, #111111 0%, #2f2f2f 100%)',
    searchTokens: ['televisi', 'smart tv', 'uhd', '4k', 'visual'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 2,
    slug: 'laptop-ultrabook-14-inch',
    name: 'Laptop Ultrabook 14 Inch',
    category: 'Laptop',
    summary: 'Performa stabil untuk produktivitas harian dengan desain ringkas dan ringan.',
    description:
      'Laptop ultrabook 14 inci dengan desain tipis dan baterai tahan lama untuk kebutuhan kerja mobile, meeting daring, dan aktivitas multitasking harian.',
    price: 11999000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Layar 14 inci FHD', 'RAM 16GB', 'SSD 512GB', 'Bobot ringan'],
    badge: 'Featured',
    visualTone: 'linear-gradient(145deg, #161616 0%, #505050 100%)',
    searchTokens: ['laptop', 'ultrabook', 'komputasi', 'produktif'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 3,
    slug: 'headphone-nirkabel-anc',
    name: 'Headphone Nirkabel ANC',
    category: 'Audio',
    summary: 'Peredam bising aktif dengan suara detail untuk hiburan dan rapat daring.',
    description:
      'Headphone nirkabel dengan Active Noise Cancelling untuk fokus maksimal saat bekerja atau menikmati musik. Profil suara seimbang dan nyaman dipakai lama.',
    price: 1699000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Active Noise Cancelling', 'Bluetooth 5.3', 'Daya tahan hingga 35 jam', 'Fast charging'],
    badge: 'Recent',
    visualTone: 'linear-gradient(145deg, #121212 0%, #3b3b3b 100%)',
    searchTokens: ['headphone', 'audio', 'anc', 'nirkabel'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 4,
    slug: 'speaker-pintar-asisten-suara',
    name: 'Speaker Pintar Asisten Suara',
    category: 'Audio',
    summary: 'Integrasi asisten suara dengan kualitas audio jernih untuk rumah modern.',
    description:
      'Speaker pintar dengan dukungan perintah suara untuk kontrol musik, pengingat, dan perangkat rumah pintar. Cocok untuk ruang keluarga dan kamar.',
    price: 1299000,
    stockStatus: 'Stok Terbatas',
    keyFeatures: ['Asisten suara terintegrasi', 'Audio 360 derajat', 'Kontrol smart home', 'Mikrofon jarak jauh'],
    visualTone: 'linear-gradient(145deg, #1b1b1b 0%, #474747 100%)',
    searchTokens: ['speaker', 'audio', 'asisten suara', 'smart home'],
    isRecent: false,
    isFeaturedOnHome: true,
  },
  {
    id: 5,
    slug: 'kulkas-dua-pintu-inverter',
    name: 'Kulkas Dua Pintu Inverter',
    category: 'Perangkat Rumah',
    summary: 'Konsumsi daya lebih efisien dengan pendinginan merata untuk kebutuhan keluarga.',
    description:
      'Kulkas dua pintu dengan teknologi inverter untuk konsumsi energi lebih hemat dan suhu stabil. Kompartemen luas untuk kebutuhan keluarga harian.',
    price: 5399000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Teknologi inverter', 'Sistem pendingin merata', 'Rak tempered glass', 'Mode hemat energi'],
    visualTone: 'linear-gradient(145deg, #181818 0%, #404040 100%)',
    searchTokens: ['kulkas', 'inverter', 'rumah tangga', 'hemat energi'],
    isRecent: false,
    isFeaturedOnHome: true,
  },
  {
    id: 6,
    slug: 'mesin-cuci-front-load-8-kg',
    name: 'Mesin Cuci Front Load 8 Kg',
    category: 'Perangkat Rumah',
    summary: 'Program pencucian variatif untuk perlindungan kain dan hasil bersih maksimal.',
    description:
      'Mesin cuci front load dengan kapasitas 8 kg yang mendukung berbagai mode pencucian. Dirancang untuk menjaga kualitas kain sekaligus efisien air.',
    price: 4599000,
    stockStatus: 'Preorder',
    keyFeatures: ['Kapasitas 8 kg', 'Mode anti-kusut', 'Pencucian cepat 15 menit', 'Drum care'],
    visualTone: 'linear-gradient(145deg, #101010 0%, #383838 100%)',
    searchTokens: ['mesin cuci', 'front load', 'rumah tangga', '8 kg'],
    isRecent: false,
    isFeaturedOnHome: false,
  },
  {
    id: 7,
    slug: 'monitor-gaming-27-inch-165hz',
    name: 'Monitor Gaming 27 Inch 165Hz',
    category: 'Komputasi',
    summary: 'Refresh rate tinggi dengan warna konsisten untuk bermain dan bekerja kreatif.',
    description:
      'Monitor gaming 27 inci dengan refresh rate 165Hz untuk gerakan yang lebih mulus. Cocok untuk gaming kompetitif, editing, dan produktivitas visual.',
    price: 3899000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Refresh rate 165Hz', 'Panel 27 inci', 'Adaptive sync', 'Low blue light mode'],
    badge: 'Recent',
    visualTone: 'linear-gradient(145deg, #0f0f0f 0%, #333333 100%)',
    searchTokens: ['monitor', 'gaming', '165hz', 'komputasi'],
    isRecent: true,
    isFeaturedOnHome: false,
  },
  {
    id: 8,
    slug: 'pendingin-ruangan-inverter-1-pk',
    name: 'Pendingin Ruangan Inverter 1 PK',
    category: 'Perangkat Rumah',
    summary: 'Sistem pendingin cepat dengan kontrol suhu stabil untuk ruangan menengah.',
    description:
      'Pendingin ruangan inverter 1 PK dengan pendinginan cepat dan suhu stabil. Dirancang untuk kenyamanan harian dengan konsumsi daya yang lebih hemat.',
    price: 3299000,
    stockStatus: 'Stok Terbatas',
    keyFeatures: ['Kapasitas 1 PK', 'Mode hemat energi', 'Filter udara', 'Turbo cooling'],
    visualTone: 'linear-gradient(145deg, #131313 0%, #434343 100%)',
    searchTokens: ['ac', 'pendingin ruangan', 'inverter', '1 pk'],
    isRecent: false,
    isFeaturedOnHome: false,
  },
]

export function getElectronicProductById(id: number) {
  return electronicProductCatalog.find((item) => item.id === id)
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}
