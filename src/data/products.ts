import { Product } from '@/store/cart'

export const products: Product[] = [
  {
    id: '1',
    name: 'Urban Echo Peach Tee',
    price: 85,
    pricePKR: 1399,
    description: 'A premium oversized streetwear tee featuring monochrome urban photography panels with subtle lavender typography. Designed for comfort, style, and everyday wear.',
    material: '100% Premium Cotton, 280gsm heavyweight',
    sizes: ['M', 'L', 'XL'],
    images: ['/products/peach-tee.jpg'],
    category: 'tees',
    color: 'Peach',
    inventory: 50,
    rating: 4.9,
    reviewCount: 12,
    shipping: 'Free shipping on orders over Rs. 3000. Standard delivery: 3-5 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '2',
    name: 'Fractured Vision Tee',
    price: 95,
    pricePKR: 1699,
    description: 'A modern oversized T-shirt inspired by classical sculpture artwork. Combining timeless aesthetics with contemporary streetwear culture.',
    material: '100% Premium Cotton, 280gsm heavyweight',
    sizes: ['M', 'L', 'XL'],
    images: ['/products/white-tee.jpg'],
    category: 'tees',
    color: 'White',
    inventory: 50,
    rating: 5.0,
    reviewCount: 18,
    shipping: 'Free shipping on orders over Rs. 3000. Standard delivery: 3-5 business days.',
    returns: '30-day return policy. Items must be unworn with tags attached.'
  },
  {
    id: '3',
    name: 'David Fragments Oversized Tee',
    price: 89,
    pricePKR: 1450,
    description: 'A bold statement oversized tee featuring fragmented David artwork. Perfect for streetwear enthusiasts who appreciate artistic fashion and premium comfort.',
    material: '100% Premium Cotton, 280gsm heavyweight',
    sizes: ['M', 'L', 'XL'],
    images: ['/products/black-tee.jpg'],
    category: 'tees',
    color: 'Black',
    inventory: 50,
    rating: 4.8,
    reviewCount: 22,
    shipping: 'Free shipping on orders over Rs. 3000. Standard delivery: 3-5 business days.',
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
  const searchTerms = ['peach', 'white', 'black', 'urban', 'echo', 'vision', 'david', 'fragments', 'fractured', 'misfit', 'oversized', 'tee']
  
  if (searchTerms.some(term => lowerQuery.includes(term))) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.color.toLowerCase().includes(lowerQuery)
    )
  }
  
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

export const collections = {
  misfit_essentials: {
    name: 'Misfit Essentials',
    description: 'Our curated collection of premium streetwear tees',
    products: products.map(p => p.id)
  }
}
