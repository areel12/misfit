import { useState, useRef, useEffect, Suspense, lazy } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ShoppingBag, Minus, Plus, RotateCcw } from 'lucide-react'
import { getProductById, products } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = getProductById(id || '')
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { addItem, openCart } = useCartStore()

  // Mouse drag rotation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 150 }
  const rotateX = useSpring(mouseY, springConfig)
  const rotateY = useSpring(mouseX, springConfig)

  useEffect(() => {
    if (!product) {
      navigate('/shop')
    }
  }, [product, navigate])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = ((e.clientX - centerX) / (rect.width / 2)) * 30
    const y = ((e.clientY - centerY) / (rect.height / 2)) * -20
    
    mouseX.set(x)
    mouseY.set(y)
    setRotation({ x: y, y: x })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetRotation = () => {
    mouseX.set(0)
    mouseY.set(0)
    setRotation({ x: 0, y: 0 })
  }

  const handleAddToCart = () => {
    if (!product || !selectedSize) return
    
    setIsAddingToCart(true)
    
    setTimeout(() => {
      addItem(product, selectedSize)
      setIsAddingToCart(false)
      setShowAddedMessage(true)
      
      setTimeout(() => {
        setShowAddedMessage(false)
      }, 2000)
    }, 600)
  }

  if (!product) {
    return null
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="tracking-wider">BACK TO SHOP</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 3D Product Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={cn(
                'relative aspect-square rounded-2xl bg-muted overflow-hidden cursor-grab',
                isDragging && 'cursor-grabbing'
              )}
            >
              {/* 3D Model placeholder with interactive rotation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
              >
                {/* Spline scene (fallback to styled div) */}
                <Suspense
                  fallback={
                    <motion.div
                      className="w-48 h-48 rounded-3xl"
                      style={{
                        background: `linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)`,
                        boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99, 102, 241, 0.15)',
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      }}
                      animate={{
                        rotateY: isDragging ? 0 : [0, 5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  }
                >
                  <div className="w-full h-full">
                    <Spline
                      scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                      className="w-full h-full"
                    />
                  </div>
                </Suspense>
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />

              {/* Interaction hint */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  DRAG TO ROTATE
                </span>
                <button
                  onClick={resetRotation}
                  className="p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
                  aria-label="Reset rotation"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-background/80 backdrop-blur-sm text-[10px] tracking-[0.15em] font-medium rounded-full">
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Title & Price */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.15em] mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-bold">${product.price}</p>
            </div>

            {/* Color */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] text-muted-foreground mb-3">
                COLOR
              </h3>
              <p className="text-sm">{product.color}</p>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] text-muted-foreground mb-3">
                SIZE
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'min-w-[48px] px-4 py-3 border rounded-lg text-sm font-medium transition-all duration-300',
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {!selectedSize && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Please select a size
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] text-muted-foreground mb-3">
                DESCRIPTION
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Material */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] text-muted-foreground mb-3">
                MATERIAL
              </h3>
              <p className="text-sm text-foreground/80">{product.material}</p>
            </div>

            {/* Add to Cart */}
            <div className="mt-auto space-y-4">
              <motion.button
                whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                whileTap={{ scale: selectedSize ? 0.98 : 1 }}
                onClick={handleAddToCart}
                disabled={!selectedSize || isAddingToCart}
                className={cn(
                  'w-full py-4 flex items-center justify-center gap-3',
                  'font-bold tracking-[0.2em] text-sm transition-all duration-300',
                  selectedSize
                    ? 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                <AnimatePresence mode="wait">
                  {isAddingToCart ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
                    />
                  ) : showAddedMessage ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      ADDED TO BAG
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      ADD TO BAG
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                onClick={openCart}
                className="w-full py-4 border border-border text-sm font-bold tracking-[0.2em] hover:border-primary hover:text-primary transition-all"
              >
                VIEW BAG
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-8">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)`,
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold tracking-[0.1em] text-sm group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm mt-1">${relatedProduct.price}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
