import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className='py-8 lg:py-20 text-center'>
            <div className='container lg:px-40'>
                <h1 className='text-5xl font-bold mb-4'>
                    Get Your AWS Account Instantly
                </h1>
                <p className='text-xl text-gray-600 mb-8'>
                    Start your cloud journey with a pre-configured AWS account.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor autem eos fugiat aspernatur. Neque hic porro doloribus
                    sunt aspernatur corrupti suscipit magni alias praesentium
                    corporis, laudantium dolores eligendi eaque rem, quaerat
                    officia possimus culpa. Asperiores, quidem sequi tenetur
                    laboriosam ab eius rerum totam aliquid at accusantium nobis
                    nisi. Corporis necessitatibus eius nam quod, et sit deserunt
                    nulla sequi atque eaque, laborum hic vel enim ducimus!
                    necessitatibus tenetur eaque dolores autem, dolore nemo?
                </p>
                <div className='space-x-2 mb-12'>
                    <Button size='lg' variant='destructive'>
                        Buy Now
                    </Button>
                    <Link href='/product'>
                        <Button size='lg' variant='outline'>
                            See Details
                        </Button>
                    </Link>
                </div>
                <div className='max-w-4xl mx-auto'>
                    <Image
                        src='/hero-image.png'
                        alt='AWS Account Dashboard'
                        width={1000}
                        height={400}
                        className='rounded-lg shadow-lg'
                    />
                </div>
            </div>
        </section>
    )
}
