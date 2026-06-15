import React from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useOrderStore } from '@/store/orders'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getOrderById } = useOrderStore()

  const order = id ? getOrderById(id) : null

  if (!order) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Order not found</h1>
          <button
            onClick={() => navigate('/account')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          >
            Back to Account
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    shipped: 'bg-cyan-500/20 text-cyan-400',
    delivered: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  }

  const paymentColors = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    paid: 'bg-green-500/20 text-green-400',
    failed: 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/account')}
              className="text-gray-400 hover:text-white mb-4"
            >
              ← Back to Account
            </button>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Order {order.id}</h1>
                <p className="text-gray-400">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-2">Total Amount</p>
                <p className="text-3xl font-bold text-purple-400">${order.total.toFixed(2)}</p>
                <p className="text-gray-400">Rs {order.totalPKR.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Order Status</p>
              <div className={`inline-block px-4 py-2 rounded font-semibold capitalize ${statusColors[order.status]}`}>
                {order.status}
              </div>
            </div>
            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Payment Status</p>
              <div className={`inline-block px-4 py-2 rounded font-semibold capitalize ${paymentColors[order.paymentStatus]}`}>
                {order.paymentStatus}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-900/50 border border-purple-500/20 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-4 border-b border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
              <div className="space-y-2 text-gray-300">
                <p className="font-semibold">{order.customer.name}</p>
                <p>{order.customer.address}</p>
                <p>{order.customer.city}</p>
                <p>{order.customer.phone}</p>
                <p>{order.customer.email}</p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Payment Method</p>
                  <p className="font-semibold capitalize">
                    {order.paymentMethod?.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Order Notes</p>
                  <p className="text-gray-300">
                    {order.customer.notes || 'No special instructions'}
                  </p>
                </div>
                {order.paymentStatus === 'pending' && (
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                    <p className="text-yellow-300 text-sm">
                      Awaiting payment. Please check your email for payment instructions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
