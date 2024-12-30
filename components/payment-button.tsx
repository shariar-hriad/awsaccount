'use client'

import { useState } from 'react'

interface IPaymentButton {
    amount: string
    currency: string
}

export default function PaymentButton({ amount, currency }: IPaymentButton) {
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, currency }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to create payment')
            }

            const data = await response.json()
            window.location.href = data.data.hosted_url // Redirect to the hosted payment page
        } catch (error) {
            console.error('Payment error:', error)
            alert('Failed to initiate payment. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50'
        >
            {loading ? 'Processing...' : 'Pay with Crypto'}
        </button>
    )
}
