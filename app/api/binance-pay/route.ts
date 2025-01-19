import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.BINANCE_PAY_API_KEY!
const SECRET_KEY = process.env.BINANCE_PAY_SECRET_KEY!
const BASE_URL = 'https://bpay.binanceapi.com'

if (!API_KEY || !SECRET_KEY) {
    throw new Error('Binance Pay API key or secret key is not set.')
}

function generateNonce(length: number = 32): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let nonce = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        nonce += characters[randomIndex]
    }
    return nonce
}

interface OrderRequest {
    merchantTradeNo: string
    totalFee: number
    currency: string
    goods: {
        goodsType: string
        goodsCategory: string
        referenceGoodsId: string
        goodsName: string
    }
}

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json()

        const timestamp = Date.now()
        const nonce = generateNonce()

        const payloadStr = `${timestamp}\n${nonce}\n${JSON.stringify(
            requestBody
        )}\n`
        const signature = crypto
            .createHmac('sha512', SECRET_KEY)
            .update(payloadStr)
            .digest('hex')
            .toUpperCase()

        console.log('Nonce :', nonce.length)
        console.log('Payload String :', payloadStr)
        console.log('Headers being sent:', {
            'Content-Type': 'application/json',
            'BinancePay-Timestamp': timestamp.toString(),
            'BinancePay-Nonce': nonce,
            'BinancePay-Certificate-SN': API_KEY,
            'BinancePay-Signature': signature,
        })
        console.log('Request Body :', JSON.stringify(requestBody))

        const response = await fetch(
            `${BASE_URL}/binancepay/openapi/v3/order`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'BinancePay-Timestamp': timestamp.toString(),
                    'BinancePay-Nonce': nonce,
                    'BinancePay-Certificate-SN': API_KEY,
                    'BinancePay-Signature': signature,
                },
                body: JSON.stringify(requestBody),
            }
        )
        const result = await response.json()
        console.log(result)

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.log('Error while creating Binance Pay order:', error)

        return NextResponse.json(
            {
                error:
                    (error as Error).message || 'An unexpected error occurred.',
            },
            { status: 500 }
        )
    }
}
