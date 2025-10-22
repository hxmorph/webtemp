"use client"

import type React from "react"

import { useState } from "react"
import { Save, AlertCircle } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: "SenBok",
    email: "hello@senbok.com",
    phone: "+91 98765 43210",
    address: "Mumbai, India",
    taxRate: "18",
    shippingThreshold: "5000",
    currency: "INR",
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted">Manage your store configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Settings */}
        <div className="bg-white border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground">Store Information</h2>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-lg text-foreground">Business Settings</h2>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Free Shipping Threshold (₹)</label>
            <input
              type="number"
              name="shippingThreshold"
              value={settings.shippingThreshold}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900">Security Notice</p>
          <p className="text-sm text-blue-800">
            Keep your API keys and sensitive information secure. Never share them publicly.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>

      {saved && (
        <div className="bg-success/10 border border-success text-success p-4 rounded-lg">
          Settings saved successfully!
        </div>
      )}
    </div>
  )
}
