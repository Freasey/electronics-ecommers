'use client'

import { useMemo, useState } from 'react'

type DashboardCategory = {
  id: string
  name: string
  sequence: number
  description: string
}

type CategoryFormState = {
  name: string
  sequence: string
  description: string
}

type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
}

const initialFormState: CategoryFormState = {
  name: '',
  sequence: '0',
  description: '',
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}

export default function MasterKategoriManager({
  initialCategories,
}: {
  initialCategories: DashboardCategory[]
}) {
  const [categories, setCategories] = useState<DashboardCategory[]>(initialCategories)
  const [query, setQuery] = useState('')
  const [formState, setFormState] = useState<CategoryFormState>(initialFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return categories
    }

    return categories.filter((category) =>
      category.name.toLowerCase().includes(normalizedQuery)
    )
  }, [categories, query])

  async function reloadCategories() {
    const response = await fetch('/api/dashboard/kategori', {
      method: 'GET',
      cache: 'no-store',
    })

    const payload = (await response.json()) as ApiResponse<DashboardCategory[]>

    if (!response.ok || !payload.success || !Array.isArray(payload.data)) {
      throw new Error(payload.message || 'Gagal memuat data kategori terbaru.')
    }

    setCategories(payload.data)
  }

  function resetForm() {
    setFormState(initialFormState)
    setEditingId(null)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formState.name.trim()) {
      setMessage('Nama kategori wajib diisi.')
      return
    }

    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/dashboard/kategori', {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingId,
          name: formState.name.trim(),
          sequence: Number(formState.sequence) || 0,
          description: formState.description,
        }),
      })

      const payload = (await response.json()) as ApiResponse<DashboardCategory>

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'Gagal menyimpan kategori.')
      }

      await reloadCategories()
      resetForm()
      setMessage(editingId ? 'Kategori berhasil diperbarui.' : 'Kategori berhasil ditambahkan.')
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan kategori.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleEdit(category: DashboardCategory) {
    setEditingId(category.id)
    setFormState({
      name: category.name,
      sequence: category.sequence.toString(),
      description: category.description,
    })
  }

  async function handleDelete(category: DashboardCategory) {
    const confirmed = window.confirm(`Hapus kategori "${category.name}"?`)
    if (!confirmed) {
      return
    }

    setMessage(null)

    try {
      const response = await fetch('/api/dashboard/kategori', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: category.id }),
      })

      const payload = (await response.json()) as ApiResponse<null>

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || 'Gagal menghapus kategori.')
      }

      await reloadCategories()
      if (editingId === category.id) {
        resetForm()
      }
      setMessage('Kategori berhasil dihapus.')
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus kategori.')
    }
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Nama kategori"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-neutral-100"
          />
          <input
            type="number"
            value={formState.sequence}
            onChange={(event) => setFormState((prev) => ({ ...prev, sequence: event.target.value }))}
            placeholder="Urutan"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-neutral-100"
          />
          <input
            type="text"
            value={formState.description}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, description: event.target.value }))
            }
            placeholder="Deskripsi singkat"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-neutral-100"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="h-10 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium disabled:opacity-60"
            >
              {editingId ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="h-10 px-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-200"
              >
                Batal
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Cari nama kategori"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
        />
        <button
          type="button"
          onClick={() => setQuery('')}
          className="h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-200"
        >
          Reset Filter
        </button>
      </div>

      {message && (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{message}</p>
      )}

      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/60">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Kode</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Nama</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Slug</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Urutan</th>
              <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {visibleCategories.map((category, index) => (
              <tr key={category.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">
                  {`CAT-${(index + 1).toString().padStart(3, '0')}`}
                </td>
                <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{category.name}</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{slugify(category.name)}</td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{category.sequence}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      className="h-8 px-3 rounded-md border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-300"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleCategories.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400"
                >
                  Tidak ada kategori yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
