import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Cart } from '@/components/Cart'
import { Footer } from '@/components/Footer'
import { HomePage } from '@/pages/HomePage'
import { ShopPage } from '@/pages/ShopPage'
import { ProductPage } from '@/pages/ProductPage'
import { DropsPage } from '@/pages/DropsPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { AccountPage } from '@/pages/AccountPage'
import { OrderPage } from '@/pages/OrderPage'
import { AdminPage } from '@/pages/AdminPage'
import { useEffect } from 'react'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  return (
    <>
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <Cart />}
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/drops" element={<DropsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </PageTransition>
      {!isAdminPage && <Footer />}
      
      {/* Noise overlay for premium feel */}
      <div className="noise-overlay" />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}
