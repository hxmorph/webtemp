# SenBok - AI-Driven D2C Jewelry E-Commerce Platform

A production-ready, full-stack e-commerce platform for luxury jewelry with AI-powered personalization, secure payments, and comprehensive admin tools.

## Features

### M1 (MVP) ✅ Complete
- ✅ User authentication (email/password with JWT)
- ✅ Product catalog with filtering and search
- ✅ Shopping cart management with context state
- ✅ Multi-step checkout flow
- ✅ Admin product CRUD operations
- ✅ User activity tracking
- ✅ Responsive design with luxury aesthetic

### M2 (Payment & Shipping) ✅ Complete
- ✅ Stripe payment integration with embedded checkout
- ✅ Dynamic shipping calculation (free over ₹5,000)
- ✅ 18% GST tax calculation
- ✅ Comprehensive admin dashboard with analytics
- ✅ Order tracking and status management
- ✅ Promotional offers system
- ✅ Design request workflow
- ✅ Q&A system on product pages

### M3 (AI & Polish) ✅ Complete
- ✅ Event tracking system for user behavior
- ✅ User profiling with preferences
- ✅ AI-powered product recommendations
- ✅ Trending products section
- ✅ Custom design request form
- ✅ Dynamic cart count in navbar
- ✅ Security headers and optimization
- ✅ Production-ready deployment config

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Express, Node.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Charts**: Recharts
- **Icons**: Lucide React
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account (for payments)

### Local Development

\`\`\`bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

### Environment Variables

Create a `.env.local` file with:

\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_MCP_KEY=your_stripe_mcp_key
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx              # Root layout with CartProvider
│   ├── page.tsx                # Homepage with featured products
│   ├── shop/                   # Product listing page
│   ├── product/[sku]/          # Product detail page with Q&A
│   ├── cart/                   # Shopping cart page
│   ├── checkout/               # Multi-step checkout
│   ├── design-request/         # Custom design form
│   ├── admin/                  # Admin dashboard
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── products/           # Product management
│   │   ├── orders/             # Order tracking
│   │   ├── offers/             # Promotional offers
│   │   └── settings/           # Store settings
│   └── api/
│       ├── events/track/       # Event tracking endpoint
│       └── recommendations/    # Recommendations endpoint
├── components/
│   ├── navbar.tsx              # Navigation with cart count
│   ├── footer.tsx              # Footer with links
│   ├── product-card.tsx        # Product card component
│   ├── admin-sidebar.tsx       # Admin navigation
│   ├── stripe-checkout.tsx     # Stripe payment form
│   ├── recommendations-section.tsx  # Trending products
│   └── event-tracker.tsx       # Event tracking hook
├── lib/
│   ├── cart-context.tsx        # Cart state management
│   ├── products.ts             # Product catalog
│   ├── stripe.ts               # Stripe configuration
│   ├── events.ts               # Event tracking logic
│   └── recommendations.ts      # AI recommendations
├── public/                     # Static assets
└── app/globals.css             # Tailwind styles with design tokens
\`\`\`

## Key Features

### Shopping Experience
- Browse luxury jewelry with advanced filtering
- Add items to cart with real-time updates
- Multi-step checkout with address validation
- Secure Stripe payment processing
- Order confirmation and tracking

### Admin Dashboard
- Real-time sales analytics and charts
- Product management (add, edit, delete)
- Order tracking with status updates
- Promotional offers creation
- Store settings configuration

### AI & Personalization
- Track user behavior (views, purchases, wishlist)
- Generate personalized recommendations
- Trending products section
- User preference profiling

### Custom Design
- Submit custom jewelry design requests
- Specify materials, budget, and timeline
- Upload reference images
- Direct designer consultation

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_MCP_KEY`
4. Deploy with one click

### Production Checklist

- [ ] Update Stripe keys to production
- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Setup monitoring and logging
- [ ] Configure database backups
- [ ] Setup email notifications
- [ ] Test payment flow end-to-end
- [ ] Verify all admin functions
- [ ] Test mobile responsiveness
- [ ] Setup analytics tracking

## API Endpoints

### Events
- `POST /api/events/track` - Track user events (view, purchase, etc.)

### Recommendations
- `GET /api/recommendations?userId=xxx&limit=5` - Get personalized recommendations

## Styling

The app uses Tailwind CSS v4 with custom design tokens for a luxury jewelry aesthetic:
- **Primary**: Gold (#d4af37)
- **Secondary**: Dark gray (#2c2c2c)
- **Accent**: Light gray (#e8e8e8)
- **Background**: Off-white (#faf9f7)

All colors are defined in `app/globals.css` and can be customized via CSS variables.

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for product images
- Cart state management with React Context
- Efficient database queries with Prisma
- CSS-in-JS with Tailwind for minimal bundle size

## Security

- Secure JWT authentication
- Password hashing with bcryptjs
- CORS protection
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Environment variable protection
- Stripe PCI compliance

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please open a GitHub issue or contact hello@senbok.com
