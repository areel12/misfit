import { Product } from '@/store/cart'

export const products: Product[] = [
  {
    id: '1',
    name: 'VOID HOODIE',
    price: 189,
    pricePKR: 52920,
    description: 'Premium oversized hoodie with reflective MISFIT branding. Features a heavyweight 400gsm cotton blend, ribbed cuffs, and a relaxed silhouette perfect for layering.',
    material: '100% Premium Cotton, 400gsm heavyweight',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/hoodie-1.jpg'],
    category: 'hoodies',
    color: 'Obsidian Black',
    inventory: 25,
    rating: 4.8,
    reviewCount: 12,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '2',
    name: 'PHANTOM TEE',
    price: 89,
    pricePKR: 24920,
    description: 'Minimalist oversized tee with subtle embossed logo. Made from soft-touch organic cotton with a boxy fit and dropped shoulders.',
    material: '100% Organic Cotton, 280gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/tee-1.jpg'],
    category: 'tees',
    color: 'Shadow Grey',
    inventory: 40,
    rating: 4.6,
    reviewCount: 18,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '3',
    name: 'REBEL CAP',
    price: 59,
    pricePKR: 16520,
    description: 'Structured six-panel cap with embroidered MISFIT logo. Features an adjustable strap and curved brim.',
    material: 'Cotton Twill',
    sizes: ['ONE SIZE'],
    images: ['/products/cap-1.jpg'],
    category: 'accessories',
    color: 'Midnight Black',
    inventory: 50,
    rating: 4.5,
    reviewCount: 8,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '4',
    name: 'GLITCH HOODIE',
    price: 219,
    pricePKR: 61320,
    description: 'Limited edition hoodie with digital glitch print artwork. Double-layered hood, kangaroo pocket, and premium heavyweight fleece.',
    material: '80% Cotton, 20% Polyester, 450gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/hoodie-2.jpg'],
    category: 'hoodies',
    color: 'Digital Black',
    inventory: 15,
    rating: 4.9,
    reviewCount: 22,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '5',
    name: 'STATIC TEE',
    price: 79,
    pricePKR: 22120,
    description: 'Essential crew neck tee with tonal back print. Garment-dyed for a lived-in feel with reinforced seams.',
    material: '100% Cotton, 220gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/tee-2.jpg'],
    category: 'tees',
    color: 'Washed Black',
    inventory: 35,
    rating: 4.7,
    reviewCount: 15,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '6',
    name: 'DRIFT JACKET',
    price: 289,
    pricePKR: 80920,
    description: 'Technical overshirt jacket with water-resistant coating. Multiple utility pockets, snap buttons, and adjustable cuffs.',
    material: 'Nylon/Cotton Blend, Water-resistant',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/jacket-1.jpg'],
    category: 'outerwear',
    color: 'Stealth Black',
    inventory: 10,
    rating: 4.8,
    reviewCount: 9,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '7',
    name: 'ECHO PANTS',
    price: 149,
    pricePKR: 41720,
    description: 'Relaxed cargo pants with multiple utility pockets. Elastic waistband, adjustable drawstrings, and tapered leg.',
    material: 'Cotton Ripstop',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/pants-1.jpg'],
    category: 'bottoms',
    color: 'Charcoal',
    inventory: 20,
    rating: 4.6,
    reviewCount: 11,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '8',
    name: 'SURGE BEANIE',
    price: 45,
    pricePKR: 12600,
    description: 'Ribbed knit beanie with embroidered logo patch. Soft acrylic blend with a classic fold-over cuff.',
    material: 'Acrylic Knit',
    sizes: ['ONE SIZE'],
    images: ['/products/beanie-1.jpg'],
    category: 'accessories',
    color: 'Black',
    inventory: 60,
    rating: 4.5,
    reviewCount: 6,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '9',
    name: 'URBAN ECHO TEE',
    price: 85,
    pricePKR: 23800,
    description: 'Contemporary tee with layered digital print. Lightweight 200gsm cotton with a comfortable oversized fit.',
    material: '100% Cotton, 200gsm',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/products/tee-3.jpg'],
    category: 'tees',
    color: 'Deep Blue',
    inventory: 38,
    rating: 4.7,
    reviewCount: 14,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '10',
    name: 'FRACTURED VISION TEE',
    price: 95,
    pricePKR: 26600,
    description: 'Statement tee with abstract geometric print. Premium 280gsm cotton with reinforced collar and cuffs.',
    material: '100% Cotton, 280gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/tee-4.jpg'],
    category: 'tees',
    color: 'Neon Purple',
    inventory: 22,
    rating: 4.9,
    reviewCount: 19,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '11',
    name: 'DAVID FRAGMENTS TEE',
    price: 99,
    pricePKR: 27720,
    description: 'Limited edition collab tee with deconstructed artwork. Premium 300gsm heavyweight cotton with special woven label.',
    material: '100% Cotton, 300gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['/products/tee-5.jpg'],
    category: 'tees',
    color: 'Midnight Black',
    inventory: 12,
    rating: 5.0,
    reviewCount: 25,
    shipping: 'Free shipping on orders over $50. Standard delivery: 5-7 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products
  return products.filter((product) => product.category === category)
}

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase()
  return products.filter((product) =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.color.toLowerCase().includes(lowerQuery)
  )
}

export const filterProducts = (
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  colors?: string[],
  sizes?: string[],
  minRating?: number
): Product[] => {
  let filtered = [...products]

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice)
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice)
  }

  if (colors && colors.length > 0) {
    filtered = filtered.filter((p) => colors.includes(p.color))
  }

  if (sizes && sizes.length > 0) {
    filtered = filtered.filter((p) => p.sizes.some((s) => sizes.includes(s)))
  }

  if (minRating !== undefined) {
    filtered = filtered.filter((p) => (p.rating || 0) >= minRating)
  }

  return filtered
}
