'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Star, Truck } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// Mock product data
const product = {
    id: 1,
    name: 'Premium Credit Package',
    shortDescription: 'Boost your account with our credit packages',
    fullDescription:
        "Enhance your experience with our Premium Credit Package. Choose the credit amount that suits your needs and enjoy more features, benefits, and opportunities within our platform. Whether you're a casual user or a power user, we have the right package for you.",
    basePrice: 49.99,
    rating: 4.5,
    reviews: 128,
    image: '/hero-image.png',
    variants: [
        { id: 1, name: '5k Credits', price: 49.99 },
        { id: 2, name: '10k Credits', price: 89.99 },
    ],
    features: [
        'Instant credit delivery',
        'Use across all platform features',
        'No expiration date',
        'Shareable with team members',
        'Priority customer support',
        'Exclusive access to premium content',
    ],
    specs: {
        'Credit Type': 'Platform-wide',
        'Delivery Method': 'Instant',
        'Usage Limit': 'None',
        Transferable: 'Yes, within team',
        'Support Level': 'Priority',
    },
}

export default function ProductPage() {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0])

    return (
        <div className='container mx-auto py-8'>
            <div className='grid md:grid-cols-2 gap-8 mb-8'>
                <AspectRatio ratio={1 / 1} className='bg-muted'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className='rounded-md object-cover'
                    />
                </AspectRatio>
                <div className='flex flex-col justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>
                            {product.name}
                        </h1>
                        <p className='text-muted-foreground mb-4'>
                            {product.shortDescription}
                        </p>
                        <div className='flex items-center mb-4'>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i < Math.floor(product.rating)
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                            <span className='ml-2 text-sm text-muted-foreground'>
                                ({product.reviews} reviews)
                            </span>
                        </div>
                        <div className='mb-4'>
                            <h2 className='text-lg font-semibold mb-2'>
                                Select Credit Package:
                            </h2>
                            <RadioGroup
                                defaultValue={selectedVariant.id.toString()}
                                onValueChange={(value) =>
                                    setSelectedVariant(
                                        product.variants.find(
                                            (v) => v.id.toString() === value
                                        ) || product.variants[0]
                                    )
                                }
                            >
                                {product.variants.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className='flex items-center space-x-2'
                                    >
                                        <RadioGroupItem
                                            value={variant.id.toString()}
                                            id={`variant-${variant.id}`}
                                        />
                                        <Label
                                            htmlFor={`variant-${variant.id}`}
                                        >
                                            {variant.name} - $
                                            {variant.price.toFixed(2)}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <p className='text-3xl font-bold mb-4'>
                            ${selectedVariant.price.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <Button variant='outline' size='lg'>
                            Add to Cart
                        </Button>
                        <div className='flex items-center text-sm text-muted-foreground'>
                            <Truck className='w-4 h-4 mr-2' />
                            <span>Instant delivery after purchase</span>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className='my-8' />

            <div className='grid md:grid-cols-2 gap-8'>
                <Card>
                    <CardContent className='pt-6'>
                        <h2 className='text-2xl font-semibold mb-4'>
                            Product Description
                        </h2>
                        <p className='text-muted-foreground'>
                            {product.fullDescription}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className='pt-6'>
                        <h2 className='text-2xl font-semibold mb-4'>
                            Key Features
                        </h2>
                        <ul className='list-disc pl-5 space-y-2 text-muted-foreground'>
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className='mt-8'>
                <CardContent className='pt-6'>
                    <h2 className='text-2xl font-semibold mb-4'>
                        Package Details
                    </h2>
                    <div className='grid grid-cols-2 gap-4'>
                        {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className='flex justify-between'>
                                <span className='font-medium'>{key}:</span>
                                <span className='text-muted-foreground'>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
