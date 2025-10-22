"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface ProductCardProps {
  id: number
  sku: string
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  featured?: boolean
}

export function ProductCard({
  id,
  sku,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  featured,
}: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  const productIdMap: { [key: string]: string } = {
    "SKU-001": "gold-pendant",
    "SKU-002": "pearl-earrings",
    "SKU-003": "diamond-ring",
    "SKU-004": "emerald-bracelet",
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    const productId = productIdMap[sku] || `product-${id}`
    addItem(productId, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Link href={`/product/${sku}`}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-accent rounded-lg mb-4 aspect-square">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          {featured && (
            <div className="absolute top-3 right-3 bg-primary text-secondary px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-error text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className={`p-3 rounded-full transition ${
                isAdded ? "bg-success text-white" : "bg-primary text-secondary hover:bg-primary-dark"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="bg-white text-foreground p-3 rounded-full hover:bg-accent transition">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(rating) ? "text-primary" : "text-border"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">₹{price.toLocaleString()}</span>
            {originalPrice > price && (
              <span className="text-sm text-muted line-through">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
