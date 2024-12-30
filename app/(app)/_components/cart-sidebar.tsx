'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useCart } from '@/hooks/useCart'
import { CartItem } from './cart-item'

type CartSidebarProps = {
    isOpen: boolean
    onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const { items, total } = useCart()

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='w-full sm:max-w-lg'>
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className='mt-8 flex flex-col h-full'>
                    <ScrollArea className='flex-grow'>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))
                        ) : (
                            <p className='text-center text-gray-500'>
                                Your cart is empty
                            </p>
                        )}
                    </ScrollArea>
                    <div className='border-t pt-4 mt-4'>
                        <div className='flex justify-between items-center mb-4'>
                            <span className='text-lg font-semibold'>
                                Total:
                            </span>
                            <span className='text-xl font-bold'>
                                ${total.toFixed(2)}
                            </span>
                        </div>
                        <Button className='w-full' size='lg'>
                            Checkout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
