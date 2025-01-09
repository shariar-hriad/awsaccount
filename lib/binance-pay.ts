import crypto from 'crypto'

const BINANCE_API_URL = 'https://bpay.binanceapi.com'
const API_KEY = process.env.BINANCE_API_KEY!
const API_SECRET = process.env.BINANCE_API_SECRET!

interface BinancePayRequest {
    env: {
        terminalType: 'APP' | 'WEB'
    }
    merchantTradeNo: string
    orderAmount: number
    currency: string
    goods: {
        goodsType: '01' // "01" indicates a virtual good
        goodsCategory: string
        referenceGoodsId: string
        goodsName: string
        goodsDetail: string
    }
}

export async function createOrder(orderData: BinancePayRequest) {
    const endpoint = '/binancepay/openapi/v2/order'
    const payload = JSON.stringify(orderData)

    const timestamp = Date.now().toString()
    const signature = crypto
        .createHmac('sha256', API_SECRET)
        .update(timestamp + API_KEY + payload)
        .digest('hex')

    try {
        const response = await fetch(`${BINANCE_API_URL}${endpoint}`, {
            method: 'post',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'BinancePay-Timestamp': timestamp,
                'BinancePay-Signature': signature,
                'BinancePay-Certificate-SN': API_KEY,
            },
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Error creating Binance Pay order:', error)
        throw error
    }
}
