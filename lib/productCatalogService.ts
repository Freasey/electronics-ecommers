import { type ElectronicCatalogItem } from '@/lib/electronicProductCatalog'
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
  nama?: unknown
}

export type ProductCategorySummary = {
  name: string
  href: string
  totalProducts: number
  totalLabel: string
}

export type DashboardProductRow = {
  sku: string
  name: string
  category: string
  status: CategoryStatus
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

function toCategoryRecord(value: unknown): SupabaseCategoryRecord | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  return value as SupabaseCategoryRecord
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

  const features = toStringArray(record.features)
  const category = toCategoryRecord(record.kategori)
  const categoryId = toNumberValue(category?.id) ?? toNumberValue(record.category_id) ?? null
  const categoryName = toStringValue(category?.nama)

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
          name
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
  const categories = await getCategorySummariesAsync()
  return categories.map((category) => category.name)
}

export async function getDashboardProductRowsAsync() {
  const catalog = await getCatalogProductsAsync()
  return catalog.map((product) => ({
    sku: `PRD-${product.id.toString().padStart(4, '0')}`,
    name: product.name,
    category: product.category,
    status: product.status,
  }))
}
