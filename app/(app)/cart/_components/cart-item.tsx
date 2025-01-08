'use client'

import { Button } from '@/components/ui/button'
import { CartItem, useCartStore } from '@/store/cart'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'

const CartItemCard = ({ product }: { product: CartItem }) => {
    const { updateQuantity, decreaseQuantity, removeItem } = useCartStore(
        (state) => state
    )

    return (
        <div className='border rounded-lg p-4 space-y-4'>
            <h3 className='font-semibold text-lg'>{product.title}</h3>

            {product.image && (
                <div className='relative w-full h-48'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className='object-cover rounded-md'
                    />
                </div>
            )}

            <div className='flex justify-between items-center'>
                <span className='font-medium text-lg'>
                    ${product.price.toFixed(2)}
                </span>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                            decreaseQuantity(
                                product._id as string,
                                product.variant
                            )
                        }
                    >
                        <Minus className='h-4 w-4' />
                    </Button>
                    <span>{product.quantity}</span>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                            updateQuantity(
                                product._id as string,
                                product.variant
                            )
                        }
                    >
                        <Plus className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            <p className='text-sm text-gray-600'>Variant: {product.variant}</p>

            <Button
                variant='outline'
                className='w-full'
                onClick={() => removeItem(product._id as string)}
            >
                <X className='h-4 w-4 mr-2' />
                Remove
            </Button>
        </div>
    )
}

export default CartItemCard
