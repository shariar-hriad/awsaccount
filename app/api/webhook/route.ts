import crypto from 'crypto'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const signature = request.headers.get('x-cc-webhook-signature')
    const rawBody = await request.text()

    // Verify signature
    const hmac = crypto.createHmac(
        'sha256',
        process.env.WEBHOOK_SECRET as string
    )
    hmac.update(rawBody)
    const expectedSignature = hmac.digest('hex')

    if (signature !== expectedSignature) {
        return new Response('Invalid signature', { status: 400 })
    }

    const event = JSON.parse(rawBody)

    switch (event.type) {
        case 'charge:confirmed':
            console.log('Payment confirmed:', event.data)
            // Handle successful payment here (e.g., update database)
            break
        default:
            console.log('Unhandled event type:', event.type)
    }

    return new Response('Webhook received', { status: 200 })
}
