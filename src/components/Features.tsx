import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Package, Truck, RefreshCcw, Shield } from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'PREMIUM QUALITY',
    description: 'Heavyweight fabrics, premium stitching',
  },
  {
    icon: Truck,
    title: 'FREE SHIPPING',
    description: 'On all orders over $150',
  },
  {
    icon: RefreshCcw,
    title: 'EASY RETURNS',
    description: '30-day hassle-free returns',
  },
  {
    icon: Shield,
    title: 'SECURE CHECKOUT',
    description: 'Encrypted payment processing',
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 px-6 lg:px-8 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-3 rounded-full bg-muted mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xs font-bold tracking-[0.15em] mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
