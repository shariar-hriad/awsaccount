import { getProducts } from '@/app/actions/product/actions'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
const AnimatedHeroContent = dynamic(() => import('./animated-hero-content'), {
    ssr: false,
})

export default async function Hero() {
    const { products } = await getProducts({})

    if (!products) return notFound()

    return (
        <section className='py-8 lg:py-20 text-center'>
            <div className='container'>
                <div className='max-w-4xl mx-auto'>
                    <AnimatedHeroContent products={products} />
                </div>
            </div>
        </section>
    )
}
