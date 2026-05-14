import { createSupabaseServerClient } from '@/lib/auth/supabaseServer'
import {
  type ElectronicCatalogProductDocument,
  type ElectronicCatalogProductImage,
} from '@/lib/electronicProductCatalog'

const PRODUCT_IMAGE_BUCKET = process.env.SUPABASE_PRODUCT_IMAGE_BUCKET ?? 'product-images'

type SupabaseCategoryRecord = {
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

type SupabaseProductDocumentRecord = {
  id?: unknown
  title?: unknown
  description?: unknown
  gdrive_url?: unknown
  doc_type?: unknown
  position?: unknown
}

type SupabaseProductRecord = {
  id?: unknown
  name?: unknown
  description?: unknown
  status?: unknown
  kategori_id?: unknown
  is_recent?: unknown
  is_featured?: unknown
  features?: unknown
  kategori?: unknown
  product_images?: unknown
  product_documents?: unknown
}

export type DashboardProductDocumentPayload = {
  id: number
  title: string
  description: string
  gdrive_url: string
  doc_type: string
  position: number
}

export type DashboardProductDocumentInput = {
  title: string
  description: string
  gdrive_url: string
  doc_type: string
  position?: number
}

type SupabaseCategoryRelation = {
  id?: unknown
  name?: unknown
}

export type DashboardCategoryPayload = {
  id: string
  name: string
  sequence: number
  description: string
}

export type DashboardCategoryUpsertInput = {
  name: string
  sequence?: number
  description?: string
}

export type DashboardProductPayload = {
  id: number
  sku: string
  name: string
  description: string
  status: string
  category_id: string | null
  category_name: string
  features: string[]
  is_recent: boolean
  is_featured: boolean
  images: ElectronicCatalogProductImage[]
  documents: DashboardProductDocumentPayload[]
}

export type DashboardProductUpsertInput = {
  name: string
  description: string
  status: string
  category_id: string | null
  features: string[]
  is_recent: boolean
  is_featured: boolean
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
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
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

function toCategoryRelation(value: unknown): SupabaseCategoryRelation | undefined {
  if (Array.isArray(value)) {
    const [firstCategory] = value
    return toCategoryRelation(firstCategory)
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  return value as SupabaseCategoryRelation
}

function toProductDocumentRows(value: unknown): DashboardProductDocumentPayload[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return undefined
      }

      const record = item as SupabaseProductDocumentRecord
      const id = toNumberValue(record.id)
      const title = toStringValue(record.title)
      const gdriveUrl = toStringValue(record.gdrive_url)

      if (id === undefined || !title || !gdriveUrl) {
        return undefined
      }

      const result: ElectronicCatalogProductDocument = {
        id,
        title,
        description: toStringValue(record.description),
        gdrive_url: gdriveUrl,
        doc_type: toStringValue(record.doc_type) || 'general',
        position: toNumberValue(record.position) ?? 0,
      }

      return result
    })
    .filter((doc): doc is DashboardProductDocumentPayload => doc !== undefined)
    .sort((a, b) => a.position - b.position)
}

