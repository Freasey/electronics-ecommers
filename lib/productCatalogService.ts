import {
  type ElectronicCatalogItem,
  type ElectronicCatalogProductImage,
} from '@/lib/electronicProductCatalog'
import { createSupabaseServerClient } from '@/lib/auth/supabaseServer'

type CategoryStatus = string

type ProductCatalogFilter = {
  query?: string
  categories?: string[]
  featuredOnly?: boolean
  recentOnly?: boolean
}

type SupabaseProductRecord = Record<string, unknown>

type SupabaseCategoryRecord = {
  id?: unknown
  name?: unknown
  nama?: unknown
}

type SupabaseMasterCategoryRecord = {
  id?: unknown
  name?: unknown
  sequence?: unknown
  description?: unknown
}

type SupabaseProductImageRecord = {
  id?: unknown
  image_url?: unknown
  is_primary?: unknown
  position?: unknown
}

export type ProductCategorySummary = {
  name: string
  href: string
  totalProducts: number
  totalLabel: string
}

export type DashboardProductRow = {
  id: number
  sku: string
  name: string
  description: string
  category: string
  category_id: string | null
  status: CategoryStatus
  features: string[]
  is_recent: boolean
  is_featured: boolean
  images: ElectronicCatalogProductImage[]
}

export type DashboardCategoryRow = {
  id: string
  name: string
  sequence: number
  description: string
}

function toStringValue(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function toNumberValue(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsedValue = Number(value)
    if (Number.isFinite(parsedValue)) {
      return parsedValue
    }
  }

  return undefined
}

function toBooleanValue(value: unknown) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value === 1
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1'
  }

  return undefined
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean)
  }

  return []
}

function parseFeaturesValue(value: unknown) {
  if (Array.isArray(value)) {
    return toStringArray(value)
  }

  if (typeof value !== 'string') {
    return []
  }

  const normalizedValue = value.trim()
  if (!normalizedValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(normalizedValue) as unknown
    if (Array.isArray(parsedValue)) {
      return toStringArray(parsedValue)
    }
  } catch {
    return normalizedValue
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function toCategoryRecord(value: unknown): SupabaseCategoryRecord | undefined {
  if (Array.isArray(value)) {
    const [firstCategory] = value
    return toCategoryRecord(firstCategory)
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  return value as SupabaseCategoryRecord
}

function toProductImageRecords(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return undefined
      }

      const record = item as SupabaseProductImageRecord
      const id = toStringValue(record.id)
      const imageUrl = toStringValue(record.image_url)

      if (!id || !imageUrl) {
        return undefined
      }

      return {
        id,
        image_url: imageUrl,
        is_primary: toBooleanValue(record.is_primary) ?? false,
        position: toNumberValue(record.position) ?? 0,
      }
    })
    .filter((image): image is ElectronicCatalogProductImage => image !== undefined)
    .sort((firstImage, secondImage) => {
      const byPosition = firstImage.position - secondImage.position
      if (byPosition !== 0) {
        return byPosition
      }

      if (firstImage.is_primary === secondImage.is_primary) {
        return 0
      }

      return firstImage.is_primary ? -1 : 1
    })
}

function buildSearchTokens(product: Pick<ElectronicCatalogItem, 'name' | 'category' | 'description' | 'features'>) {
  return Array.from(
    new Set([
      ...product.name.toLowerCase().split(' '),
      ...product.category.toLowerCase().split(' '),
      ...product.description.toLowerCase().split(' '),
      ...product.features.map((item) => item.toLowerCase()).join(' ').split(' '),
    ])
  ).filter(Boolean)
}

function mapSupabaseProductToCatalogItem(record: SupabaseProductRecord) {
  const id = toNumberValue(record.id)
  if (id === undefined) {
    return undefined
  }

  const features = parseFeaturesValue(record.features)
  const category = toCategoryRecord(record.kategori)
  const categoryId = toStringValue(category?.id) || toStringValue(record.kategori_id) || null
  const categoryName = toStringValue(category?.name) || toStringValue(category?.nama)
  const images = toProductImageRecords(record.product_images)
  const primaryImage = images.find((image) => image.is_primary) ?? images[0]
  const product: ElectronicCatalogItem = {
    id,
    name: toStringValue(record.name),
    category: categoryName,
    category_id: categoryId,
    category_ref:
      categoryId !== null && categoryName
        ? {
            id: categoryId,
            name: categoryName,
          }
        : null,
    description: toStringValue(record.description),
    status: toStringValue(record.status),
    features,
    is_recent: toBooleanValue(record.is_recent) ?? false,
    is_featured: toBooleanValue(record.is_featured) ?? false,
    images,
    primary_image_url: primaryImage?.image_url ?? '',
  }

  return product
}

