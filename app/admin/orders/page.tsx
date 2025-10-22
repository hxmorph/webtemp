"use client"

import { useState } from "react"
import { Eye, Download } from "lucide-react"

const orders = [
  {
    id: "#ORD-001",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    amount: "₹12,000",
    status: "Delivered",
    date: "2024-01-15",
    items: 1,
  },
  {
    id: "#ORD-002",
    customer: "Priya Singh",
    email: "priya@example.com",
    amount: "₹45,000",
    status: "Processing",
    date: "2024-01-14",
    items: 1,
  },
  {
    id: "#ORD-003",
    customer: "Amit Patel",
    email: "amit@example.com",
    amount: "₹8,000",
    status: "Shipped",
    date: "2024-01-13",
    items: 2,
  },
]

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted">Track and manage customer orders</p>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent">
              <th className="text-left py-4 px-6 font-semibold text-foreground">Order ID</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Customer</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Amount</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Items</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-accent transition">
                <td className="py-4 px-6 font-medium text-foreground">{order.id}</td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-foreground font-medium">{order.customer}</p>
                    <p className="text-muted text-xs">{order.email}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-foreground font-semibold">{order.amount}</td>
                <td className="py-4 px-6 text-foreground">{order.items}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-success/10 text-success"
                        : order.status === "Shipped"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent text-foreground"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-muted">{order.date}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition text-primary">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition text-primary">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
