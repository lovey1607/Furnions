# Furnions | Quiet Luxury Furniture

A luxury furniture website built with Next.js 15, featuring the Furnions brand identity with sophisticated design, smooth animations, and accessible user experience.

## Features

### 🎨 Brand Identity
- **Typography**: Montserrat for headings, Open Sans for body text
- **Color Palette**: 
  - Primary Brown (#8B4513)
  - Ivory (#F5F5DC) 
  - Forest Green (#228B22)
  - Off White (#FAF9F6)
- Accessible color contrasts meeting WCAG standards
- Dark theme support

### 🧩 Components
- **Header**: Fixed navigation with logo, wood texture treatment, search modal, cart icon with badge
- **Footer**: Quick links, social media, newsletter signup with form validation
- **AnimationsProvider**: GSAP integration, floating particles, scroll-triggered animations
- **Search**: Full-screen modal with keyboard shortcut (⌘/Ctrl + K) support

### ✨ Animations
- Header parallax effects with scroll-triggered wood texture fading
- Floating particle effects using CSS keyframes and tsparticles
- Smooth scroll animations respecting `prefers-reduced-motion`
- 60fps animations with GPU acceleration hints

### 📧 Newsletter Integration
- API endpoint at `/api/newsletter` for email subscription
- Form validation and error handling
- Integration-ready for Contentful or email services
- Success/error feedback in UI

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

### Analytics
```bash
# Google Analytics Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Newsletter (Optional - Coming Soon)
```bash
# Contentful integration (future)
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token

# Email service integration (future)
MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_LIST_ID=your_list_id

# Alternative email service
CONVERTKIT_API_KEY=your_convertkit_key
CONVERTKIT_FORM_ID=your_form_id
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Google Analytics ID

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## API Endpoints

### Newsletter Signup
- **POST** `/api/newsletter`
- **Body**: `{ "email": "user@example.com" }`
- **Response**: `{ "success": true, "message": "Successfully subscribed!" }`

## Development

### Project Structure
```
src/
├── app/
│   ├── api/newsletter/        # Newsletter API endpoint
│   ├── layout.tsx            # Root layout with providers
│   ├── globals.css           # Global styles with Furnions palette
│   └── page.tsx              # Home page
├── components/
│   ├── site/
│   │   ├── Header.tsx        # Fixed navigation with search
│   │   └── Footer.tsx        # Footer with newsletter
│   ├── providers/
│   │   └── AnimationsProvider.tsx # Animation management
│   └── ui/                   # Shared UI components
└── lib/                      # Utilities and configurations
```

### Styling
- **Tailwind CSS v4** with custom Furnions color palette
- **CSS Custom Properties** for brand colors
- **Responsive design** with mobile-first approach
- **Dark theme** support via CSS variables

### Animation System
- **Framer Motion** for React components
- **AOS** for scroll-triggered animations
- **CSS keyframes** for particle effects
- **Respect for `prefers-reduced-motion`** accessibility setting

### Accessibility Features
- Keyboard navigation support
- ARIA labels and semantic HTML
- Screen reader compatibility
- High contrast color ratios
- Focus management in modals
- Reduced motion preference handling

## Performance Optimizations

- **Font optimization** with `next/font/google`
- **Image optimization** with Next.js Image component
- **60fps animations** with GPU acceleration
- **Lazy loading** of animation libraries
- **Tree shaking** and code splitting
- **Bundle optimization** for production builds

## Testing

Run the test suite:
```bash
npm run test
```

Run linting:
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## Browser Support

- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Mobile browsers** (iOS Safari 14+, Chrome Mobile 90+)
- **Progressive enhancement** for older browsers

## Contributing

1. Create a feature branch
2. Make your changes following the existing code style
3. Test thoroughly on different devices
4. Submit a pull request with detailed description

## License

Private project. All rights reserved.

---

Built with ❤️ for Furnions brand experience.