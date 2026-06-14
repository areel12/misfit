import { useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, SlidersHorizontal, X } from 'lucide-react'
import { products, Product } from '@/data/products'
import { cn } from '@/lib/utils'

const categories = [
  { value: 'all', label: 'ALL' },
  { value: 'hoodies', label: 'HOODIES' },
  { value: 'tees', label: 'TEES' },
  { value: 'outerwear', label: 'OUTERWEAR' },
  { value: 'bottoms', label: 'BOTTOMS' },
  { value: 'accessories', label: 'ACCESSORIES' },
]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <div
          className={cn(
            'relative aspect-[3/4] overflow-hidden bg-muted rounded-lg',
            'transition-all duration-500',
            isHovered && 'shadow-[0_0_40px_rgba(99,102,241,0.15)]'
          )}
        >
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-[10px] tracking-[0.15em] font-medium rounded-full">
              {product.category.toUpperCase()}
            </span>
          </div>

          {/* Product visual placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotateY: isHovered ? 15 : 0,
                rotateX: isHovered ? -5 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-24 h-24 rounded-xl"
              style={{
                background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)`,
                boxShadow: isHovered
                  ? '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(99, 102, 241, 0.2)'
                  : '0 10px 30px rgba(0,0,0,0.2)',
              }}
            />
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Quick view button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <span className="flex items-center justify-center gap-2 py-3 bg-foreground text-background text-xs font-bold tracking-[0.15em] rounded-lg">
              QUICK VIEW
              <ArrowRight className="h-3 w-3" />
            </span>
          </motion.div>

          {/* Glow border on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg ring-2 ring-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-bold tracking-[0.1em] text-sm group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.color}</p>
          <p className="font-bold">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const currentCategory = searchParams.get('category') || 'all'

  const filteredProducts =
    currentCategory === 'all'
      ? products
      : products.filter((p) => p.category === currentCategory)

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category })
    }
    setIsFilterOpen(false)
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.15em] mb-4">
            SHOP
          </h1>
          <p className="text-muted-foreground tracking-wider">
            {filteredProducts.length} PRODUCTS
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          {/* Desktop filters */}
          <div className="hidden md:flex items-center gap-6 pb-6 border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={cn(
                  'text-xs tracking-[0.15em] transition-all duration-300',
                  currentCategory === cat.value
                    ? 'text-foreground font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {cat.label}
                {currentCategory === cat.value && (
                  <motion.div
                    layoutId="activeCategory"
                    className="mt-2 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile filter button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm tracking-wider"
            >
              <SlidersHorizontal className="h-4 w-4" />
              FILTER
            </button>
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground tracking-wider">
              NO PRODUCTS FOUND
            </p>
          </motion.div>
        )}
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl p-6 z-50"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold tracking-[0.15em]">FILTER</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2"
                  aria-label="Close filter"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={cn(
                      'py-3 px-4 border rounded-lg text-xs tracking-[0.15em] transition-all',
                      currentCategory === cat.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
