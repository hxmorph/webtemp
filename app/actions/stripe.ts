"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function createCheckoutSession(
  lineItems: Array<{ productId: string; quantity: number }>,
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  },
) {
  // Validate products and calculate totals
  let totalAmount = 0
  const sessionLineItems: Array<{
    price_data: {
      currency: string
      product_data: {
        name: string
        description?: string
      }
      unit_amount: number
    }
    quantity: number
  }> = []

  for (const item of lineItems) {
    const product = PRODUCTS.find((p) => p.id === item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
    }

    totalAmount += product.priceInCents * item.quantity

    sessionLineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    })
  }

  // Calculate shipping (free for orders > ₹5000)
  const shippingCost = totalAmount > 500000 ? 0 : 50000 // ₹500 or free

  // Calculate tax (18% GST for India)
  const taxAmount = Math.round(totalAmount * 0.18)

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: sessionLineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: shippingCost,
            currency: "inr",
          },
          display_name: shippingCost === 0 ? "Free Shipping" : "Standard Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      email: shippingAddress.email,
      phone: shippingAddress.phone,
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
      country: shippingAddress.country,
    },
  })

  return {
    clientSecret: session.client_secret,
    sessionId: session.id,
  }
}

export async function getCheckoutSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.payment_status,
    paymentStatus: session.payment_status,
    fulfillmentStatus: session.fulfillment_status,
  }
}
