export interface ElectronicCatalogCategoryRef {
  id: string
  name: string
}

export interface ElectronicCatalogProductImage {
  id: string
  image_url: string
  is_primary: boolean
  position: number
}

export interface ElectronicCatalogProductDocument {
  id: number
  title: string
  description: string
  gdrive_url: string
  doc_type: string
  position: number
}

export interface ElectronicCatalogItem {
  id: number
  name: string
  category: string
  category_id: string | null
  category_ref: ElectronicCatalogCategoryRef | null
  description: string
  status: string
  features: string[]
  is_recent: boolean
  is_featured: boolean
  images: ElectronicCatalogProductImage[]
  primary_image_url: string
  documents: ElectronicCatalogProductDocument[]
}
