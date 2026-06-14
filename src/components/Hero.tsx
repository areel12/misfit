import { Suspense, lazy, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <span className="text-xs tracking-[0.3em] text-muted-foreground">
          LOADING EXPERIENCE
        </span>
      </div>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)
  const [isSplineError, setIsSplineError] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 30
      const y = (clientY / innerHeight - 0.5) * 30
      mouseX.set(x)
      mouseY.set(y)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SplineLoader />}>
          {!isSplineError ? (
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              onLoad={() => setIsSplineLoaded(true)}
              onError={() => setIsSplineError(true)}
              className="w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
              {/* Animated gradient fallback */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Floating orbs */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 200 + i * 100,
                    height: 200 + i * 100,
                    left: `${20 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(139, 92, 246, 0.1)'} 0%, transparent 70%)`,
                  }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </Suspense>
      </div>

      {/* Depth blur overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
          }}
          className="max-w-4xl"
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-xs tracking-[0.4em] text-muted-foreground"
          >
            NEW COLLECTION 2026
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-6"
          >
            <span className="block text-6xl sm:text-8xl lg:text-[10rem] font-bold tracking-[0.2em] leading-none glow-text">
              MISFIT
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 text-lg sm:text-xl tracking-[0.2em] text-muted-foreground"
          >
            STREETWEAR FOR THE BOLD
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'group relative inline-flex items-center gap-3 px-10 py-4',
                  'bg-foreground text-background font-bold tracking-[0.2em] text-sm',
                  'overflow-hidden transition-all duration-500',
                  'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                )}
              >
                <span className="relative z-10">ENTER DROP</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block z-20"
      >
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground -rotate-90 whitespace-nowrap">
          EST. 2024 — MADE FOR REBELS
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block z-20"
      >
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground rotate-90 whitespace-nowrap">
          PREMIUM STREETWEAR
        </p>
      </motion.div>
    </motion.section>
  )
}
