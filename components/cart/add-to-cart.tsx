'use client'

import { IProductDoc, IProductVariation } from '@/models/product-model'
import { useCartStore } from '@/store/cart'
import { FC } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface IAddToCartProps {
    product: IProductDoc
    selectedVariant: IProductVariation
    quantity: number
}

const AddToCart: FC<IAddToCartProps> = ({
    product,
    selectedVariant,
    quantity,
}) => {
    const { addItem } = useCartStore((state) => state)

    const handleAddToCart = () => {
        addItem(product, selectedVariant, Number(quantity))
        toast.success('Item added to cart')
    }

    return (
        <Button variant='secondary' onClick={handleAddToCart}>
            Add to Cart
        </Button>
    )
}

export default AddToCart
