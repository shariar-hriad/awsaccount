import crypto from 'crypto'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const BINANCE_API_URL = 'https://bpay.binanceapi.com'
const API_KEY = process.env.BINANCE_API_KEY!
const API_SECRET = process.env.BINANCE_API_SECRET!

// Helper to generate HMAC SHA256 signature
function generateSignature(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const payload = JSON.stringify(body)
        const timestamp = Date.now()
        const signature = generateSignature(
            `${timestamp}${payload}`,
            API_SECRET
        )

        const response = await fetch(
            `${BINANCE_API_URL}/binancepay/openapi/v2/order`,
            {
                method: 'post',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'BinancePay-Timestamp': timestamp.toString(),
                    'BinancePay-Signature-Type': 'HMAC',
                    'BinancePay-Signature': signature,
                    'BinancePay-Certificate-SN': API_KEY,
                },
            }
        )
        const data = await response.json()

        return NextResponse.json(data)
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error' },
            { status: 500 }
        )
    }
}
