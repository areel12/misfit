import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
}

export type PaymentMethod = 'bank_transfer' | 'easypaisa' | 'jazzcash'

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  totalPKR: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  paymentMethod?: PaymentMethod
  paymentProof?: string
  customer: {
    name: string
    email: string
    phone: string
    city: string
    address: string
    notes?: string
  }
  createdAt: string
  updatedAt: string
}

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrders: () => Order[]
  getOrderById: (id: string) => Order | undefined
  updateOrderStatus: (id: string, status: Order['status']) => void
  updatePaymentStatus: (id: string, status: Order['paymentStatus'], proof?: string) => void
  cancelOrder: (id: string) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }))
      },

      getOrders: () => {
        return get().orders
      },

      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id)
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
        }))
      },

      updatePaymentStatus: (id, status, proof) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  paymentStatus: status,
                  paymentProof: proof,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }))
      },

      cancelOrder: (id) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status: 'cancelled',
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }))
      },
    }),
    {
      name: 'misfit-orders',
    }
  )
)
