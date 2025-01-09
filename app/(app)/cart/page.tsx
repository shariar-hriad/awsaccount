'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import CartItemCard from './_components/cart-item'

const Page = () => {
    const { items, total } = useCartStore((state) => state)
    console.log(items)

    return (
        <section className='py-10'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {items.map((item) => (
                        <CartItemCard key={item._id as string} product={item} />
                    ))}
                </div>
                {items.length > 1 && (
                    <div className='w-[90%] sm:w-[360px] rounded-xl overflow-hidden flex border border-solid border-border-primary h-min mx-auto mt-5'>
                        <div className='flex flex-col p-2.5 justify-center w-1/2 gap-2 text-center'>
                            <div className='flex gap-2.5 justify-center text-sm'>
                                <span>Total:</span>
                                <span>{total}$</span>
                            </div>
                            <span className='text-xs'>+ TAX INCL.</span>
                        </div>
                        <div className='w-1/2 border-l border-solid bg-background-secondary border-border-primary'>
                            <Button variant='ghost'>Checkout</Button>
                        </div>
                    </div>
                )}
                {!items.length && (
                    <p className='text-center font-medium text-3xl'>
                        No items in the carts!
                    </p>
                )}
            </div>
        </section>
    )
}

export default Page
