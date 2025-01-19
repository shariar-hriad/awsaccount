'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'
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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<Partial<OrderFormData>>({})
    const router = useRouter()

    // Handle Input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name as keyof OrderFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }
    // Validate Form
    const validateForm = (): boolean => {
        const newErrors: Partial<OrderFormData> = {}

        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.email) newErrors.lastName = 'Email is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    // Handle submit
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        localStorage.setItem('user_order_info', JSON.stringify(formData))
        setIsSubmitting(false)
        router.push('/payment')
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
                                        {errors.firstName && (
                                            <p className='text-sm text-red-500'>
                                                {errors.firstName}
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
                                        {errors.lastName && (
                                            <p className='text-sm text-red-500'>
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input
                                        id='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.email && (
                                        <p className='text-sm text-red-500'>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='space-y-4'>
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
                            <div className='p-4 rounded-md bg-gray-100 flex justify-between items-center gap-2'>
                                <p>
                                    <b>USDT, BTC, ETH, Binance Pay</b>
                                </p>
                                <div className='flex items-center gap-1'>
                                    <Image
                                        src='/payment-method/eth.png'
                                        alt='Etherum'
                                        width={40}
                                        height={40}
                                    />
                                    <Image
                                        src='/payment-method/bitcoin.png'
                                        alt='Etherum'
                                        width={40}
                                        height={40}
                                    />
                                    <Image
                                        src='/payment-method/usdt.png'
                                        alt='Etherum'
                                        width={40}
                                        height={40}
                                    />
                                    <Image
                                        src='/payment-method/binance-pay.png'
                                        alt='Etherum'
                                        width={140}
                                        height={140}
                                    />
                                </div>
                            </div>
                            <Button type='submit' disabled={isSubmitting}>
                                {isSubmitting
                                    ? 'Submitting...'
                                    : 'Proceed to Checkout'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default CheckOutForm
