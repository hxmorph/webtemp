import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product-card"
import { RecommendationsSection } from "@/components/recommendations-section"
import { ArrowRight } from "lucide-react"

export default function Home() {
  // Mock data - will be replaced with API calls
  const featuredProducts = [
    {
      id: 1,
      sku: "SKU-001",
      name: "Gold Pendant Necklace",
      image: "/gold-pendant-necklace.jpg",
      price: 12000,
      originalPrice: 15000,
      rating: 4.5,
      reviews: 23,
      featured: true,
    },
    {
      id: 2,
      sku: "SKU-002",
      name: "Pearl Earrings",
      image: "/pearl-earrings.png",
      price: 8000,
      originalPrice: 10000,
      rating: 4.2,
      reviews: 15,
      featured: false,
    },
    {
      id: 3,
      sku: "SKU-003",
      name: "Diamond Ring",
      image: "/sparkling-diamond-ring.png",
      price: 45000,
      originalPrice: 50000,
      rating: 4.8,
      reviews: 45,
      featured: true,
    },
    {
      id: 4,
      sku: "SKU-004",
      name: "Emerald Bracelet",
      image: "/emerald-bracelet.png",
      price: 35000,
      originalPrice: 40000,
      rating: 4.3,
      reviews: 18,
      featured: false,
    },
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-secondary to-secondary/80 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/luxury-jewelry-hero-background.jpg" alt="Hero" fill className="object-cover opacity-30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">Timeless Elegance</h1>
          <p className="text-xl md:text-2xl text-accent mb-8 max-w-2xl text-balance">
            Discover exquisite handcrafted jewelry pieces that celebrate your unique style
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">Featured Collection</h2>
          <p className="text-muted text-lg">Handpicked pieces that define luxury and sophistication</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <RecommendationsSection title="Trending Now" type="trending" limit={6} />

      {/* CTA Section */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Custom Design Service</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Have a unique vision? Our expert designers can bring your dream jewelry to life
          </p>
          <Link
            href="/design-request"
            className="inline-block bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Request Custom Design
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">Why Choose SenBok</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Authentic Quality",
              description: "100% certified precious metals and gemstones",
            },
            {
              title: "Expert Craftsmanship",
              description: "Handcrafted by master artisans with decades of experience",
            },
            {
              title: "Lifetime Support",
              description: "Free cleaning, maintenance, and lifetime warranty",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary font-bold text-2xl">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
