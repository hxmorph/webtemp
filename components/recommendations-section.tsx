"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PRODUCTS } from "@/lib/products"
import { getTrendingProducts } from "@/lib/recommendations"

interface RecommendationsSectionProps {
  title?: string
  limit?: number
  type?: "trending" | "recommended"
}

export function RecommendationsSection({
  title = "Trending Now",
  limit = 6,
  type = "trending",
}: RecommendationsSectionProps) {
  const [productIds, setProductIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (type === "trending") {
      setProductIds(getTrendingProducts(limit))
    }
    setLoading(false)
  }, [limit, type])

  if (loading) {
    return <div className="text-center py-12">Loading recommendations...</div>
  }

  const products = productIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-muted text-lg">Discover our most popular pieces</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link key={product?.id} href={`/product/${product?.sku}`}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden bg-accent rounded-lg mb-4 aspect-square">
                <Image
                  src={product?.image || "/placeholder.svg"}
                  alt={product?.name || "Product"}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition">
                {product?.name}
              </h3>
              <p className="text-primary font-semibold mt-2">
                ₹{((product?.priceInCents || 0) / 100).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
