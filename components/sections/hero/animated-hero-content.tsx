'use client'

import InteractiveContent from '@/components/interactive-content'
import { Button } from '@/components/ui/button'
import { IProduct } from '@/models/product-model'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface AnimatedHeroContentProps {
    products: IProduct[]
}

export default function AnimatedHeroContent({
    products,
}: AnimatedHeroContentProps) {
    const textVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    }

    const imageVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className='flex flex-col items-center'>
            <motion.div
                className='text-center mb-12 space-y-4'
                initial='hidden'
                animate='visible'
                variants={textVariants}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h1 className='text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>
                    {products[0].title}
                </h1>
                <InteractiveContent text={products[0].excerpt} limit={300} />

                <div className='space-x-2'>
                    <Button size='lg'>Buy Now</Button>
                    <Link href={`/product/${products[0].slug}`}>
                        <Button size='lg' variant='outline'>
                            See Details
                        </Button>
                    </Link>
                </div>
            </motion.div>
            <motion.div
                className='w-full max-w-4xl mx-auto'
                initial='hidden'
                animate='visible'
                variants={imageVariants}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            >
                <Image
                    src={products[0].image!}
                    alt='AWS Account Dashboard'
                    width={1000}
                    height={400}
                    priority
                    className='rounded-lg shadow-lg w-full h-auto'
                />
            </motion.div>
        </div>
    )
}
