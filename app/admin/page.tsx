"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"

const salesData = [
  { month: "Jan", sales: 4000, orders: 24 },
  { month: "Feb", sales: 3000, orders: 18 },
  { month: "Mar", sales: 2000, orders: 15 },
  { month: "Apr", sales: 2780, orders: 20 },
  { month: "May", sales: 1890, orders: 14 },
  { month: "Jun", sales: 2390, orders: 18 },
]

const stats = [
  { label: "Total Revenue", value: "₹18,060", icon: DollarSign, trend: "+12.5%" },
  { label: "Total Orders", value: "109", icon: ShoppingCart, trend: "+8.2%" },
  { label: "Products", value: "24", icon: Package, trend: "+2" },
  { label: "Growth", value: "23.5%", icon: TrendingUp, trend: "+4.3%" },
]

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-success text-sm font-semibold">{stat.trend}</span>
              </div>
              <p className="text-muted text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="font-semibold text-foreground mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#d4af37" />
              <Bar dataKey="orders" fill="#9ca3af" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="font-semibold text-foreground mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#d4af37" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="font-semibold text-foreground mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#ORD-001",
                  customer: "Rajesh Kumar",
                  amount: "₹12,000",
                  status: "Delivered",
                  date: "2024-01-15",
                },
                {
                  id: "#ORD-002",
                  customer: "Priya Singh",
                  amount: "₹45,000",
                  status: "Processing",
                  date: "2024-01-14",
                },
                { id: "#ORD-003", customer: "Amit Patel", amount: "₹8,000", status: "Shipped", date: "2024-01-13" },
              ].map((order, i) => (
                <tr key={i} className="border-b border-border hover:bg-accent">
                  <td className="py-3 px-4 text-foreground font-medium">{order.id}</td>
                  <td className="py-3 px-4 text-foreground">{order.customer}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 text-muted">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
