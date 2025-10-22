"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { PRODUCTS } from "@/lib/products"

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)

  const filteredProducts = PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Products</h1>
          <p className="text-muted">Manage your jewelry collection</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent">
              <th className="text-left py-4 px-6 font-semibold text-foreground">Product</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">SKU</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Price</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-accent transition">
                <td className="py-4 px-6 font-medium text-foreground">{product.name}</td>
                <td className="py-4 px-6 text-foreground">{product.sku}</td>
                <td className="py-4 px-6 text-foreground font-semibold">
                  ₹{(product.priceInCents / 100).toLocaleString()}
                </td>
                <td className="py-4 px-6 text-foreground capitalize">{product.category}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition text-primary">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-error/10 rounded-lg transition text-error">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground">Add New Product</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="SKU"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Select Category</option>
                <option>Necklaces</option>
                <option>Bracelets</option>
                <option>Rings</option>
                <option>Earrings</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-secondary rounded-lg font-semibold hover:bg-primary-dark transition">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
