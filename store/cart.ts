import { IProductDoc, IProductVariation } from '@/models/product-model'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface CartItem extends IProductDoc {
    quantity: number
    price: number
    variant: string
}

export interface ICartStore {
    items: CartItem[]
    addItem: (
        product: IProductDoc,
        selectedVariant: IProductVariation,
        quantity?: number
    ) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, selectedVariant: string) => void
    decreaseQuantity: (productId: string, selectedVariant: string) => void
    clearCart: () => void
    total: number
}

export const useCartStore = create<ICartStore>()(
    devtools(
        persist(
            (set) => ({
                items: [],
                total: 0,
                addItem: (
                    product: IProductDoc,
                    selectedVariant: IProductVariation,
                    quantity = 1
                ) => {
                    set((state) => {
                        const existingItem = state.items.find(
                            (item) =>
                                item._id === product._id &&
                                item.variant === selectedVariant.credit
                        )
                        if (existingItem) {
                            return {
                                items: state.items.map((item) =>
                                    item._id === product._id &&
                                    item.variant === selectedVariant.credit
                                        ? {
                                              ...item,
                                              quantity:
                                                  item.quantity + quantity,
                                          }
                                        : item
                                ) as CartItem[],
                                total: state.items.reduce(
                                    (sum, item) =>
                                        sum +
                                        (item._id === product._id &&
                                        item.variant === selectedVariant.credit
                                            ? (item.quantity + quantity) *
                                              Number(item.price)
                                            : item.quantity *
                                              Number(item.price)),
                                    0
                                ),
                            }
                        }

                        const newItem: CartItem = {
                            ...product,
                            quantity,
                            price: selectedVariant.amount,
                            variant: selectedVariant.credit,
                        } as CartItem

                        return {
                            items: [...state.items, newItem],
                            total: state.total + newItem.price * quantity,
                        }
                    })
                },
                updateQuantity: (productId, selectedVariant) => {
                    set((state) => {
                        const updatedItems = state.items.map((item) =>
                            item._id === productId &&
                            item.variant === selectedVariant
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ) as CartItem[]
                        const updatedTotal = updatedItems.reduce(
                            (sum, item) => sum + item.quantity * item.price,
                            0
                        )

                        return { items: updatedItems, total: updatedTotal }
                    })
                },
                decreaseQuantity: (productId, selectedVariant) => {
                    set((state) => {
                        const updatedItems = state.items
                            .map((item) =>
                                item._id === productId &&
                                item.variant === selectedVariant &&
                                item.quantity > 1
                                    ? {
                                          ...item,
                                          quantity: item.quantity - 1,
                                      }
                                    : item
                            )
                            .filter((item) => item.quantity > 0) as CartItem[]

                        const updatedTotal = updatedItems.reduce(
                            (sum, item) => sum + item.quantity * item.price,
                            0
                        )

                        return { items: updatedItems, total: updatedTotal }
                    })
                },
                removeItem: (productId) =>
                    set((state) => ({
                        items: state.items.filter(
                            (item) => item._id !== productId
                        ),
                        total: state.items
                            .filter((item) => item._id !== productId)
                            .reduce(
                                (sum, item) =>
                                    sum + item.quantity * Number(item.price),
                                0
                            ),
                    })),
                clearCart: () => set({ items: [], total: 0 }),
            }),
            {
                name: 'cart-storage',
            }
        )
    )
)
