'use client'

import { useState } from 'react'

export default function PaymentPage() {
    const [amount, setAmount] = useState('')
    const [orderId, setOrderId] = useState('')
    const [response, setResponse] = useState<any>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            merchantTradeNo: orderId,
            orderAmount: amount,
            currency: 'USDT',
            goods: {
                goodsType: '02', // Virtual goods
                goodsCategory: '0000',
                referenceGoodsId: '123456',
                goodsName: 'Example Product',
            },
        }

        try {
            const res = await fetch('/api/binance-pay/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })

            const json = await res.json()
            setResponse(json)
        } catch (error) {
            console.error('Payment error:', error)
        }
    }

    return (
        <div>
            <h1>Binance Pay Integration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Order ID:
                        <input
                            type='text'
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type='number'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type='submit'>Pay</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    )
}
