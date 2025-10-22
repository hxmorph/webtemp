"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import StripeCheckout from "@/components/stripe-checkout"
import { PRODUCTS } from "@/lib/products"

export default function CheckoutPage() {
  const { items, getSubtotal, getShipping, getTax, getTotal } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    }
  }

  const subtotal = getSubtotal()
  const shipping = getShipping()
  const tax = getTax()
  const total = getTotal()

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                s <= step ? "bg-primary text-secondary" : "bg-accent text-muted"
              }`}
            >
              {s < step ? <Check className="w-5 h-5" /> : s}
            </div>
            <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-primary" : "bg-accent"}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>India</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Payment</h2>
                <StripeCheckout lineItems={items} shippingAddress={formData} />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-border rounded-lg p-6 space-y-4 sticky top-20">
            <h2 className="font-serif text-2xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-3 border-b border-border pb-4 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId)
                if (!product) return null

                return (
                  <div key={item.productId} className="flex justify-between text-sm text-foreground">
                    <span>
                      {product.name} x{item.quantity}
                    </span>
                    <span>₹{((product.priceInCents * item.quantity) / 100).toLocaleString()}</span>
                  </div>
                )
              })}
            </div>

            <div className="space-y-2 text-sm">
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

            <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span>₹{(total / 100).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
