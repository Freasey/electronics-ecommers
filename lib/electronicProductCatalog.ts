export interface ElectronicCatalogCategoryRef {
  id: number
  name: string
}

export interface ElectronicCatalogItem {
  id: number
  name: string
  category: string
  category_id: number | null
  category_ref: ElectronicCatalogCategoryRef | null
  description: string
  status: string
  features: string[]
  is_recent: boolean
  is_featured: boolean
}
