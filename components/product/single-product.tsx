'use client'

import QuantityControl from '@/app/(app)/product/_components/quantity-control'
import { SelectScrollable } from '@/app/(app)/product/_components/select-scrollable'
import { Separator } from '@/components/ui/separator'
import { IProductDoc } from '@/models/product-model'
import { DollarSign, Minus } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'
import AddToCart from '../cart/add-to-cart'
import ProductAccordion from './product-accordion'

type SingleProductProps = {
    product: IProductDoc
}

const SingleProduct: FC<SingleProductProps> = ({ product }) => {
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    const selectedVariantData = product.variations.find(
        (variant) => variant.credit === selectedVariant
    )

    return (
        <div className='space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {product.image && (
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={500}
                        priority
                        className='rounded-lg object-cover w-full h-auto'
                    />
                )}
                <div className='space-y-5'>
                    {/* basic info */}
                    <h1 className='text-3xl font-black'>{product.title}</h1>
                    <Separator />
                    <p className='text-primary text-lg lg:text-3xl flex items-center gap-1'>
                        {product.priceRange && (
                            <>
                                <span className='flex items-center'>
                                    <DollarSign className='w-7 h-7 mr-[1px]' />
                                    {product.priceRange.min}
                                </span>
                                <Minus />
                                <span className='flex items-center'>
                                    <DollarSign className='w-7 h-7 mr-[1px]' />
                                    {product.priceRange.max}
                                </span>
                            </>
                        )}
                    </p>
                    <p className='text-muted-foreground'>{product.excerpt}</p>
                    <ProductAccordion description={product.description} />
                    {/* price */}
                    <div className='flex items-center justify-between gap-5'>
                        <h2 className='text-lg font-medium'>Options</h2>
                        <SelectScrollable
                            variations={product.variations}
                            setSelectedVariant={setSelectedVariant}
                        />
                    </div>
                    <Separator />
                    {selectedVariantData && (
                        <p className='flex items-center text-primary'>
                            <DollarSign className='w-5 h-5 mr-[2px]' />
                            <span className='text-xl'>
                                {selectedVariantData?.amount}
                            </span>
                        </p>
                    )}
                    {/* add to cart button */}
                    <div className='flex flex-wrap items-center gap-5'>
                        <QuantityControl
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                        {selectedVariantData && (
                            <AddToCart
                                product={product}
                                selectedVariant={selectedVariantData}
                                quantity={quantity}
                            />
                        )}
                    </div>
                    <Separator />
                    {/* category */}
                    <div className='flex items-center gap-5'>
                        <h2 className='text-lg font-medium'>Category :</h2>
                        <p className='text-muted-foreground'>
                            {product.category}
                        </p>
                    </div>
                </div>
            </div>
            <Separator />
            <div
                className='prose max-w-full dark:prose-invert'
                dangerouslySetInnerHTML={{ __html: product.content }}
            />
        </div>
    )
}

export default SingleProduct
