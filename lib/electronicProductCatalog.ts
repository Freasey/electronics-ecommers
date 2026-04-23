export interface ElectronicCatalogItem {
  id: number
  name: string
  category: string
  summary: string
  badge?: string
  visualTone: string
  searchTokens: string[]
  isRecent: boolean
  isFeaturedOnHome?: boolean
}

export const electronicProductCatalog: ElectronicCatalogItem[] = [
  {
    id: 1,
    name: 'Smart Television 55 Inch UHD',
    category: 'Televisi',
    summary: 'Panel 4K dengan dukungan HDR untuk kualitas visual tajam di ruang keluarga.',
    badge: 'Recent',
    visualTone: 'linear-gradient(145deg, #111111 0%, #2f2f2f 100%)',
    searchTokens: ['televisi', 'smart tv', 'uhd', '4k', 'visual'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 2,
    name: 'Laptop Ultrabook 14 Inch',
    category: 'Laptop',
    summary: 'Performa stabil untuk produktivitas harian dengan desain ringkas dan ringan.',
    badge: 'Featured',
    visualTone: 'linear-gradient(145deg, #161616 0%, #505050 100%)',
    searchTokens: ['laptop', 'ultrabook', 'komputasi', 'produktif'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 3,
    name: 'Headphone Nirkabel ANC',
    category: 'Audio',
    summary: 'Peredam bising aktif dengan suara detail untuk hiburan dan rapat daring.',
    badge: 'Recent',
    visualTone: 'linear-gradient(145deg, #121212 0%, #3b3b3b 100%)',
    searchTokens: ['headphone', 'audio', 'anc', 'nirkabel'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 4,
    name: 'Speaker Pintar Asisten Suara',
    category: 'Audio',
    summary: 'Integrasi asisten suara dengan kualitas audio jernih untuk rumah modern.',
    visualTone: 'linear-gradient(145deg, #1b1b1b 0%, #474747 100%)',
    searchTokens: ['speaker', 'audio', 'asisten suara', 'smart home'],
    isRecent: false,
    isFeaturedOnHome: true,
  },
  {
    id: 5,
    name: 'Kulkas Dua Pintu Inverter',
    category: 'Perangkat Rumah',
    summary: 'Konsumsi daya lebih efisien dengan pendinginan merata untuk kebutuhan keluarga.',
    visualTone: 'linear-gradient(145deg, #181818 0%, #404040 100%)',
    searchTokens: ['kulkas', 'inverter', 'rumah tangga', 'hemat energi'],
    isRecent: false,
    isFeaturedOnHome: true,
  },
  {
    id: 6,
    name: 'Mesin Cuci Front Load 8 Kg',
    category: 'Perangkat Rumah',
    summary: 'Program pencucian variatif untuk perlindungan kain dan hasil bersih maksimal.',
    visualTone: 'linear-gradient(145deg, #101010 0%, #383838 100%)',
    searchTokens: ['mesin cuci', 'front load', 'rumah tangga', '8 kg'],
    isRecent: false,
    isFeaturedOnHome: false,
  },
  {
    id: 7,
    name: 'Monitor Gaming 27 Inch 165Hz',
    category: 'Komputasi',
    summary: 'Refresh rate tinggi dengan warna konsisten untuk bermain dan bekerja kreatif.',
    badge: 'Recent',
    visualTone: 'linear-gradient(145deg, #0f0f0f 0%, #333333 100%)',
    searchTokens: ['monitor', 'gaming', '165hz', 'komputasi'],
    isRecent: true,
    isFeaturedOnHome: false,
  },
  {
    id: 8,
    name: 'Pendingin Ruangan Inverter 1 PK',
    category: 'Perangkat Rumah',
    summary: 'Sistem pendingin cepat dengan kontrol suhu stabil untuk ruangan menengah.',
    visualTone: 'linear-gradient(145deg, #131313 0%, #434343 100%)',
    searchTokens: ['ac', 'pendingin ruangan', 'inverter', '1 pk'],
    isRecent: false,
    isFeaturedOnHome: false,
  },
]
