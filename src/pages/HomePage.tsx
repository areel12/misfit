import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { DropsSection } from '@/components/DropsSection'
import { BrandMarquee } from '@/components/BrandMarquee'
import { Features } from '@/components/Features'

export function HomePage() {
  return (
    <main>
      <Hero />
      <BrandMarquee />
      <FeaturedProducts />
      <DropsSection />
      <Features />
    </main>
  )
}
