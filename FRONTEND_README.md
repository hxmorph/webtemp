# SenBok Frontend

A beautiful, responsive Next.js frontend for the SenBok luxury jewelry e-commerce platform.

## Features

- Responsive design (mobile-first)
- Product catalog with filtering
- Product detail pages
- Shopping cart management
- Checkout flow
- User authentication pages
- Admin dashboard (coming soon)

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React Icons

## Getting Started

### Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

- \`app/\` - Next.js app router pages
- \`components/\` - Reusable React components
- \`public/\` - Static assets
- \`app/globals.css\` - Global styles and design tokens

## Design System

The application uses a luxury jewelry aesthetic with:
- **Primary Color**: Gold (#d4af37)
- **Secondary Color**: Dark Gray (#2c2c2c)
- **Background**: Off-white (#faf9f7)
- **Accent**: Light Gray (#e8e8e8)

All colors are defined as CSS variables in \`globals.css\` for easy theming.

## API Integration

The frontend connects to the backend API at \`http://localhost:3001\`. Update the API base URL in environment variables as needed.

## Deployment

The frontend can be deployed to Vercel, Netlify, or any Node.js hosting platform.

\`\`\`bash
npm run build
npm start
\`\`\`
