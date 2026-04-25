import { NextResponse } from 'next/server'
import {
  addProductImagesAsync,
  createDashboardProductAsync,
  deleteDashboardProductAsync,
  deleteProductImagesByIdsAsync,
  getDashboardProductByIdAsync,
  getDashboardProductsAsync,
  setPrimaryProductImageAsync,
  updateDashboardProductAsync,
} from '@/lib/dashboardCatalogService'

type ProductPayload = {
  id?: unknown
  removedImageIds?: unknown
  primaryImageId?: unknown
}

function toStringValue(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function toNumberValue(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return undefined
}

function toBooleanValue(value: string) {
  return value === 'true' || value === '1'
}

function parseFeatureInput(value: string) {
  const normalizedValue = value.trim()
  if (!normalizedValue) {
    return [] as string[]
  }

  try {
    const parsedValue = JSON.parse(normalizedValue) as unknown
    if (Array.isArray(parsedValue)) {
      return parsedValue
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
    }
  } catch {
    return normalizedValue
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  }

  return normalizedValue
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseRemovedImageIds(value: string) {
  if (!value.trim()) {
    return [] as string[]
  }

  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((item) => (typeof item === 'string' ? item : ''))
      .filter(Boolean)
  } catch {
    return []
  }
}

function parseImageFiles(formData: FormData) {
  return formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File)
    .filter((file) => file.size > 0)
}

export async function GET() {
  try {
    const products = await getDashboardProductsAsync()
    return NextResponse.json({ success: true, data: products }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal memuat produk.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = toStringValue(formData.get('name')).trim()
    const description = toStringValue(formData.get('description')).trim()
    const status = toStringValue(formData.get('status')).trim() || 'Draft'
    const categoryId = toStringValue(formData.get('category_id')) || null
    const features = parseFeatureInput(toStringValue(formData.get('features')))
    const isRecent = toBooleanValue(toStringValue(formData.get('is_recent')))
    const isFeatured = toBooleanValue(toStringValue(formData.get('is_featured')))
    const files = parseImageFiles(formData)

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Nama produk wajib diisi.' },
        { status: 400 }
      )
    }

    const productId = await createDashboardProductAsync({
      name,
      description,
      status,
      category_id: categoryId,
      features,
      is_recent: isRecent,
      is_featured: isFeatured,
    })

    if (files.length > 0) {
      await addProductImagesAsync(productId, files)
    }

    const product = await getDashboardProductByIdAsync(productId)

    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menambah produk.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData()
    const payload = {
      id: formData.get('id'),
      removedImageIds: formData.get('removedImageIds'),
      primaryImageId: formData.get('primaryImageId'),
    } as ProductPayload

    const productId = toNumberValue(payload.id)
    if (productId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID produk wajib diisi.' },
        { status: 400 }
      )
    }

    const name = toStringValue(formData.get('name')).trim()
    const description = toStringValue(formData.get('description')).trim()
    const status = toStringValue(formData.get('status')).trim() || 'Draft'
    const categoryId = toStringValue(formData.get('category_id')) || null
    const features = parseFeatureInput(toStringValue(formData.get('features')))
    const isRecent = toBooleanValue(toStringValue(formData.get('is_recent')))
    const isFeatured = toBooleanValue(toStringValue(formData.get('is_featured')))
    const files = parseImageFiles(formData)

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Nama produk wajib diisi.' },
        { status: 400 }
      )
    }

    await updateDashboardProductAsync(productId, {
      name,
      description,
      status,
      category_id: categoryId,
      features,
      is_recent: isRecent,
      is_featured: isFeatured,
    })

    const removedImageIds = parseRemovedImageIds(toStringValue(payload.removedImageIds))
    if (removedImageIds.length > 0) {
      await deleteProductImagesByIdsAsync(productId, removedImageIds)
    }

    if (files.length > 0) {
      await addProductImagesAsync(productId, files)
    }

    const primaryImageId = toStringValue(payload.primaryImageId)
    if (primaryImageId) {
      await setPrimaryProductImageAsync(productId, primaryImageId)
    }

    const product = await getDashboardProductByIdAsync(productId)

    return NextResponse.json({ success: true, data: product }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengubah produk.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = (await request.json()) as ProductPayload
    const productId = toNumberValue(payload.id)

    if (productId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID produk wajib diisi.' },
        { status: 400 }
      )
    }

    await deleteDashboardProductAsync(productId)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menghapus produk.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
