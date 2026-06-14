import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

export function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
  } = useCartStore()

  const totalPrice = getTotalPrice()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <h2 className="text-lg font-bold tracking-[0.2em]">YOUR BAG</h2>
                <button
                  onClick={closeCart}
                  className="p-2 transition-colors hover:text-primary"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground tracking-wider">
                      YOUR BAG IS EMPTY
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 pb-6 border-b border-border"
                      >
                        {/* Product Image Placeholder */}
                        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-muted-foreground tracking-wider">
                            {item.product.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold tracking-wider text-sm">
                                {item.product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                Size: {item.size}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.size)
                              }
                              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 border border-border rounded-full px-3 py-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 hover:text-primary transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 hover:text-primary transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="font-bold">
                              ${(item.product.price * item.quantity).toFixed(0)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground tracking-wider text-sm">
                      SUBTOTAL
                    </span>
                    <span className="text-xl font-bold">
                      ${totalPrice.toFixed(0)}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'w-full py-4 bg-foreground text-background font-bold tracking-[0.2em] text-sm',
                      'transition-all duration-300 hover:bg-primary hover:text-primary-foreground',
                      'relative overflow-hidden group'
                    )}
                  >
                    <span className="relative z-10">CHECKOUT</span>
                    <motion.div
                      className="absolute inset-0 bg-primary"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <p className="text-center text-xs text-muted-foreground">
                    Shipping calculated at checkout
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
