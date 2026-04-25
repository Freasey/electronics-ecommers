import { NextResponse } from 'next/server'
import { getProductByIdAsync, getProductsAsync } from '@/lib/productCatalogService'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const idParam = searchParams.get('id')
    const numericId = idParam ? Number(idParam) : undefined

    const products =
      numericId !== undefined && Number.isFinite(numericId)
        ? await (async () => {
            const product = await getProductByIdAsync(numericId)
            return product ? [product] : []
          })()
        : await getProductsAsync()

    return NextResponse.json({ success: true, data: products }, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan tak terduga.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
