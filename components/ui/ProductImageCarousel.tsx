'use client'

import { useMemo, useState } from 'react'
import type { ElectronicCatalogProductImage } from '@/lib/electronicProductCatalog'

export default function ProductImageCarousel({
  images,
  productName,
}: {
  images: ElectronicCatalogProductImage[]
  productName: string
}) {
  const sortedImages = useMemo(() => {
    return [...images].sort((firstImage, secondImage) => {
      const byPosition = firstImage.position - secondImage.position
      if (byPosition !== 0) {
        return byPosition
      }

      if (firstImage.is_primary === secondImage.is_primary) {
        return 0
      }

      return firstImage.is_primary ? -1 : 1
    })
  }, [images])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = sortedImages[selectedIndex]

  if (sortedImages.length === 0) {
    return (
      <div className="h-72 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
        Belum ada gambar produk
      </div>
    )
  }

  function showPrev() {
    setSelectedIndex((prev) => {
      if (prev === 0) {
        return sortedImages.length - 1
      }

      return prev - 1
    })
  }

  function showNext() {
    setSelectedIndex((prev) => (prev + 1) % sortedImages.length)
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <img
          src={selectedImage.image_url}
          alt={`${productName} - Gambar ${selectedIndex + 1}`}
          className="h-72 w-full object-cover"
        />

        {sortedImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/30 bg-black/45 text-white"
              aria-label="Gambar sebelumnya"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/30 bg-black/45 text-white"
              aria-label="Gambar berikutnya"
            >
              ›
            </button>
          </>
        )}
      </div>

      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-700"
            >
              <img
                src={image.image_url}
                alt={`${productName} thumbnail ${index + 1}`}
                className={`h-14 w-full object-cover transition-opacity ${
                  index === selectedIndex ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
