'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { Minus, Plus, Trash2 } from 'lucide-react'

type Item = {
    id: number
    name: string
    price: number
    quantity: number
}

type CartItemProps = {
    item: Item
}

export function CartItem({ item }: CartItemProps) {
    const { updateItemQuantity, removeItem } = useCart()

    const handleIncrease = () => {
        updateItemQuantity(item.id, item.quantity + 1)
    }

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateItemQuantity(item.id, item.quantity - 1)
        }
    }

    const handleRemove = () => {
        removeItem(item.id)
    }

    return (
        <div className='flex items-center justify-between py-4 border-b border-gray-200'>
            <div className='flex-1'>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p className='text-gray-600'>${item.price.toFixed(2)}</p>
            </div>
            <div className='flex items-center space-x-2'>
                <Button variant='outline' size='icon' onClick={handleDecrease}>
                    <Minus className='w-4 h-4' />
                </Button>
                <span className='font-semibold'>{item.quantity}</span>
                <Button variant='outline' size='icon' onClick={handleIncrease}>
                    <Plus className='w-4 h-4' />
                </Button>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={handleRemove}
                    className='text-red-500 hover:text-red-700'
                >
                    <Trash2 className='w-4 h-4' />
                </Button>
            </div>
        </div>
    )
}
