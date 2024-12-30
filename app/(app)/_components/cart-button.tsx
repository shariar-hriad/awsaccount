'use client'

import { useCart } from '@/hooks/useCart'
import { ShoppingCart } from 'lucide-react'

type CartButtonProps = {
    onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
    const { count } = useCart()

    return (
        <button
            onClick={onClick}
            className='relative p-2 text-gray-700 hover:text-gray-900'
            aria-label='Open cart'
        >
            <ShoppingCart className='w-6 h-6' />
            {count > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                    {count}
                </span>
            )}
        </button>
    )
}
