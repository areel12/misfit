import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  phone: string
  name: string
  city: string
  address: string
  createdAt: string
}

interface UserStore {
  user: User | null
  wishlist: string[]
  recentlyViewed: string[]
  setUser: (user: User | null) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  addRecentlyViewed: (productId: string) => void
  getRecentlyViewed: () => string[]
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      wishlist: [],
      recentlyViewed: [],

      setUser: (user) => set({ user }),

      addToWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist
            : [...state.wishlist, productId],
        }))
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        }))
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId)
      },

      addRecentlyViewed: (productId) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== productId)
          return {
            recentlyViewed: [productId, ...filtered].slice(0, 10),
          }
        })
      },

      getRecentlyViewed: () => {
        return get().recentlyViewed
      },

      logout: () => {
        set({ user: null, wishlist: [], recentlyViewed: [] })
      },
    }),
    {
      name: 'misfit-user',
    }
  )
)
