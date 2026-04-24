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
    slug: 'ai-cctv-4k-poe-8mp',
    name: 'AI CCTV 4K PoE 8MP',
    category: 'Surveillance & Monitoring',
    summary: 'Kamera pengawas 4K berbasis AI untuk deteksi intrusi dan pemantauan area kritikal.',
    description:
      'Kamera CCTV 8MP dengan analitik AI untuk deteksi objek, perimeter breach, dan monitoring real-time. Dirancang untuk pabrik, gudang, dan area operasional berisiko tinggi.',
    price: 8899000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Resolusi 4K 8MP', 'AI human/vehicle detection', 'PoE single-cable', 'IP67 weatherproof'],
    badge: 'Baru',
    visualTone: 'linear-gradient(145deg, #111111 0%, #2f2f2f 100%)',
    searchTokens: ['cctv', 'surveillance', 'kamera ai', '4k', 'poe'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 2,
    slug: 'network-video-recorder-32-channel',
    name: 'Network Video Recorder 32 Channel',
    category: 'Surveillance & Monitoring',
    summary: 'Pusat perekaman video skala besar untuk manajemen puluhan kamera IP enterprise.',
    description:
      'NVR 32 channel dengan throughput tinggi untuk merekam dan mengelola stream multi-site. Cocok untuk command center, kawasan industri, dan bangunan komersial bertingkat.',
    price: 15999000,
    stockStatus: 'Tersedia',
    keyFeatures: ['32 IP channel', 'H.265+ compression', 'RAID-ready storage', 'Remote centralized access'],
    badge: 'Andalan',
    visualTone: 'linear-gradient(145deg, #161616 0%, #505050 100%)',
    searchTokens: ['nvr', 'video recorder', 'cctv server', 'monitoring'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 3,
    slug: 'door-access-controller-4-door',
    name: 'Door Access Controller 4 Door',
    category: 'Access Control',
    summary: 'Kontrol akses empat pintu dengan autentikasi kartu, PIN, dan integrasi biometrik.',
    description:
      'Controller akses untuk area terbatas dengan kebijakan otorisasi bertingkat. Mendukung integrasi ke sistem HR, log audit, dan manajemen pengunjung.',
    price: 7699000,
    stockStatus: 'Tersedia',
    keyFeatures: ['4-door controller', 'Card + PIN + biometric ready', 'Anti-passback support', 'Audit trail export'],
    badge: 'Baru',
    visualTone: 'linear-gradient(145deg, #121212 0%, #3b3b3b 100%)',
    searchTokens: ['access control', 'door controller', 'rfid', 'biometrik'],
    isRecent: true,
    isFeaturedOnHome: true,
  },
  {
    id: 4,
    slug: 'bi-directional-turnstile-gate',
    name: 'Bi-directional Turnstile Gate',
    category: 'Access Control',
    summary: 'Gerbang turnstile dua arah untuk kontrol arus personel di area dengan traffic tinggi.',
    description:
      'Turnstile industri dengan sensor anti-tailgating dan integrasi akses karyawan. Ideal untuk lobby korporat, kawasan manufaktur, dan data center.',
    price: 21499000,
    stockStatus: 'Stok Terbatas',
    keyFeatures: ['Bidirectional lane', 'Anti-tailgating sensor', 'Emergency fail-safe mode', 'Access API integration'],
    visualTone: 'linear-gradient(145deg, #1b1b1b 0%, #474747 100%)',
    searchTokens: ['turnstile', 'gate akses', 'physical security', 'entry control'],
    isRecent: false,
    isFeaturedOnHome: true,
  },
  {
    id: 5,
    slug: 'addressable-fire-alarm-control-panel',
    name: 'Addressable Fire Alarm Control Panel',
    category: 'Fire Safety',
    summary: 'Panel alarm kebakaran addressable untuk deteksi dini dan respons insiden terstruktur.',
    description:
      'FACP addressable dengan zoning fleksibel dan notifikasi multi-channel untuk mitigasi kebakaran. Cocok untuk gedung perkantoran, rumah sakit, dan fasilitas publik.',
    price: 18399000,
    stockStatus: 'Tersedia',
    keyFeatures: ['Addressable loop control', 'Multi-zone alerting', 'Integration with BMS', 'Event history logging'],
    visualTone: 'linear-gradient(145deg, #181818 0%, #404040 100%)',
    searchTokens: ['fire alarm', 'facp', 'kebakaran', 'life safety'],
    isRecent: false,
    isFeaturedOnHome: true,
  },
  {
    id: 6,
    slug: 'infrastructure-monitoring-appliance',
    name: 'Infrastructure Monitoring Appliance',
    category: 'Network Infrastructure',
    summary: 'Perangkat monitoring terpusat untuk visibilitas performa jaringan dan server kritikal.',
    description:
      'Appliance observability untuk memantau latency, health service, dan kapasitas infrastruktur. Membantu tim IT menurunkan downtime dengan alert proaktif.',
    price: 13999000,
    stockStatus: 'Preorder',
    keyFeatures: ['Real-time performance metrics', 'Multi-site dashboard', 'Custom SLA alerts', 'Historical trend analytics'],
    visualTone: 'linear-gradient(145deg, #101010 0%, #383838 100%)',
    searchTokens: ['monitoring', 'observability', 'network health', 'infrastructure'],
    isRecent: false,
    isFeaturedOnHome: false,
  },
  {
    id: 7,
    slug: 'managed-industrial-poe-switch-24-port',
    name: 'Managed Industrial PoE Switch 24 Port',
    category: 'Network Infrastructure',
    summary: 'Switch industri PoE untuk konektivitas perangkat security pada lingkungan operasional berat.',
    description:
      'Managed switch 24 port dengan VLAN, QoS, dan redundansi ring untuk jaringan mission-critical. Mendukung perangkat CCTV, access point, dan sensor lapangan.',
    price: 11299000,
    stockStatus: 'Tersedia',
    keyFeatures: ['24x Gigabit PoE ports', 'Industrial temperature grade', 'VLAN & QoS support', 'Redundant uplink'],
    badge: 'Baru',
    visualTone: 'linear-gradient(145deg, #0f0f0f 0%, #333333 100%)',
    searchTokens: ['switch', 'poe', 'network', 'industrial'],
    isRecent: true,
    isFeaturedOnHome: false,
  },
  {
    id: 8,
    slug: 'online-ups-10kva-redundant',
    name: 'Online UPS 10kVA Redundant',
    category: 'Power & Continuity',
    summary: 'Sistem UPS online untuk menjaga layanan kritikal tetap berjalan saat gangguan daya.',
    description:
      'UPS 10kVA dengan topologi online double-conversion untuk perlindungan server room dan perangkat security. Menjamin kontinuitas operasi saat listrik tidak stabil.',
    price: 26999000,
    stockStatus: 'Stok Terbatas',
    keyFeatures: ['10kVA online topology', 'Redundant battery modules', 'Automatic voltage regulation', 'Remote health monitoring'],
    visualTone: 'linear-gradient(145deg, #131313 0%, #434343 100%)',
    searchTokens: ['ups', 'power backup', 'continuity', 'server room'],
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
