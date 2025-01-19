'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface OrderFormData {
    firstName: string
    lastName: string
    email: string
}

const CheckOutForm = () => {
    const initialFormData: OrderFormData = {
        firstName: '',
        lastName: '',
        email: '',
    }
    const [formData, setFormData] = useState<OrderFormData>(initialFormData)

    const { items, total } = useCartStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formError, setFormError] = useState<Partial<OrderFormData>>({})

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (formError[name as keyof OrderFormData]) {
            setFormError((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<OrderFormData> = {}

        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.email) newErrors.lastName = 'Email is required'
        setFormError(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        setError(null)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='space-y-6'>
                            <h3 className='text-lg font-semibold mb-4'>
                                Shipping Information
                            </h3>
                            <div className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <Label htmlFor='firstName'>
                                            First Name
                                        </Label>
                                        <Input
                                            id='firstName'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formError.firstName && (
                                            <p className='text-sm text-red-500'>
                                                {formError.firstName}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor='lastName'>
                                            Last Name
                                        </Label>
                                        <Input
                                            id='lastName'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {formError.lastName && (
                                            <p className='text-sm text-red-500'>
                                                {formError.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formError.email && (
                                        <p className='text-sm text-red-500'>
                                            {formError.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>
                                Order Summary
                            </h3>
                            <div className='p-4 rounded-lg'>
                                <div className='space-y-2'>
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            className='flex justify-between'
                                        >
                                            <div className='flex flex-col gap-1'>
                                                <span>{item.title}</span>
                                                <span className='text-sm text-muted-foreground'>
                                                    {item.variant}
                                                </span>
                                            </div>
                                            <span>
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                    <div className='border-t pt-2 mt-2'>
                                        <div className='flex justify-between font-semibold text-lg mt-2'>
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className='text-red-500 text-sm mt-2' role='alert'>
                            {error}
                        </div>
                    )}
                    <CardFooter className='px-0'>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Proceed to payment'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

export default CheckOutForm
