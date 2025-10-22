"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Calendar } from "lucide-react"

const offers = [
  {
    id: 1,
    name: "New Year Sale",
    discount: "20%",
    type: "Percentage",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Active",
  },
  {
    id: 2,
    name: "Free Shipping",
    discount: "₹500",
    type: "Fixed",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "Active",
  },
  {
    id: 3,
    name: "Valentine Special",
    discount: "15%",
    type: "Percentage",
    startDate: "2024-02-01",
    endDate: "2024-02-14",
    status: "Scheduled",
  },
]

export default function AdminOffers() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Promotional Offers</h1>
          <p className="text-muted">Create and manage special offers</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          <Plus className="w-5 h-5" />
          Create Offer
        </button>
      </div>

      {/* Offers Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent">
              <th className="text-left py-4 px-6 font-semibold text-foreground">Offer Name</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Discount</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Type</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Duration</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="border-b border-border hover:bg-accent transition">
                <td className="py-4 px-6 font-medium text-foreground">{offer.name}</td>
                <td className="py-4 px-6 text-foreground font-semibold text-primary">{offer.discount}</td>
                <td className="py-4 px-6 text-foreground">{offer.type}</td>
                <td className="py-4 px-6 text-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-muted" />
                    {offer.startDate} to {offer.endDate}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      offer.status === "Active" ? "bg-success/10 text-success" : "bg-accent text-foreground"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition text-primary">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-error/10 rounded-lg transition text-error">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-foreground">Create New Offer</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Offer Name"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Discount Value"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Percentage</option>
                  <option>Fixed</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  placeholder="Start Date"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-secondary rounded-lg font-semibold hover:bg-primary-dark transition">
                Create Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