function toProductImageRows(value: unknown) {
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

function mapCategoryRecord(record: SupabaseCategoryRecord) {
  const id = toStringValue(record.id)
  const name = toStringValue(record.name)

  if (!id || !name) {
    return undefined
  }

  return {
    id,
    name,
    sequence: toNumberValue(record.sequence) ?? 0,
    description: toStringValue(record.description),
  }
}

function mapProductRecord(record: SupabaseProductRecord): DashboardProductPayload | undefined {
  const id = toNumberValue(record.id)
  const name = toStringValue(record.name)

  if (id === undefined || !name) {
    return undefined
  }

  const categoryRelation = toCategoryRelation(record.kategori)

  return {
    id,
    sku: `PRD-${id.toString().padStart(4, '0')}`,
    name,
    description: toStringValue(record.description),
    status: toStringValue(record.status) || 'tersedia',
    category_id: toStringValue(record.kategori_id) || null,
    category_name: toStringValue(categoryRelation?.name),
    features: parseFeaturesValue(record.features),
    is_recent: toBooleanValue(record.is_recent) ?? false,
    is_featured: toBooleanValue(record.is_featured) ?? false,
    images: toProductImageRows(record.product_images),
    documents: toProductDocumentRows(record.product_documents),
  }
}

function sanitizeFileName(fileName: string) {
  const normalized = fileName.trim().toLowerCase()
  return normalized.replace(/[^a-z0-9._-]/g, '-')
}

function getStoragePathFromPublicUrl(imageUrl: string) {
  const marker = `/object/public/${PRODUCT_IMAGE_BUCKET}/`
  const markerIndex = imageUrl.indexOf(marker)
  if (markerIndex === -1) {
    return null
  }

  return decodeURIComponent(imageUrl.slice(markerIndex + marker.length))
}

async function ensureSinglePrimaryImage(productId: number) {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('product_images')
    .select('id, is_primary, position')
    .eq('produk_id', productId)

  if (error || !Array.isArray(data) || data.length === 0) {
    return
  }

  const hasPrimary = data.some((item) => toBooleanValue((item as SupabaseProductImageRecord).is_primary) === true)

  if (hasPrimary) {
    return
  }

  const ordered = data
    .map((item) => {
      const image = item as SupabaseProductImageRecord
      return {
        id: toStringValue(image.id),
        position: toNumberValue(image.position) ?? 0,
      }
    })
    .filter((image) => image.id)
    .sort((firstImage, secondImage) => firstImage.position - secondImage.position)

  const firstImage = ordered[0]
  if (!firstImage) {
    return
  }

  await supabase
    .from('product_images')
    .update({ is_primary: true })
    .eq('id', firstImage.id)
    .eq('produk_id', productId)
}

export async function getDashboardCategoriesAsync(): Promise<DashboardCategoryPayload[]> {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('kategori')
    .select('*')
    .order('sequence', { ascending: true })
    .order('name', { ascending: true })

  if (error || !Array.isArray(data)) {
    throw new Error(error?.message || 'Gagal memuat kategori.')
  }

  return data
    .map((record) => mapCategoryRecord(record as SupabaseCategoryRecord))
    .filter((category): category is DashboardCategoryPayload => category !== undefined)
}

export async function createDashboardCategoryAsync(input: DashboardCategoryUpsertInput) {
  const supabase = createSupabaseServerClient()
  const payload = {
    name: input.name.trim(),
    sequence: input.sequence ?? 0,
    description: input.description?.trim() ?? '',
  }

  const { data, error } = await supabase
    .from('kategori')
    .insert(payload)
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(error?.message || 'Gagal menambah kategori.')
  }

  const mappedCategory = mapCategoryRecord(data as SupabaseCategoryRecord)
  if (!mappedCategory) {
    throw new Error('Data kategori tidak valid.')
  }

  return mappedCategory
}

export async function updateDashboardCategoryAsync(id: string, input: DashboardCategoryUpsertInput) {
  const supabase = createSupabaseServerClient()
  const payload = {
    name: input.name.trim(),
    sequence: input.sequence ?? 0,
    description: input.description?.trim() ?? '',
  }

  const { data, error } = await supabase
    .from('kategori')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single()

  if (error || !data) {
    throw new Error(error?.message || 'Gagal mengubah kategori.')
  }

  const mappedCategory = mapCategoryRecord(data as SupabaseCategoryRecord)
  if (!mappedCategory) {
    throw new Error('Data kategori tidak valid.')
  }

  return mappedCategory
}

export async function deleteDashboardCategoryAsync(id: string) {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase
    .from('kategori')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message || 'Gagal menghapus kategori.')
  }
}

export async function getDashboardProductsAsync(): Promise<DashboardProductPayload[]> {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('produk')
    .select(`
      id,
      name,
      description,
      status,
      kategori_id,
      is_recent,
      is_featured,
      features,
      kategori (
        id,
        name
      ),
      product_images (
        id,
        image_url,
        is_primary,
        position
      ),
      product_documents (
        id,
        title,
        description,
        gdrive_url,
        doc_type,
        position
      )
    `)
    .order('id', { ascending: true })

  if (error || !Array.isArray(data)) {
    throw new Error(error?.message || 'Gagal memuat produk.')
  }

  return data
    .map((record) => mapProductRecord(record as SupabaseProductRecord))
    .filter((product): product is DashboardProductPayload => product !== undefined)
}

export async function getDashboardProductByIdAsync(id: number) {
  const products = await getDashboardProductsAsync()
  return products.find((product) => product.id === id)
}

