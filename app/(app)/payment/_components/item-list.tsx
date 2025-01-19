'use client'

import { useCartStore } from '@/store/cart'

const ItemList = () => {
    const { items, total } = useCartStore()

    return (
        <div className='space-y-2'>
            {items.map((item, index) => (
                <div key={index} className='flex justify-between'>
                    <div className='flex flex-col gap-1'>
                        <span>{item.title}</span>
                        <span className='text-sm text-muted-foreground'>
                            {item.variant}
                        </span>
                    </div>
                    <span>${item.price.toFixed(2)}</span>
                </div>
            ))}
            <div className='border-t pt-2 mt-2'>
                <div className='flex justify-between font-semibold text-lg mt-2'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default ItemList
