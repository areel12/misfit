import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Twitter } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/shop' },
      { name: 'Hoodies', path: '/shop?category=hoodies' },
      { name: 'Tees', path: '/shop?category=tees' },
      { name: 'Accessories', path: '/shop?category=accessories' },
    ],
    info: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
    ],
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold tracking-[0.3em]">MISFIT</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Streetwear for the bold. Designed for those who dare to stand out.
            </p>
            <div className="mt-6 flex gap-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 border border-border rounded-full transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 border border-border rounded-full transition-colors hover:border-primary hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-4">
              SHOP
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-4">
              INFO
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-4">
              NEWSLETTER
            </h3>
            <p className="text-sm text-foreground/80 mb-4">
              Get early access to drops and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-muted border border-border rounded-none px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-foreground text-background text-xs font-bold tracking-[0.2em] transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {isSubscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MISFIT. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
