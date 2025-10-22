export interface UserEvent {
  userId: string
  eventType: "view" | "add_to_cart" | "purchase" | "wishlist" | "search"
  productId: string
  timestamp: number
  metadata?: Record<string, any>
}

export interface UserProfile {
  userId: string
  viewedProducts: string[]
  purchasedProducts: string[]
  cartItems: string[]
  wishlistItems: string[]
  preferences: {
    categories: string[]
    priceRange: [number, number]
    materials: string[]
  }
}

// In-memory event store (in production, use database)
const eventStore: UserEvent[] = []
const userProfiles: Map<string, UserProfile> = new Map()

export function trackEvent(event: UserEvent) {
  eventStore.push(event)
  updateUserProfile(event)
}

function updateUserProfile(event: UserEvent) {
  let profile = userProfiles.get(event.userId)
  if (!profile) {
    profile = {
      userId: event.userId,
      viewedProducts: [],
      purchasedProducts: [],
      cartItems: [],
      wishlistItems: [],
      preferences: {
        categories: [],
        priceRange: [0, 100000],
        materials: [],
      },
    }
  }

  switch (event.eventType) {
    case "view":
      if (!profile.viewedProducts.includes(event.productId)) {
        profile.viewedProducts.push(event.productId)
      }
      break
    case "add_to_cart":
      if (!profile.cartItems.includes(event.productId)) {
        profile.cartItems.push(event.productId)
      }
      break
    case "purchase":
      if (!profile.purchasedProducts.includes(event.productId)) {
        profile.purchasedProducts.push(event.productId)
      }
      profile.cartItems = profile.cartItems.filter((id) => id !== event.productId)
      break
    case "wishlist":
      if (!profile.wishlistItems.includes(event.productId)) {
        profile.wishlistItems.push(event.productId)
      }
      break
  }

  userProfiles.set(event.userId, profile)
}

export function getUserProfile(userId: string): UserProfile | undefined {
  return userProfiles.get(userId)
}

export function getEventHistory(userId: string): UserEvent[] {
  return eventStore.filter((e) => e.userId === userId)
}
