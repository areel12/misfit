import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { useOrderStore, Order, OrderItem } from '@/store/orders'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

type CheckoutStep = 'customer' | 'payment' | 'confirmation'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, getTotalPricePKR, clearCart } = useCartStore()
  const { user } = useUserStore()
  const { addOrder } = useOrderStore()
  const [step, setStep] = useState<CheckoutStep>('customer')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
    notes: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState<string>('')

  if (items.length === 0 && step === 'customer') {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.phone && formData.city && formData.address) {
      setStep('payment')
    }
  }

  const handlePaymentSelect = async (method: string) => {
    setIsLoading(true)
    
    // Create order
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      size: item.size,
      color: item.product.color,
    }))

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: orderItems,
      total: getTotalPrice(),
      totalPKR: getTotalPricePKR(),
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: method as any,
      customer: formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addOrder(order)
    setOrderId(order.id)
    clearCart()
    setStep('confirmation')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 'customer' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 border border-purple-500/20 p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
                <form onSubmit={handleCustomerSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="col-span-2 bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleFormChange}
                      required
                      className="bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
                    />
                  </div>
                  <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
                  />
                  <textarea
                    name="notes"
                    placeholder="Order notes (optional)"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows={2}
                    className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 transition"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 border border-purple-500/20 p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
                <div className="space-y-4">
                  <PaymentMethodCard
                    title="Bank Transfer"
                    description="Direct bank deposit. Instructions will be provided after order confirmation."
                    onSelect={() => handlePaymentSelect('bank_transfer')}
                    isLoading={isLoading}
                  />
                  <PaymentMethodCard
                    title="Easypaisa"
                    description="Send payment to Easypaisa account. Reference number will be provided."
                    onSelect={() => handlePaymentSelect('easypaisa')}
                    isLoading={isLoading}
                  />
                  <PaymentMethodCard
                    title="JazzCash"
                    description="Send payment to JazzCash account. Reference number will be provided."
                    onSelect={() => handlePaymentSelect('jazzcash')}
                    isLoading={isLoading}
                  />
                </div>
                <button
                  onClick={() => setStep('customer')}
                  className="mt-6 text-gray-400 hover:text-white transition"
                >
                  Back to Customer Info
                </button>
              </motion.div>
            )}

            {step === 'confirmation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 border border-purple-500/20 p-8 text-center"
              >
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-gray-400 mb-6">Order ID: {orderId}</p>
                <p className="text-gray-400 mb-8">
                  Check your email for payment instructions and order details.
                </p>
                <button
                  onClick={() => navigate(`/order/${orderId}`)}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
                >
                  View Order
                </button>
              </motion.div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-purple-500/20 p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-gray-400">Size: {item.size} x {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">PKR Price</span>
                  <span>Rs {getTotalPricePKR().toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-purple-400">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

interface PaymentMethodCardProps {
  title: string
  description: string
  onSelect: () => void
  isLoading: boolean
}

function PaymentMethodCard({ title, description, onSelect, isLoading }: PaymentMethodCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isLoading}
      className="w-full text-left bg-black border border-gray-700 hover:border-purple-500 p-4 transition"
    >
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  )
}
