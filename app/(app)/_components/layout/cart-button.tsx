'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function CartButton() {
    const { items } = useCartStore((state) => state)

    return (
        <Button className='relative' size='icon' variant='outline' asChild>
            <Link href='/cart'>
                <ShoppingCart className='w-6 h-6' />
                {items.length > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                        {items.length}
                    </span>
                )}
            </Link>
        </Button>
    )
}
