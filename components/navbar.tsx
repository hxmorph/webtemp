"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-secondary font-bold text-sm">S</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">SenBok</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-foreground hover:text-primary transition">
              Shop
            </Link>
            <Link href="/design-request" className="text-foreground hover:text-primary transition">
              Custom Design
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-foreground hover:text-primary transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/account">
              <User className="w-5 h-5 text-foreground hover:text-primary transition" />
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border space-y-2">
            <Link href="/shop" className="block py-2 text-foreground hover:text-primary">
              Shop
            </Link>
            <Link href="/design-request" className="block py-2 text-foreground hover:text-primary">
              Custom Design
            </Link>
            <Link href="/about" className="block py-2 text-foreground hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
