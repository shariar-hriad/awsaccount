'use client'

import { useCartStore } from '@/store/cart'
import CartItemCard from './_components/cart-item'

const Page = () => {
    const { items } = useCartStore((state) => state)
    console.log(items)

    return (
        <section className='py-10'>
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {items.map((item) => (
                        <CartItemCard key={item._id as string} product={item} />
                    ))}
                </div>
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
