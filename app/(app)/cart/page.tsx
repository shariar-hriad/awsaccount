'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import CartItemCard from './_components/cart-item'

const Page = () => {
    const { items, total } = useCartStore((state) => state)

    return (
        <section className='py-20'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {items.map((item) => (
                        <CartItemCard key={item._id as string} product={item} />
                    ))}
                </div>
                {items.length >= 1 && (
                    <div className='w-[90%] sm:w-[360px] rounded-xl overflow-hidden flex items-center border border-solid border-border-primary h-min mx-auto mt-5'>
                        <div className='flex flex-col p-2.5 justify-center items-center w-1/2 gap-2 text-center'>
                            <div className='flex gap-2.5 justify-center items-center text-sm'>
                                <span>Total:</span>
                                <span>{total}$</span>
                            </div>
                        </div>
                        <Button
                            asChild
                            variant='ghost'
                            className='rounded-tl-none rounded-bl-none w-full border-l'
                        >
                            <Link href='/checkout'>Continue</Link>
                        </Button>
                    </div>
                )}
                {!items.length && (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <ShoppingCart className='w-32 lg:w-60 h-32 lg:h-60' />
                        <h3 className='font-semibold text-2xl lg:text-4xl'>
                            Cart is Empty
                        </h3>
                        <Button asChild>
                            <Link href='/'>Continue shopping</Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Page
