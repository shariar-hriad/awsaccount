'use client'

import { useEffect, useState } from 'react'

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([])

    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const addItem = (item: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id)
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prevItems, { ...item, quantity: 1 }]
        })
    }

    const updateItemQuantity = (id: number, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    // Load initial cart state from localStorage
    useEffect(() => {
        const savedItems = localStorage.getItem('cartItems')
        if (savedItems) {
            setItems(JSON.parse(savedItems))
        }
    }, [])

    // Save cart state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items))
    }, [items])

    return { items, count, total, addItem, updateItemQuantity, removeItem }
}
