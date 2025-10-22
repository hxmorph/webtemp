import { trackEvent } from "@/lib/events"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, eventType, productId, metadata } = body

    if (!userId || !eventType || !productId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    trackEvent({
      userId,
      eventType,
      productId,
      timestamp: Date.now(),
      metadata,
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Failed to track event" }, { status: 500 })
  }
}