export async function createDashboardProductAsync(input: DashboardProductUpsertInput) {
  const supabase = createSupabaseServerClient()
  const payload = {
    name: input.name.trim(),
    description: input.description.trim(),
    status: input.status.trim() || 'tersedia',
    kategori_id: input.category_id,
    features: JSON.stringify(input.features),
    is_recent: input.is_recent,
    is_featured: input.is_featured,
  }

  const { data, error } = await supabase
    .from('produk')
    .insert(payload)
    .select('id')
    .single()

  if (error || !data) {
    throw new Error(error?.message || 'Gagal menambah produk.')
  }

  const productId = toNumberValue((data as { id?: unknown }).id)
  if (productId === undefined) {
    throw new Error('Produk berhasil dibuat tetapi ID tidak ditemukan.')
  }

  return productId
}

export async function updateDashboardProductAsync(id: number, input: DashboardProductUpsertInput) {
  const supabase = createSupabaseServerClient()

  const payload = {
    name: input.name.trim(),
    description: input.description.trim(),
    status: input.status.trim() || 'tersedia',
    kategori_id: input.category_id,
    features: JSON.stringify(input.features),
    is_recent: input.is_recent,
    is_featured: input.is_featured,
  }

  const { error } = await supabase
    .from('produk')
    .update(payload)
    .eq('id', id)

  if (error) {
    throw new Error(error.message || 'Gagal mengubah produk.')
  }
}

