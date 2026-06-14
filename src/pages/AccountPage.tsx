import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUserStore, User } from '@/store/user'
import { useOrderStore } from '@/store/orders'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export function AccountPage() {
  const navigate = useNavigate()
  const { user, setUser, logout } = useUserStore()
  const { getOrders } = useOrderStore()
  const [tab, setTab] = useState<'profile' | 'orders' | 'wishlist'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<User | null>(user)

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Please log in to view your account</h1>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          >
            Go to Login
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSaveProfile = () => {
    if (formData) {
      setUser(formData)
      setIsEditing(false)
    }
  }

  const orders = getOrders()

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-purple-500/20 p-6">
              <div className="mb-6">
                <p className="text-gray-400 text-sm">Logged in as</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>

              <div className="space-y-2 mb-6">
                {['profile', 'orders', 'wishlist'].map((tabName) => (
                  <button
                    key={tabName}
                    onClick={() => setTab(tabName as any)}
                    className={`w-full text-left px-4 py-2 transition ${
                      tab === tabName
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {tab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900/50 border border-purple-500/20 p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Profile</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm transition"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditing && formData ? (
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Name"
                        className="bg-black border border-gray-700 px-4 py-2 text-white focus:border-purple-500 outline-none"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Email"
                        className="bg-black border border-gray-700 px-4 py-2 text-white focus:border-purple-500 outline-none"
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="Phone"
                        className="bg-black border border-gray-700 px-4 py-2 text-white focus:border-purple-500 outline-none"
                      />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="City"
                        className="bg-black border border-gray-700 px-4 py-2 text-white focus:border-purple-500 outline-none"
                      />
                    </div>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Address"
                      rows={3}
                      className="w-full bg-black border border-gray-700 px-4 py-2 text-white focus:border-purple-500 outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white transition"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData(user)
                        }}
                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <ProfileField label="Name" value={user.name} />
                    <ProfileField label="Email" value={user.email} />
                    <ProfileField label="Phone" value={user.phone} />
                    <ProfileField label="City" value={user.city} />
                    <ProfileField label="Address" value={user.address} />
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'orders' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {orders.length === 0 ? (
                  <div className="bg-gray-900/50 border border-purple-500/20 p-8 text-center">
                    <p className="text-gray-400 mb-4">No orders yet</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="bg-gray-900/50 border border-purple-500/20 p-6 hover:border-purple-500 cursor-pointer transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Order ID</p>
                          <p className="font-semibold">{order.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">Total</p>
                          <p className="text-lg font-semibold text-purple-400">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Status</p>
                            <p className="font-semibold capitalize">{order.status}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Payment</p>
                            <p className={`font-semibold capitalize ${
                              order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                              {order.paymentStatus}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {tab === 'wishlist' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900/50 border border-purple-500/20 p-8 text-center"
              >
                <p className="text-gray-400">Wishlist feature coming soon</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  )
}
