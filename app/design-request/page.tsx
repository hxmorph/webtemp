"use client"

import type React from "react"
import { useState } from "react"
import { Send, Upload } from "lucide-react"

export default function DesignRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    budget: "",
    timeline: "",
    materials: [] as string[],
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMaterialToggle = (material: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter((m) => m !== material)
        : [...prev.materials, material],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Custom Design Request</h1>
        <p className="text-muted text-lg">
          Have a unique vision? Our expert designers will bring your dream jewelry to life
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-foreground">Your Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Design Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-foreground">Design Details</h2>
              <textarea
                name="description"
                placeholder="Describe your design idea in detail..."
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Materials */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-foreground">Preferred Materials</h2>
              <div className="grid grid-cols-2 gap-3">
                {["Gold", "Silver", "Platinum", "Diamond", "Emerald", "Pearl"].map((material) => (
                  <label key={material} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.materials.includes(material)}
                      onChange={() => handleMaterialToggle(material)}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground">{material}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select budget</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-25000">₹10,000 - ₹25,000</option>
                  <option value="25000-50000">₹25,000 - ₹50,000</option>
                  <option value="50000+">₹50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select timeline</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="2-4-weeks">2-4 weeks</option>
                  <option value="1-2-months">1-2 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-foreground">Reference Images (Optional)</h2>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition">
                <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                <p className="text-foreground font-medium">Drag and drop images here</p>
                <p className="text-sm text-muted">or click to browse</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Design Request
            </button>

            {submitted && (
              <div className="bg-success/10 border border-success text-success p-4 rounded-lg">
                Thank you! We'll review your request and contact you soon.
              </div>
            )}
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-accent rounded-lg p-6 space-y-6 sticky top-20">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Design Process</h3>
              <ol className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>Submit your design idea</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>Our team reviews and quotes</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>Detailed design consultation</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>Crafting and quality check</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-primary">5.</span>
                  <span>Delivery and lifetime support</span>
                </li>
              </ol>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-foreground mb-4">
                Contact our design team directly for personalized assistance.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">
                  <span className="font-semibold">Email:</span> design@senbok.com
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Phone:</span> +91 98765 43210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
