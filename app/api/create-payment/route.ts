import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { amount, currency } = await request.json() // Parse the request body

        const response = await fetch(
            'https://api.commerce.coinbase.com/charges',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CC-Api-Key': process.env.COINBASE_API_KEY,
                    'X-CC-Version': '2022-03-21',
                },
                body: JSON.stringify({
                    name: 'Order Payment',
                    description: 'Payment for your order',
                    pricing_type: 'fixed_price',
                    local_price: {
                        amount: amount,
                        currency: currency,
                    },
                    metadata: {
                        customer_id: '12345', // Replace with actual customer data if available
                    },
                }),
            }
        )

        if (!response.ok) {
            throw new Error('Failed to create payment')
        }

        const data = await response.json()
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.error('Payment creation error:', error)
        return new Response(
            JSON.stringify({
                message: 'Error creating payment',
                error: error.message,
            }),
            { status: 500 }
        )
    }
}
