import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '@/store/admin'
import { useOrderStore, Order } from '@/store/orders'
import { products } from '@/data/products'

export function AdminPage() {
  const navigate = useNavigate()
  const { isAdmin, verifyAdmin } = useAdminStore()
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState<'orders' | 'inventory' | 'analytics'>('orders')
  const [error, setError] = useState('')
  const { getOrders, updateOrderStatus, updatePaymentStatus } = useOrderStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (verifyAdmin(password)) {
      setPassword('')
      setError('')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 border border-purple-500/20 p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:border-purple-500 outline-none"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 transition"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 text-gray-400 hover:text-white transition"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  const orders = getOrders()
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const paidOrders = orders.filter((o) => o.paymentStatus === 'paid').length
  const pendingPayments = orders.filter((o) => o.paymentStatus === 'pending').length

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-purple-500/20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">MISFIT Admin Dashboard</h1>
          <button
            onClick={() => {
              useAdminStore.setState({ isAdmin: false })
              navigate('/')
            }}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KPICard label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} trend="+12%" />
          <KPICard label="Total Orders" value={totalOrders} trend={`+${paidOrders} paid`} />
          <KPICard label="Pending Payments" value={pendingPayments} trend="Action needed" />
          <KPICard
            label="Products"
            value={products.length}
            trend={`${products.reduce((sum, p) => sum + p.inventory, 0)} in stock`}
          />
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-700">
          {['orders', 'inventory', 'analytics'].map((tabName) => (
            <button
              key={tabName}
              onClick={() => setTab(tabName as any)}
              className={`px-4 py-2 font-semibold transition ${
                tab === tabName
                  ? 'text-purple-400 border-b-2 border-purple-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === 'orders' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-gray-900/50 border border-purple-500/20 p-8 text-center">
                <p className="text-gray-400">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Inventory Tab */}
        {tab === 'inventory' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Product Inventory</h2>
            <div className="bg-gray-900/50 border border-purple-500/20 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4">Product Name</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4 font-semibold">{product.name}</td>
                      <td className="p-4 capitalize">{product.category}</td>
                      <td className="p-4">${product.price}</td>
                      <td className="p-4">{product.inventory}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            product.inventory > 20
                              ? 'bg-green-500/20 text-green-400'
                              : product.inventory > 5
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {product.inventory > 20 ? 'In Stock' : product.inventory > 5 ? 'Low Stock' : 'Critical'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {tab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <h3 className="text-xl font-bold mb-4">Revenue Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Revenue</span>
                  <span className="font-semibold">${totalRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paid Orders</span>
                  <span className="font-semibold">{paidOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pending Payments</span>
                  <span className="font-semibold text-yellow-400">{pendingPayments}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-700">
                  <span className="text-gray-400">Avg Order Value</span>
                  <span className="font-semibold">
                    ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <h3 className="text-xl font-bold mb-4">Order Status Distribution</h3>
              <div className="space-y-3">
                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => {
                  const count = orders.filter((o) => o.status === status).length
                  const percentage =
                    totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0
                  return (
                    <div key={status}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm capitalize">{status}</span>
                        <span className="text-sm font-semibold">{count}</span>
                      </div>
                      <div className="w-full bg-gray-800 h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className="bg-purple-600 h-2"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function KPICard({ label, value, trend }: { label: string; value: any; trend: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 border border-purple-500/20 p-6"
    >
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-green-400 text-sm">{trend}</p>
    </motion.div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const { updateOrderStatus, updatePaymentStatus } = useOrderStore()

  const handleOrderStatusChange = (status: Order['status']) => {
    setOrderStatus(status)
    updateOrderStatus(order.id, status)
  }

  const handlePaymentStatusChange = (status: Order['paymentStatus']) => {
    setPaymentStatus(status)
    updatePaymentStatus(order.id, status)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900/50 border border-purple-500/20 p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        <div>
          <p className="text-gray-400 text-sm">Order ID</p>
          <p className="font-semibold">{order.id}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Customer</p>
          <p className="font-semibold">{order.customer.name}</p>
          <p className="text-gray-400 text-xs">{order.customer.phone}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-lg font-bold text-purple-400">${order.total.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-2">Order Status</p>
          <select
            value={orderStatus}
            onChange={(e) => handleOrderStatusChange(e.target.value as Order['status'])}
            className="bg-black border border-gray-700 px-3 py-1 text-white text-sm focus:border-purple-500 outline-none"
          >
            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-2">Payment Status</p>
          <select
            value={paymentStatus}
            onChange={(e) => handlePaymentStatusChange(e.target.value as Order['paymentStatus'])}
            className="bg-black border border-gray-700 px-3 py-1 text-white text-sm focus:border-purple-500 outline-none"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
