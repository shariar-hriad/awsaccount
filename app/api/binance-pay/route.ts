import { createOrder } from '@/lib/binance-pay'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body)
        // Validate and structure the order data
        const orderData = {
            merchantTradeNo: `order_${Date.now()}`,
            orderAmount: '',
            currency: 'USDT',
            referenceGoodsId: '',
            goodsName: `${product.title} ${product.varaint}`,
            goodDetail: 'Product.description',
            env: { terminalType: 'WEB' }, // or 'APP' depending on your environment
            goods: {
                goodsType: '01', // assuming '01' is a valid goods type
                goodsCategory: 'D000', // assuming 'D000' is a valid goods category
                referenceGoodsId: '',
                goodsName: `${product.title} ${product.varaint}`,
                goodsDetail: 'Product.description',
            },
        }

        const response = await createOrder(orderData)
        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        )
    }
}
