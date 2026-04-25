'use client'

import { useMemo, useState } from 'react'
import type { ElectronicCatalogProductImage } from '@/lib/electronicProductCatalog'

type DashboardCategory = {
  id: string
  name: string
}

type DashboardProduct = {
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
}

type ProductFormState = {
  name: string
  description: string
  status: string
  kategori_id: string
  features: string
  is_recent: boolean
  is_featured: boolean
  primary_image_id: string
  removed_image_ids: string[]
  new_images: File[]
}

type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
}

const initialProductFormState: ProductFormState = {
  name: '',
  description: '',
  status: 'Draft',
  kategori_id: '',
  features: '',
  is_recent: false,
  is_featured: false,
  primary_image_id: '',
  removed_image_ids: [],
  new_images: [],
}

function featuresToTextarea(features: string[]) {
  return features.join('\n')
}

export default function MasterProductManager({
  initialProducts,
  categories,
}: {
  initialProducts: DashboardProduct[]
  categories: DashboardCategory[]
}) {
  const [products, setProducts] = useState<DashboardProduct[]>(initialProducts)
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [formState, setFormState] = useState<ProductFormState>(initialProductFormState)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchQuery =
        normalizedQuery === '' ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery)

      const matchCategory = categoryFilter === '' || product.category_id === categoryFilter
      const matchStatus = statusFilter === '' || product.status === statusFilter

      return matchQuery && matchCategory && matchStatus
    })
  }, [products, query, categoryFilter, statusFilter])

  async function reloadProducts() {
    const response = await fetch('/api/dashboard/produk', {
      method: 'GET',
      cache: 'no-store',
    })

    const payload = (await response.json()) as ApiResponse<DashboardProduct[]>

    if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || 'Gagal memuat data produk terbaru.')
    }

    setProducts(payload.data)
  }

  function resetForm() {
    setFormState(initialProductFormState)
    setEditingId(null)
  }

  function startEdit(product: DashboardProduct) {
    setEditingId(product.id)
    setFormState({
      name: product.name,
      description: product.description,
      status: product.status || 'Draft',
      kategori_id: product.category_id ?? '',
      features: featuresToTextarea(product.features),
      is_recent: product.is_recent,
      is_featured: product.is_featured,
      primary_image_id: product.images.find((image) => image.is_primary)?.id ?? '',
      removed_image_ids: [],
      new_images: [],
    })
  }

  function toggleRemovedImage(imageId: string) {
    setFormState((prev) => {
      if (prev.removed_image_ids.includes(imageId)) {
        return {
          ...prev,
          removed_image_ids: prev.removed_image_ids.filter((id) => id !== imageId),
        }
      }

      return {
        ...prev,
        removed_image_ids: [...prev.removed_image_ids, imageId],
      }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formState.name.trim()) {
      setMessage('Nama produk wajib diisi.')
      return
    }

    setIsSaving(true)
    setMessage(null)

    try {
      const submittedPrimaryImageId = (() => {
        if (!editingProduct) {
          return ''
        }

        const availableImageIds = editingProduct.images
          .map((image) => image.id)
          .filter((imageId) => !formState.removed_image_ids.includes(imageId))

        if (availableImageIds.length === 0) {
          return ''
        }

        if (
          formState.primary_image_id &&
          availableImageIds.includes(formState.primary_image_id)
        ) {
          return formState.primary_image_id
        }

        return availableImageIds[0]
      })()

      const body = new FormData()
      body.set('name', formState.name)
      body.set('description', formState.description)
      body.set('status', formState.status)
      body.set('category_id', formState.kategori_id)
      body.set('features', formState.features)
      body.set('is_recent', String(formState.is_recent))
      body.set('is_featured', String(formState.is_featured))
      body.set('primaryImageId', submittedPrimaryImageId)
      body.set('removedImageIds', JSON.stringify(formState.removed_image_ids))

      for (const file of formState.new_images) {
        body.append('images', file)
      }

      if (editingId !== null) {
        body.set('id', String(editingId))
      }

      const response = await fetch('/api/dashboard/produk', {
        method: editingId !== null ? 'PUT' : 'POST',
        body,
      })

      const payload = (await response.json()) as ApiResponse<DashboardProduct>

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'Gagal menyimpan produk.')
      }

      await reloadProducts()
      resetForm()
      setMessage(editingId !== null ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.')
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan produk.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(product: DashboardProduct) {
    const confirmed = window.confirm(`Hapus produk "${product.name}"?`)
    if (!confirmed) {
      return
    }

    setMessage(null)

    try {
      const response = await fetch('/api/dashboard/produk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: product.id }),
      })

      const payload = (await response.json()) as ApiResponse<null>

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'Gagal menghapus produk.')
      }

      await reloadProducts()
      if (editingId === product.id) {
        resetForm()
      }
      setMessage('Produk berhasil dihapus.')
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus produk.')
    }
  }

  const editingProduct =
    editingId !== null ? products.find((product) => product.id === editingId) : undefined

  const currentImages = editingProduct
    ? editingProduct.images.filter((image) => !formState.removed_image_ids.includes(image.id))
    : []

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Nama produk"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-neutral-100"
          />
          <select
            value={formState.kategori_id}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, kategori_id: event.target.value }))
            }
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <textarea
            value={formState.description}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, description: event.target.value }))
            }
            placeholder="Deskripsi"
            rows={3}
            className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100"
          />
          <textarea
            value={formState.features}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, features: event.target.value }))
            }
            placeholder="Kapabilitas utama (satu baris per item)"
            rows={3}
            className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100"
          />
          <select
            value={formState.status}
            onChange={(event) => setFormState((prev) => ({ ...prev, status: event.target.value }))}
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
          >
            <option value="Aktif">Aktif</option>
            <option value="Draft">Draft</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
          <div className="flex items-center gap-4 h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-100">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={formState.is_recent}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, is_recent: event.target.checked }))
                }
              />
              Recent
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={formState.is_featured}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, is_featured: event.target.checked }))
                }
              />
              Featured
            </label>
          </div>
        </div>

        <div className="space-y-2 mb-3">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">Upload gambar produk</p>

            {editingProduct && editingProduct.images.length > 0 && (
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-900 space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                  Gambar Saat Ini
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {editingProduct.images.map((image) => {
                    const isMarkedDelete = formState.removed_image_ids.includes(image.id)
                    const isPrimary = formState.primary_image_id === image.id

                    return (
                      <div
                        key={image.id}
                        className="rounded-md border border-neutral-200 dark:border-neutral-700 p-2 space-y-2"
                      >
                        <img
                          src={image.image_url}
                          alt={`${editingProduct.name} image`}
                          className={`h-20 w-full object-cover rounded ${
                            isMarkedDelete ? 'opacity-40' : 'opacity-100'
                          }`}
                        />
                        <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <input
                            type="radio"
                            name="primary-image"
                            checked={isPrimary}
                            disabled={isMarkedDelete}
                            onChange={() =>
                              setFormState((prev) => ({ ...prev, primary_image_id: image.id }))
                            }
                          />
                          Primary
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleRemovedImage(image.id)}
                          className="text-xs text-red-700 dark:text-red-300 hover:underline"
                        >
                          {isMarkedDelete ? 'Batalkan Hapus' : 'Hapus Gambar'}
                        </button>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Gambar yang ditandai hapus akan diproses saat klik Simpan Perubahan.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 flex-wrap">
                <label className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-200 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors select-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Pilih Gambar
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                    const files = Array.from(event.target.files ?? [])
                    setFormState((prev) => ({ ...prev, new_images: files }))
                    }}
                />
                </label>
            </div>
            {formState.new_images.length > 0 ? (
            formState.new_images.map((file, i) => (
                <span
                key={i}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
                {file.name.length > 22 ? file.name.slice(0, 20) + '…' : file.name}
                </span>
            ))
            ) : (
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
                Belum ada file dipilih
            </span>
            )}
            
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer h-10 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium disabled:opacity-60"
          >
            {editingId !== null ? 'Simpan Perubahan' : 'Tambah Product'}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-200"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Cari nama product / SKU"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
        />
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
        >
          <option value="">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Draft">Draft</option>
          <option value="Nonaktif">Nonaktif</option>
        </select>
      </div>

      {message && <p className="text-sm text-neutral-600 dark:text-neutral-300">{message}</p>}

      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/60">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">SKU</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Nama Product</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Kategori</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Status</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Gambar</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr key={product.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{product.sku}</td>
                <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{product.name}</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{product.category_name || '-'}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                    {product.status || 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {product.images.length} file
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="h-8 px-3 rounded-md border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-300"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleProducts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400"
                >
                  Tidak ada produk yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
