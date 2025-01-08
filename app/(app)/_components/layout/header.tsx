'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CartButton } from '../cart-button'
import { ModeToggle } from './mode-toggle'

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
            className='sticky border top-2 z-50 w-full rounded-lg max-w-6xl mx-auto border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 lg:py-4'
            initial='hidden'
            animate='visible'
            variants={headerVariants}
        >
            <div className='container mx-auto flex justify-between items-center'>
                <Link href='/' className='text-2xl font-bold text-blue-600'>
                    AWSAccountPro
                </Link>
                <div className='flex gap-2 items-center'>
                    <ModeToggle />
                    <CartButton />
                </div>
            </div>
        </motion.header>
    )
}
