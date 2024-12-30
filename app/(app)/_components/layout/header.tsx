'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { CartButton } from '../cart-button'
import { CartSidebar } from '../cart-sidebar'
import { ModeToggle } from './mode-toggle'

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <header className='w-full py-4 px-4 sm:px-6 lg:px-8'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link href='/' className='text-2xl font-bold text-blue-600'>
                    AWSAccountPro
                </Link>
                <nav className='hidden md:flex space-x-4'>
                    <Link
                        href='#features'
                        className='text-gray-600 hover:text-blue-600'
                    >
                        Features
                    </Link>
                    <Link
                        href='#pricing'
                        className='text-gray-600 hover:text-blue-600'
                    >
                        Pricing
                    </Link>
                    <Link
                        href='#contact'
                        className='text-gray-600 hover:text-blue-600'
                    >
                        Contact
                    </Link>
                </nav>
                <div className='flex gap-2 items-center'>
                    <ModeToggle />
                    <Button variant='destructive'>Buy Now</Button>
                    <CartButton onClick={() => setIsCartOpen(true)} />
                </div>
            </div>
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    )
}