async function getCatalogProductsAsync(): Promise<ElectronicCatalogItem[]> {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('produk')
      .select(`
          *,
          kategori (
          id,
          name
            ),
            product_images (
            id,
            image_url,
            is_primary,
            position
          )
      `)
      .order('id', { ascending: true })
    if (error || !Array.isArray(data) || data.length === 0) {
      return []
    }
    const mappedProducts = data
      .map((record) => mapSupabaseProductToCatalogItem(record as SupabaseProductRecord))
      .filter((product): product is ElectronicCatalogItem => product !== undefined)
    return mappedProducts
  } catch {
    return []
  }
}

async function getMasterCategoriesAsync(): Promise<DashboardCategoryRow[]> {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from('kategori')
      .select('*')
      .order('id', { ascending: true })

    if (error || !Array.isArray(data) || data.length === 0) {
      return []
    }

    return data
      .map((record) => {
        const mappedCategory = record as SupabaseMasterCategoryRecord
        const id = toStringValue(mappedCategory.id)
        const name = toStringValue(mappedCategory.name)

        if (!id || !name) {
          return undefined
        }

        return {
          id,
          name,
          sequence: toNumberValue(mappedCategory.sequence) ?? 0,
          description: toStringValue(mappedCategory.description),
        }
      })
      .filter((category): category is DashboardCategoryRow => category !== undefined)
  } catch {
    return []
  }
}

function filterProducts(catalog: ElectronicCatalogItem[], filter: ProductCatalogFilter = {}) {
  const normalizedQuery = filter.query?.toLowerCase().trim() ?? ''
  const selectedCategories = new Set(
    (filter.categories ?? []).map((category) => category.trim()).filter(Boolean)
  )

  return catalog.filter((product) => {
    if (filter.featuredOnly && !product.is_featured) {
      return false
    }

    if (filter.recentOnly && !product.is_recent) {
      return false
    }

    const searchTokens = buildSearchTokens(product)

    const matchesQuery =
      normalizedQuery === '' ||
      searchTokens.some((token) => token.includes(normalizedQuery)) ||
      product.name.toLowerCase().includes(normalizedQuery)

    const matchesCategory =
      selectedCategories.size === 0 || selectedCategories.has(product.category)

    return matchesQuery && matchesCategory
  })
}

function summarizeCategories(catalog: ElectronicCatalogItem[]) {
  const countByCategory = new Map<string, number>()

  for (const product of catalog) {
    if (product.category.trim() === '') {
      continue
    }

    const currentCount = countByCategory.get(product.category) ?? 0
    countByCategory.set(product.category, currentCount + 1)
  }

  return Array.from(countByCategory.entries())
    .sort(([firstName], [secondName]) => firstName.localeCompare(secondName))
    .map(([name, totalProducts]) => {
      return {
        name,
        href: `/cari?domain=${encodeURIComponent(name)}`,
        totalProducts,
        totalLabel: `${totalProducts} solusi`,
      }
    })
}

export async function getProductsAsync(filter: ProductCatalogFilter = {}) {
  const catalog = await getCatalogProductsAsync()
  return filterProducts(catalog, filter)
}

export async function getProductByIdAsync(id: number) {
  const catalog = await getCatalogProductsAsync()
  return catalog.find((item) => item.id === id)
}

export async function getCategorySummariesAsync() {
  const catalog = await getCatalogProductsAsync()
  return summarizeCategories(catalog)
}

export async function getAvailableCategoryNamesAsync() {
  const categories = await getMasterCategoriesAsync()
  return categories.map((category) => category.name)
}

export async function getDashboardCategoryRowsAsync() {
  return getMasterCategoriesAsync()
}

export async function getDashboardProductRowsAsync() {
  const catalog = await getCatalogProductsAsync()
  return catalog.map((product) => ({
    id: product.id,
    sku: `PRD-${product.id.toString().padStart(4, '0')}`,
    name: product.name,
    description: product.description,
    category: product.category,
    category_id: product.category_id,
    status: product.status,
    features: product.features,
    is_recent: product.is_recent,
    is_featured: product.is_featured,
    images: product.images,
  }))
}
