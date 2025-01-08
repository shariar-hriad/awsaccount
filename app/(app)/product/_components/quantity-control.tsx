'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'
import { FC } from 'react'

type QuantityControlProps = {
    quantity: number
    setQuantity: (quantity: number) => void
}

const QuantityControl: FC<QuantityControlProps> = ({
    quantity,
    setQuantity,
}) => {
    const increment = () => setQuantity(quantity + 1)
    const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1)

    return (
        <div className='flex items-center gap-3'>
            <Button variant='outline' size='icon' onClick={increment}>
                <Plus className='w-4 h-4' />
            </Button>
            <Input
                type='number'
                className={`${buttonVariants({
                    variant: 'outline',
                    size: 'icon',
                })} text-center`}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Button
                variant='outline'
                size='icon'
                onClick={decrement}
                disabled={quantity === 1}
            >
                <Minus className='w-4 h-4' />
            </Button>
        </div>
    )
}

export default QuantityControl
