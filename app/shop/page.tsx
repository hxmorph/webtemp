"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ChevronDown } from "lucide-react"

export default function ShopPage() {
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sort: "newest",
  })

  // Mock data
  const products = [
    {
      id: 1,
      sku: "SKU-001",
      name: "Gold Pendant Necklace",
      image: "/gold-pendant.png",
      price: 12000,
      originalPrice: 15000,
      rating: 4.5,
      reviews: 23,
      featured: true,
    },
    {
      id: 2,
      sku: "SKU-002",
      name: "Silver Bracelet",
      image: "/silver-bracelet.png",
      price: 3500,
      originalPrice: 5000,
      rating: 4.2,
      reviews: 15,
      featured: false,
    },
    {
      id: 3,
      sku: "SKU-003",
      name: "Diamond Ring",
      image: "/sparkling-diamond-ring.png",
      price: 45000,
      originalPrice: 50000,
      rating: 4.8,
      reviews: 45,
      featured: true,
    },
    {
      id: 4,
      sku: "SKU-004",
      name: "Pearl Earrings",
      image: "/pearl-earrings.png",
      price: 6500,
      originalPrice: 8000,
      rating: 4.3,
      reviews: 18,
      featured: false,
    },
    {
      id: 5,
      sku: "SKU-005",
      name: "Emerald Choker",
      image: "/emerald-choker.jpg",
      price: 20000,
      originalPrice: 25000,
      rating: 4.6,
      reviews: 32,
      featured: true,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Shop Collection</h1>
        <p className="text-muted">Discover our complete range of luxury jewelry</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Category</h3>
              <div className="space-y-2">
                {["All", "Necklaces", "Bracelets", "Rings", "Earrings"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat.toLowerCase()}
                      checked={filters.category === cat.toLowerCase()}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
              <div className="space-y-2">
                {[
                  { label: "All Prices", value: "all" },
                  { label: "Under ₹5,000", value: "0-5000" },
                  { label: "₹5,000 - ₹15,000", value: "5000-15000" },
                  { label: "₹15,000 - ₹50,000", value: "15000-50000" },
                  { label: "Above ₹50,000", value: "50000+" },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Sort By</h3>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg appearance-none bg-background text-foreground cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
