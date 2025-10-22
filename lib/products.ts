export interface Product {
  id: string
  sku: string
  name: string
  description: string
  priceInCents: number
  category: string
  image?: string
  images?: string[]
}

// Source of truth for all products
export const PRODUCTS: Product[] = [
  {
    id: "gold-pendant",
    sku: "SKU-001",
    name: "Gold Pendant Necklace",
    description: "Elegant 18K gold pendant necklace with intricate design",
    priceInCents: 1200000, // ₹12,000
    category: "necklaces",
    image: "/gold-pendant-necklace.jpg",
  },
  {
    id: "diamond-ring",
    sku: "SKU-003",
    name: "Diamond Ring",
    description: "Stunning diamond solitaire ring in white gold",
    priceInCents: 4500000, // ₹45,000
    category: "rings",
    image: "/sparkling-diamond-ring.png",
  },
  {
    id: "pearl-earrings",
    sku: "SKU-002",
    name: "Pearl Earrings",
    description: "Classic pearl drop earrings with gold settings",
    priceInCents: 800000, // ₹8,000
    category: "earrings",
    image: "/pearl-earrings.png",
  },
  {
    id: "emerald-bracelet",
    sku: "SKU-004",
    name: "Emerald Bracelet",
    description: "Luxurious emerald bracelet with diamond accents",
    priceInCents: 3500000, // ₹35,000
    category: "bracelets",
    image: "/emerald-bracelet.png",
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductBySku(sku: string): Product | undefined {
  return PRODUCTS.find((p) => p.sku === sku)
}
