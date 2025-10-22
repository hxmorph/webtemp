"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { getProductById } from "./products"

export interface CartItem {
  productId: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getSubtotal: () => number
  getShipping: () => number
  getTax: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { productId, quantity }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        setItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
      }
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => {
      const product = getProductById(item.productId)
      return sum + (product?.priceInCents || 0) * item.quantity
    }, 0)
  }, [items])

  const getShipping = useCallback(() => {
    const subtotal = getSubtotal()
    return subtotal > 500000 ? 0 : 50000 // Free shipping over ₹5000
  }, [getSubtotal])

  const getTax = useCallback(() => {
    const subtotal = getSubtotal()
    return Math.round(subtotal * 0.18) // 18% GST
  }, [getSubtotal])

  const getTotal = useCallback(() => {
    return getSubtotal() + getShipping() + getTax()
  }, [getSubtotal, getShipping, getTax])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotal,
        getShipping,
        getTax,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
