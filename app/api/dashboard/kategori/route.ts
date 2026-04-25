import { NextResponse } from 'next/server'
import {
  createDashboardCategoryAsync,
  deleteDashboardCategoryAsync,
  getDashboardCategoriesAsync,
  updateDashboardCategoryAsync,
} from '@/lib/dashboardCatalogService'

type CategoryPayload = {
  id?: unknown
  name?: unknown
  sequence?: unknown
  description?: unknown
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

export async function GET() {
  try {
    const categories = await getDashboardCategoriesAsync()
    return NextResponse.json({ success: true, data: categories }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal memuat kategori.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CategoryPayload
    const name = toStringValue(payload.name).trim()

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Nama kategori wajib diisi.' },
        { status: 400 }
      )
    }

    const category = await createDashboardCategoryAsync({
      name,
      sequence: toNumberValue(payload.sequence) ?? 0,
      description: toStringValue(payload.description),
    })

    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menambah kategori.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const payload = (await request.json()) as CategoryPayload
    const id = toStringValue(payload.id)
    const name = toStringValue(payload.name).trim()

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID kategori wajib diisi.' },
        { status: 400 }
      )
    }

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Nama kategori wajib diisi.' },
        { status: 400 }
      )
    }

    const category = await updateDashboardCategoryAsync(id, {
      name,
      sequence: toNumberValue(payload.sequence) ?? 0,
      description: toStringValue(payload.description),
    })

    return NextResponse.json({ success: true, data: category }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengubah kategori.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = (await request.json()) as CategoryPayload
    const id = toStringValue(payload.id)

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID kategori wajib diisi.' },
        { status: 400 }
      )
    }

    await deleteDashboardCategoryAsync(id)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menghapus kategori.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
