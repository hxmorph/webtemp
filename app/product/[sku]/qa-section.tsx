"use client"

import type React from "react"

import { useState } from "react"
import { ThumbsUp } from "lucide-react"

interface QAItem {
  id: number
  question: string
  answer: string
  helpful: number
  author: string
  date: string
}

const qaData: QAItem[] = [
  {
    id: 1,
    question: "Is this ring available in different sizes?",
    answer:
      "Yes, this ring is available in all standard sizes from 4 to 12. You can specify your size during checkout.",
    helpful: 24,
    author: "Admin",
    date: "2024-01-10",
  },
  {
    id: 2,
    question: "What is the return policy?",
    answer: "We offer a 30-day return policy for all items in original condition. Free returns within India.",
    helpful: 18,
    author: "Admin",
    date: "2024-01-08",
  },
  {
    id: 3,
    question: "Can I customize this design?",
    answer: "We offer custom design services. Please visit our design request page for more details.",
    helpful: 12,
    author: "Admin",
    date: "2024-01-05",
  },
]

export function QASection() {
  const [showForm, setShowForm] = useState(false)
  const [question, setQuestion] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuestion("")
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg text-foreground">Questions & Answers</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-primary font-semibold hover:text-primary-dark transition"
        >
          Ask a Question
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-accent p-4 rounded-lg space-y-3">
          <textarea
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-secondary rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Post Question
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {qaData.map((item) => (
          <div key={item.id} className="border border-border rounded-lg p-4 space-y-3">
            <div>
              <p className="font-semibold text-foreground mb-2">{item.question}</p>
              <p className="text-foreground text-sm">{item.answer}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-muted">
                <span>{item.author}</span>
                <span>{item.date}</span>
              </div>
              <button className="flex items-center gap-1 text-muted hover:text-primary transition">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs">{item.helpful}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
