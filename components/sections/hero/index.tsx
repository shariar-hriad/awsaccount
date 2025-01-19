import { getProducts } from '@/app/actions/product/actions'
import dynamic from 'next/dynamic'
const AnimatedHeroContent = dynamic(() => import('./animated-hero-content'), {
    ssr: false,
})

export default async function Hero() {
    const { products } = await getProducts()

    return (
        <section className='py-8 lg:py-20'>
            <div className='container'>
                {products ? (
                    <div className='max-w-4xl mx-auto'>
                        <AnimatedHeroContent products={products} />
                    </div>
                ) : (
                    <p>No content found</p>
                )}
            </div>
        </section>
    )
}