export async function addProductImagesAsync(productId: number, files: File[]) {
  if (files.length === 0) {
    return [] as ElectronicCatalogProductImage[]
  }

  const supabase = createSupabaseServerClient()
  const { data: existingRows, error: existingError } = await supabase
    .from('product_images')
    .select('position, is_primary')
    .eq('produk_id', productId)

  if (existingError) {
    throw new Error(existingError.message || 'Gagal memuat metadata gambar.')
  }

  const maxPosition = (existingRows ?? []).reduce((maxValue, item) => {
    const image = item as SupabaseProductImageRecord
    const position = toNumberValue(image.position) ?? 0
    return Math.max(maxValue, position)
  }, 0)

  const hasPrimary = (existingRows ?? []).some(
    (item) => toBooleanValue((item as SupabaseProductImageRecord).is_primary) === true
  )

  const uploadResult: Array<{
    image_url: string
    is_primary: boolean
    position: number
    produk_id: number
  }> = []

  for (const [index, file] of files.entries()) {
    const safeName = sanitizeFileName(file.name || `image-${index + 1}.jpg`)
    const filePath = `${productId}/${Date.now()}-${index}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .upload(filePath, file, {
        upsert: false,
        contentType: file.type || 'application/octet-stream',
      })

    if (uploadError) {
      throw new Error(uploadError.message || 'Upload gambar gagal.')
    }

    const { data: publicData } = supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .getPublicUrl(filePath)

    uploadResult.push({
      image_url: publicData.publicUrl,
      is_primary: !hasPrimary && index === 0,
      position: maxPosition + index + 1,
      produk_id: productId,
    })
  }

  const { data, error } = await supabase
    .from('product_images')
    .insert(uploadResult)
    .select('id, image_url, is_primary, position')

  if (error || !Array.isArray(data)) {
    throw new Error(error?.message || 'Gagal menyimpan data gambar produk.')
  }

  return toProductImageRows(data)
}

export async function deleteProductImagesByIdsAsync(productId: number, imageIds: string[]) {
  if (imageIds.length === 0) {
    return
  }

  const supabase = createSupabaseServerClient()
  const { data: existingRows, error: existingError } = await supabase
    .from('product_images')
    .select('id, image_url')
    .eq('produk_id', productId)
    .in('id', imageIds)

  if (existingError) {
    throw new Error(existingError.message || 'Gagal memuat gambar yang akan dihapus.')
  }

  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('produk_id', productId)
    .in('id', imageIds)

  if (error) {
    throw new Error(error.message || 'Gagal menghapus gambar produk.')
  }

  const storagePaths = (existingRows ?? [])
    .map((row) => getStoragePathFromPublicUrl(toStringValue((row as { image_url?: unknown }).image_url)))
    .filter((path): path is string => !!path)

  if (storagePaths.length > 0) {
    await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .remove(storagePaths)
  }

  await ensureSinglePrimaryImage(productId)
}

export async function setPrimaryProductImageAsync(productId: number, imageId: string) {
  const supabase = createSupabaseServerClient()

  const { error: resetError } = await supabase
    .from('product_images')
    .update({ is_primary: false })
    .eq('produk_id', productId)

  if (resetError) {
    throw new Error(resetError.message || 'Gagal reset primary image.')
  }

  const { error } = await supabase
    .from('product_images')
    .update({ is_primary: true })
    .eq('produk_id', productId)
    .eq('id', imageId)

  if (error) {
    throw new Error(error.message || 'Gagal menentukan primary image.')
  }
}

export async function addProductDocumentAsync(
  productId: number,
  input: DashboardProductDocumentInput,
): Promise<DashboardProductDocumentPayload> {
  const supabase = createSupabaseServerClient()

  const { data: existingRows } = await supabase
    .from('product_documents')
    .select('position')
    .eq('produk_id', productId)

  const maxPosition = (existingRows ?? []).reduce((max, item) => {
    const pos = toNumberValue((item as SupabaseProductDocumentRecord).position) ?? 0
    return Math.max(max, pos)
  }, 0)

  const payload = {
    produk_id: productId,
    title: input.title.trim(),
    description: input.description.trim(),
    gdrive_url: input.gdrive_url.trim(),
    doc_type: input.doc_type || 'general',
    position: input.position ?? maxPosition + 1,
  }

  const { data, error } = await supabase
    .from('product_documents')
    .insert(payload)
    .select('id, title, description, gdrive_url, doc_type, position')
    .single()

  if (error || !data) {
    throw new Error(error?.message || 'Gagal menambah dokumen.')
  }

  const record = data as SupabaseProductDocumentRecord
  const id = toNumberValue(record.id)
  if (id === undefined) {
    throw new Error('Dokumen berhasil ditambah tetapi ID tidak ditemukan.')
  }

  return {
    id,
    title: toStringValue(record.title),
    description: toStringValue(record.description),
    gdrive_url: toStringValue(record.gdrive_url),
    doc_type: toStringValue(record.doc_type) || 'general',
    position: toNumberValue(record.position) ?? 0,
  }
}

export async function updateProductDocumentAsync(
  documentId: number,
  productId: number,
  input: DashboardProductDocumentInput,
): Promise<DashboardProductDocumentPayload> {
  const supabase = createSupabaseServerClient()

  const payload = {
    title: input.title.trim(),
    description: input.description.trim(),
    gdrive_url: input.gdrive_url.trim(),
    doc_type: input.doc_type || 'general',
    ...(input.position !== undefined ? { position: input.position } : {}),
  }

  const { data, error } = await supabase
    .from('product_documents')
    .update(payload)
    .eq('id', documentId)
    .eq('produk_id', productId)
    .select('id, title, description, gdrive_url, doc_type, position')
    .single()

  if (error || !data) {
    throw new Error(error?.message || 'Gagal mengubah dokumen.')
  }

  const record = data as SupabaseProductDocumentRecord
  const id = toNumberValue(record.id)
  if (id === undefined) {
    throw new Error('Data dokumen tidak valid setelah diperbarui.')
  }

  return {
    id,
    title: toStringValue(record.title),
    description: toStringValue(record.description),
    gdrive_url: toStringValue(record.gdrive_url),
    doc_type: toStringValue(record.doc_type) || 'general',
    position: toNumberValue(record.position) ?? 0,
  }
}

export async function deleteProductDocumentAsync(documentId: number, productId: number) {
  const supabase = createSupabaseServerClient()

  const { error } = await supabase
    .from('product_documents')
    .delete()
    .eq('id', documentId)
    .eq('produk_id', productId)

  if (error) {
    throw new Error(error.message || 'Gagal menghapus dokumen.')
  }
}

export async function deleteDashboardProductAsync(id: number) {
  const supabase = createSupabaseServerClient()

  const { data: imageRows, error: imageRowsError } = await supabase
    .from('product_images')
    .select('image_url')
    .eq('produk_id', id)

  if (imageRowsError) {
    throw new Error(imageRowsError.message || 'Gagal memuat gambar produk.')
  }

  const { error } = await supabase
    .from('produk')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message || 'Gagal menghapus produk.')
  }

  const storagePaths = (imageRows ?? [])
    .map((row) => getStoragePathFromPublicUrl(toStringValue((row as { image_url?: unknown }).image_url)))
    .filter((path): path is string => !!path)

  if (storagePaths.length > 0) {
    await supabase.storage
      .from(PRODUCT_IMAGE_BUCKET)
      .remove(storagePaths)
  }
}
