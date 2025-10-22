"use client"

import { useEffect } from "react"

interface EventTrackerProps {
  userId: string
  eventType: "view" | "add_to_cart" | "purchase" | "wishlist" | "search"
  productId: string
  metadata?: Record<string, any>
}

export function EventTracker({ userId, eventType, productId, metadata }: EventTrackerProps) {
  useEffect(() => {
    const trackEvent = async () => {
      try {
        await fetch("/api/events/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            eventType,
            productId,
            metadata,
          }),
        })
      } catch (error) {
        console.error("Failed to track event:", error)
      }
    }

    trackEvent()
  }, [userId, eventType, productId, metadata])

  return null
}
