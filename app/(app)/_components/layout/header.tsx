'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './cart-button'
import { ModeToggle } from './mode-toggle'
import SocialMedia from './social-media'

const headerVariants = {
    hidden: { y: -100 },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    },
}

export default function Header() {
    return (
        <motion.header
            className='sticky top-0 w-full p-2 z-50'
            initial='hidden'
            animate='visible'
            variants={headerVariants}
        >
            <div className='container lg:px-10 flex justify-between gap-1 items-center border p-2 rounded-lg border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md'>
                <Link href='/' className='text-2xl font-bold text-blue-600'>
                    <Image
                        src='/logo.svg'
                        alt='awsbulk'
                        width={70}
                        height={40}
                    />
                </Link>
                <div className='flex gap-2 items-center'>
                    <SocialMedia />
                    <ModeToggle />
                    <CartButton />
                </div>
            </div>
        </motion.header>
    )
}
