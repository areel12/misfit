import { useState, useRef, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, SlidersHorizontal, X, Search } from 'lucide-react'
import { products, searchProducts, filterProducts, getProductsByCategory } from '@/data/products'
import { Product } from '@/store/cart'
import { FilterPanel, FilterState } from '@/components/FilterPanel'
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
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 500,
    colors: [],
    sizes: [],
    minRating: 0,
    sortBy: 'newest',
  })

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Apply search
    if (filters.search) {
      result = searchProducts(filters.search)
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category)
    }

    // Apply price filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    )

    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color))
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      )
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= filters.minRating)
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
      default:
        result.reverse()
        break
    }

    return result
  }, [filters])

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
            {filteredProducts.length} PRODUCTS FOUND
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={setFilters} />
          </div>

          {/* Products */}
          <div className="lg:col-span-4">
            {/* Product Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(filters)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
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
        </div>
      </div>
    </main>
  )
}
