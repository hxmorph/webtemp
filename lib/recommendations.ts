import { PRODUCTS } from "./products"
import { getUserProfile } from "./events"

export interface Recommendation {
  productId: string
  score: number
  reason: string
}

export function getRecommendations(userId: string, limit = 5): Recommendation[] {
  const profile = getUserProfile(userId)
  if (!profile) {
    // Return popular products for new users
    return PRODUCTS.slice(0, limit).map((p) => ({
      productId: p.id,
      score: 0.5,
      reason: "Popular item",
    }))
  }

  const recommendations: Recommendation[] = []
  const scoredProducts = new Map<string, number>()

  // Score products based on user behavior
  PRODUCTS.forEach((product) => {
    let score = 0

    // Boost score if user viewed similar products
    if (profile.viewedProducts.length > 0) {
      score += 0.3
    }

    // Boost score if in user's preferred category
    if (profile.preferences.categories.includes(product.category)) {
      score += 0.4
    }

    // Boost score if in price range
    if (
      product.priceInCents >= profile.preferences.priceRange[0] &&
      product.priceInCents <= profile.preferences.priceRange[1]
    ) {
      score += 0.3
    }

    // Don't recommend already purchased items
    if (profile.purchasedProducts.includes(product.id)) {
      score = 0
    }

    // Don't recommend items already in cart or wishlist
    if (profile.cartItems.includes(product.id) || profile.wishlistItems.includes(product.id)) {
      score = 0
    }

    if (score > 0) {
      scoredProducts.set(product.id, score)
    }
  })

  // Sort by score and create recommendations
  const sorted = Array.from(scoredProducts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)

  sorted.forEach(([productId, score]) => {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (product) {
      recommendations.push({
        productId,
        score,
        reason: `Based on your interest in ${product.category}`,
      })
    }
  })

  return recommendations
}

export function getRelatedProducts(productId: string, limit = 4): string[] {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) return []

  return PRODUCTS.filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
    .map((p) => p.id)
}

export function getTrendingProducts(limit = 6): string[] {
  // In production, this would be based on actual sales data
  return PRODUCTS.slice(0, limit).map((p) => p.id)
}
