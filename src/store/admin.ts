import { create } from 'zustand'

interface AdminStore {
  isAdmin: boolean
  adminPassword: string
  setAdmin: (isAdmin: boolean) => void
  verifyAdmin: (password: string) => boolean
}

// Simple admin auth - in production use proper auth system
const ADMIN_PASSWORD = 'admin123'

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAdmin: false,
  adminPassword: ADMIN_PASSWORD,

  setAdmin: (isAdmin) => set({ isAdmin }),

  verifyAdmin: (password) => {
    const isValid = password === get().adminPassword
    if (isValid) {
      set({ isAdmin: true })
    }
    return isValid
  },
}))
