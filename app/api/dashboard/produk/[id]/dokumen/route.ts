import { NextResponse } from 'next/server'
import {
  addProductDocumentAsync,
  deleteProductDocumentAsync,
  updateProductDocumentAsync,
} from '@/lib/dashboardCatalogService'

type RouteContext = { params: Promise<{ id: string }> }

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

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    const productId = toNumberValue(id)

    if (productId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID produk tidak valid.' },
        { status: 400 },
      )
    }

    const body = (await request.json()) as Record<string, unknown>
    const title = toStringValue(body.title).trim()
    const gdriveUrl = toStringValue(body.gdrive_url).trim()
    const docType = toStringValue(body.doc_type).trim() || 'general'
    const description = toStringValue(body.description).trim()

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Judul dokumen wajib diisi.' },
        { status: 400 },
      )
    }

    if (!gdriveUrl) {
      return NextResponse.json(
        { success: false, message: 'Link Google Drive wajib diisi.' },
        { status: 400 },
      )
    }

    const document = await addProductDocumentAsync(productId, {
      title,
      gdrive_url: gdriveUrl,
      doc_type: docType,
      description,
    })

    return NextResponse.json({ success: true, data: document }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menambah dokumen.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    const productId = toNumberValue(id)

    if (productId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID produk tidak valid.' },
        { status: 400 },
      )
    }

    const body = (await request.json()) as Record<string, unknown>
    const documentId = toNumberValue(body.id)

    if (documentId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID dokumen wajib diisi.' },
        { status: 400 },
      )
    }

    const title = toStringValue(body.title).trim()
    const gdriveUrl = toStringValue(body.gdrive_url).trim()
    const docType = toStringValue(body.doc_type).trim() || 'general'
    const description = toStringValue(body.description).trim()

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Judul dokumen wajib diisi.' },
        { status: 400 },
      )
    }

    if (!gdriveUrl) {
      return NextResponse.json(
        { success: false, message: 'Link Google Drive wajib diisi.' },
        { status: 400 },
      )
    }

    const document = await updateProductDocumentAsync(documentId, productId, {
      title,
      gdrive_url: gdriveUrl,
      doc_type: docType,
      description,
    })

    return NextResponse.json({ success: true, data: document }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengubah dokumen.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params
    const productId = toNumberValue(id)

    if (productId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID produk tidak valid.' },
        { status: 400 },
      )
    }

    const body = (await request.json()) as Record<string, unknown>
    const documentId = toNumberValue(body.id)

    if (documentId === undefined) {
      return NextResponse.json(
        { success: false, message: 'ID dokumen wajib diisi.' },
        { status: 400 },
      )
    }

    await deleteProductDocumentAsync(documentId, productId)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menghapus dokumen.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
