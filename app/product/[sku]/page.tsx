"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Share2, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { QASection } from "./qa-section"

export default function ProductPage({ params }: { params: { sku: string } }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  // Mock product data
  const product = {
    sku: params.sku,
    name: "Gold Pendant Necklace",
    price: 12000,
    originalPrice: 15000,
    rating: 4.5,
    reviews: 23,
    description:
      "Elegant 18K gold pendant with diamond accents. This timeless piece combines classic design with modern sophistication.",
    images: ["/gold-pendant-necklace.jpg", "/gold-pendant-necklace.jpg", "/gold-pendant-necklace.jpg"],
    specifications: {
      material: "18K Gold",
      weight: "8.5g",
      dimensions: "2.5cm x 1.8cm",
      metalType: "Yellow Gold",
      gemstone: "Diamond",
    },
    inStock: true,
    inventory: 15,
  }

  const productIdMap: { [key: string]: string } = {
    "SKU-001": "gold-pendant",
    "SKU-002": "pearl-earrings",
    "SKU-003": "diamond-ring",
    "SKU-004": "emerald-bracelet",
  }

  const handleAddToCart = () => {
    const productId = productIdMap[params.sku] || `product-${params.sku}`
    addItem(productId, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-accent rounded-lg overflow-hidden">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square bg-accent rounded-lg overflow-hidden cursor-pointer hover:opacity-75"
              >
                <Image src={img || "/placeholder.svg"} alt={`View ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < Math.floor(product.rating) ? "text-primary" : "text-border"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-error text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </div>
            <p className="text-sm text-success font-semibold">
              {product.inStock ? `${product.inventory} in stock` : "Out of stock"}
            </p>
          </div>

          {/* Description */}
          <p className="text-foreground leading-relaxed">{product.description}</p>

          {/* Specifications */}
          <div className="border-t border-b border-border py-6 space-y-3">
            <h3 className="font-semibold text-foreground">Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-muted capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-foreground hover:bg-accent"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-foreground hover:bg-accent">
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 rounded-lg border transition ${
                  isWishlisted
                    ? "bg-primary text-secondary border-primary"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              <button className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-accent p-4 rounded-lg space-y-2">
            <p className="text-sm font-semibold text-foreground">✓ 100% Authentic</p>
            <p className="text-sm font-semibold text-foreground">✓ Lifetime Warranty</p>
            <p className="text-sm font-semibold text-foreground">✓ Free Shipping on Orders Above ₹5,000</p>
          </div>
        </div>
      </div>

      {/* Q&A Section */}
      <div className="border-t border-border pt-12 mb-16">
        <QASection />
      </div>

      {/* Reviews Section */}
      <div className="border-t border-border pt-12">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-border pb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-foreground">Verified Buyer</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-primary">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted">2 weeks ago</span>
              </div>
              <p className="text-foreground">
                Absolutely stunning piece! The quality is exceptional and it arrived beautifully packaged. Highly
                recommend!
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
