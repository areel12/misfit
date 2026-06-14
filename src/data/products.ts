import { Product } from '@/store/cart'

export const products: Product[] = [
  {
    id: '1',
    name: 'VOID HOODIE',
    price: 189,
    description: 'Premium oversized hoodie with reflective MISFIT branding. Features a heavyweight 400gsm cotton blend, ribbed cuffs, and a relaxed silhouette perfect for layering.',
    material: '100% Premium Cotton, 400gsm heavyweight',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/hoodie-1.jpg'],
    category: 'hoodies',
    color: 'Obsidian Black'
  },
  {
    id: '2',
    name: 'PHANTOM TEE',
    price: 89,
    description: 'Minimalist oversized tee with subtle embossed logo. Made from soft-touch organic cotton with a boxy fit and dropped shoulders.',
    material: '100% Organic Cotton, 280gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/tee-1.jpg'],
    category: 'tees',
    color: 'Shadow Grey'
  },
  {
    id: '3',
    name: 'REBEL CAP',
    price: 59,
    description: 'Structured six-panel cap with embroidered MISFIT logo. Features an adjustable strap and curved brim.',
    material: 'Cotton Twill',
    sizes: ['ONE SIZE'],
    images: ['/products/cap-1.jpg'],
    category: 'accessories',
    color: 'Midnight Black'
  },
  {
    id: '4',
    name: 'GLITCH HOODIE',
    price: 219,
    description: 'Limited edition hoodie with digital glitch print artwork. Double-layered hood, kangaroo pocket, and premium heavyweight fleece.',
    material: '80% Cotton, 20% Polyester, 450gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/hoodie-2.jpg'],
    category: 'hoodies',
    color: 'Digital Black'
  },
  {
    id: '5',
    name: 'STATIC TEE',
    price: 79,
    description: 'Essential crew neck tee with tonal back print. Garment-dyed for a lived-in feel with reinforced seams.',
    material: '100% Cotton, 220gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/tee-2.jpg'],
    category: 'tees',
    color: 'Washed Black'
  },
  {
    id: '6',
    name: 'DRIFT JACKET',
    price: 289,
    description: 'Technical overshirt jacket with water-resistant coating. Multiple utility pockets, snap buttons, and adjustable cuffs.',
    material: 'Nylon/Cotton Blend, Water-resistant',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/jacket-1.jpg'],
    category: 'outerwear',
    color: 'Stealth Black'
  },
  {
    id: '7',
    name: 'ECHO PANTS',
    price: 149,
    description: 'Relaxed cargo pants with multiple utility pockets. Elastic waistband, adjustable drawstrings, and tapered leg.',
    material: 'Cotton Ripstop',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/pants-1.jpg'],
    category: 'bottoms',
    color: 'Charcoal'
  },
  {
    id: '8',
    name: 'SURGE BEANIE',
    price: 45,
    description: 'Ribbed knit beanie with embroidered logo patch. Soft acrylic blend with a classic fold-over cuff.',
    material: 'Acrylic Knit',
    sizes: ['ONE SIZE'],
    images: ['/products/beanie-1.jpg'],
    category: 'accessories',
    color: 'Black'
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category)
}
