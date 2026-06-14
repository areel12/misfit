import { motion, useInView } from 'framer-motion'
import { useRef, useState, Suspense, lazy } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

const featuredItems = [
  {
    id: '1',
    name: 'VOID HOODIE',
    price: 189,
    description: 'Premium heavyweight cotton',
  },
  {
    id: '4',
    name: 'GLITCH HOODIE',
    price: 219,
    description: 'Limited edition print',
  },
  {
    id: '6',
    name: 'DRIFT JACKET',
    price: 289,
    description: 'Technical overshirt',
  },
]

function ProductCard({ item, index }: { item: typeof featuredItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/product/${item.id}`}>
        {/* Product Visual */}
        <div
          className={cn(
            'relative aspect-[3/4] overflow-hidden bg-muted rounded-lg',
            'transition-all duration-500',
            isHovered && 'shadow-[0_0_40px_rgba(99,102,241,0.2)]'
          )}
        >
          {/* 3D Scene placeholder with gradient */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotateY: isHovered ? 180 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-32 h-32 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)`,
              }}
            />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

          {/* Hover border effect */}
          <motion.div
            className="absolute inset-0 border-2 border-primary rounded-lg"
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
            <span className="flex items-center justify-center gap-2 py-3 bg-foreground text-background text-xs font-bold tracking-[0.15em]">
              VIEW PRODUCT
              <ArrowRight className="h-3 w-3" />
            </span>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3 className="font-bold tracking-[0.15em] text-sm group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-muted-foreground">{item.description}</p>
          <p className="font-bold">${item.price}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedProducts() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
            LATEST DROP
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.15em]">
            FEATURED
          </h2>
        </motion.div>

        {/* 3D Scene (optional background) */}
        <div className="relative mb-16 aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            }
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              className="w-full h-full scale-150"
            />
          </Suspense>
          
          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.3em] text-foreground/10"
            >
              2026
            </motion.h3>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group inline-flex items-center gap-3 px-8 py-4',
                'border border-border text-sm font-bold tracking-[0.2em]',
                'transition-all duration-300 hover:border-primary hover:text-primary'
              )}
            >
              VIEW ALL PRODUCTS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
