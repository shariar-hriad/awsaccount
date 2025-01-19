'use client'

import { useCartStore } from '@/store/cart'
import CheckOutForm from './_components/checkout-form'

const Page = () => {
    const { total } = useCartStore()

    return (
        <section className='py-8 lg:py-16'>
            <div className='container'>
                <CheckOutForm />
            </div>
        </section>
    )
}

export default Page
