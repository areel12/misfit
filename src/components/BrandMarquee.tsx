import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const marqueeText = 'MISFIT • STREETWEAR FOR THE BOLD • NEW DROP 2026 • LIMITED EDITION • '

export function BrandMarquee() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="py-12 overflow-hidden border-y border-border bg-card"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex"
      >
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[0.2em] text-foreground/5"
            >
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
