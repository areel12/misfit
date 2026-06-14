import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  category: string
  minPrice: number
  maxPrice: number
  colors: string[]
  sizes: string[]
  minRating: number
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
}

export function FilterPanel({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 500,
    colors: [],
    sizes: [],
    minRating: 0,
    sortBy: 'newest',
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    onFilterChange(filters)
  }, [filters])

  const toggleColor = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }))
  }

  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const colors = ['Obsidian Black', 'Shadow Grey', 'Digital Black', 'Stealth Black', 'Charcoal', 'Washed Black', 'Deep Blue', 'Neon Purple', 'Midnight Black']
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'ONE SIZE']

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold w-full transition"
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:block bg-gray-900/50 border border-purple-500/20 p-6"
          >
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Product name..."
                className="w-full bg-black border border-gray-700 px-3 py-2 text-white focus:border-purple-500 outline-none"
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full bg-black border border-gray-700 px-3 py-2 text-white focus:border-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="hoodies">Hoodies</option>
                <option value="tees">Tees</option>
                <option value="outerwear">Outerwear</option>
                <option value="bottoms">Bottoms</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Price Range: ${filters.minPrice} - ${filters.maxPrice}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                }
                className="w-full bg-black border border-gray-700 px-3 py-2 text-white focus:border-purple-500 outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Min Rating</label>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters((prev) => ({ ...prev, minRating: rating }))}
                    className={`flex-1 py-2 text-sm transition ${
                      filters.minRating === rating
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Colors</label>
              <div className="space-y-2">
                {colors.slice(0, 5).map((color) => (
                  <label key={color} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => toggleColor(color)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3">Sizes</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 text-sm transition ${
                      filters.sizes.includes(size)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() =>
                setFilters({
                  search: '',
                  category: 'all',
                  minPrice: 0,
                  maxPrice: 500,
                  colors: [],
                  sizes: [],
                  minRating: 0,
                  sortBy: 'newest',
                })
              }
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white transition text-sm"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
