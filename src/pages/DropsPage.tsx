import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, Bell, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DropsPage() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  const upcomingDrops = [
    {
      name: 'VOID COLLECTION',
      date: 'JUNE 15, 2026',
      description: 'Our darkest collection yet. Premium heavyweight pieces.',
    },
    {
      name: 'SUMMER ESSENTIALS',
      date: 'JULY 1, 2026',
      description: 'Lightweight breathable streetwear for the summer heat.',
    },
    {
      name: 'COLLAB DROP',
      date: 'AUGUST 2026',
      description: 'Mystery collaboration. Stay tuned for announcements.',
    },
  ]

  return (
    <main ref={sectionRef} className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] text-primary mb-4"
          >
            UPCOMING RELEASES
          </motion.p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-[0.15em] mb-6">
            DROPS
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be the first to know about exclusive releases and limited editions.
          </p>
        </motion.div>

        {/* Notification signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="max-w-xl mx-auto p-8 border border-border rounded-2xl bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold tracking-wider">GET NOTIFIED</h3>
                <p className="text-xs text-muted-foreground">
                  Early access to all drops
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-muted border border-border rounded-lg pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-6 py-3 bg-primary text-primary-foreground text-sm font-bold tracking-wider rounded-lg',
                  'transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                )}
              >
                {isSubscribed ? 'DONE!' : 'NOTIFY'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Upcoming drops */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xs tracking-[0.3em] text-muted-foreground mb-8 text-center">
            UPCOMING
          </h2>

          <div className="space-y-6">
            {upcomingDrops.map((drop, index) => (
              <motion.div
                key={drop.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group p-6 border border-border rounded-xl bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-[0.15em] group-hover:text-primary transition-colors">
                      {drop.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {drop.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-[0.2em] text-primary px-4 py-2 bg-primary/10 rounded-full">
                      {drop.date}
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Big visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative aspect-[21/9] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-accent/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h2
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-[0.3em] text-foreground/10"
            >
              2026
            </motion.h2>
          </div>
          <div className="absolute bottom-8 left-8">
            <p className="text-xs tracking-[0.3em] text-muted-foreground">
              THE YEAR OF MISFIT
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
