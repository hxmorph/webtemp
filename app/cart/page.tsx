"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { PRODUCTS } from "@/lib/products"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getTax, getTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">Your cart is empty</h1>
        <Link
          href="/shop"
          className="inline-block bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const shipping = getShipping()
  const tax = getTax()
  const total = getTotal()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId)
            if (!product) return null

            return (
              <div key={item.productId} className="flex gap-4 border border-border rounded-lg p-4">
                <div className="relative w-24 h-24 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                  <p className="text-primary font-semibold">₹{(product.priceInCents / 100).toLocaleString()}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.productId)} className="text-error hover:text-error/80">
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2 py-1 text-foreground hover:bg-accent"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 font-semibold text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 text-foreground hover:bg-accent"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border rounded-lg p-6 space-y-4 sticky top-20">
            <h2 className="font-serif text-2xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 border-b border-border pb-4">
              <div className="flex justify-between text-foreground">
                <span>Subtotal</span>
                <span>₹{(subtotal / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-success" : ""}>
                  {shipping === 0 ? "FREE" : `₹${(shipping / 100).toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Tax (18%)</span>
                <span>₹{(tax / 100).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>₹{(total / 100).toLocaleString()}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary-dark transition text-center block"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="w-full border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-accent transition text-center block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
