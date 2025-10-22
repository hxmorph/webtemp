import { getRecommendations } from "@/lib/recommendations"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const limit = Number.parseInt(searchParams.get("limit") || "5")

    if (!userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 })
    }

    const recommendations = getRecommendations(userId, limit)
    return Response.json({ recommendations })
  } catch (error) {
    return Response.json({ error: "Failed to get recommendations" }, { status: 500 })
  }
}
