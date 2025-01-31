'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { generateOrderNumber } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ItemList from '../_components/item-list'

export interface ICreateOrder {
    currency: string
    totalFee: string
    prepayId: string
    terminalType: string
    expireTime: number
    qrcodeLink: string
    qrContent: string
    checkoutUrl: string
    deeplink: string
    universalUrl: string
}

// const requestBody = {
//     merchantId: process.env.BINANCE_MERCHANT_ID!,
//     merchantTradeNo: generateOrderNumber(),
//     orderAmount: total,
//     currency: params.currency,
//     description: 'Virtual Credit Card',
//     goodsDetails: 'Goods Details',
//     // goods: items.map((item) => ({
//     //     goodsType: '02',
//     //     goodsCategory: 'Z000',
//     //     referenceGoodsId: item._id,
//     //     goodsName: item.title,
//     //     goodsDetail: item.excerpt,
//     // })),
//     goods: [
//         {
//             goodsType: '02',
//             goodsCategory: 'Z000',
//             referenceGoodsId: 'item._id',
//             goodsName: 'item.title',
//             goodsDetail: 'item.excerpt',
//         },
//     ],
//     shipping: {
//         firstName: 'Shariar Hossain',
//         lastName: 'Riad',
//     },
//     env: {
//         terminalType: 'APP',
//     },
// }

const Page = ({ params }: { params: { currency: string } }) => {
    console.log(params)
    const [createOrder, setCreateOrder] = useState<ICreateOrder | null>()
    const { total } = useCartStore()
    console.log(createOrder)
    const [eth, setEth] = useState<string | null>()
    const [btc, setBtc] = useState<string | null>()
    const [currency, setCurrency] = useState(params.currency)

    // Fetch equivalent ETH and BTC values
    // useEffect(() => {
    //     const fetchConversionRates = async () => {
    //         try {
    //             const [ethResult, btcResult] = await Promise.all([
    //                 convertUSDTtoETH(total),
    //                 convertUSDTtoBTC(total),
    //             ])

    //             setEth((prevEth) =>
    //                 prevEth !== ethResult.equivalentETH
    //                     ? ethResult.equivalentETH
    //                     : prevEth
    //             )
    //             setBtc((prevBtc) =>
    //                 prevBtc !== btcResult.equivalentBTC
    //                     ? btcResult.equivalentBTC
    //                     : prevBtc
    //             )
    //         } catch (error) {
    //             console.error('Error fetching conversion rates:', error)
    //         }
    //     }

    //     fetchConversionRates()
    // }, [total])

    useEffect(() => {
        const requestBody = {
            env: {
                terminalType: 'APP',
            },
            merchantId: process.env.BINANCE_MERCHANT_ID!,
            merchantTradeNo: generateOrderNumber(),
            orderAmount: 250,
            currency: 'USDT',
            description: 'very good Ice Cream',
            goodsDetails: [
                {
                    goodsType: '01',
                    goodsCategory: 'D000',
                    referenceGoodsId: '7876763A3B',
                    goodsName: 'Ice Cream',
                    goodsDetail: 'Greentea ice cream cone',
                },
                {
                    goodsType: '01',
                    goodsCategory: 'D000',
                    referenceGoodsId: '7876763A3U',
                    goodsName: 'Ice Cream asdf',
                    goodsDetail: 'Greentea ice cream cone',
                },
            ],
        }

        const fetchData = async () => {
            try {
                const response = await fetch('/api/binance-pay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                const result = await response.json()
                setCreateOrder(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currency, total])

    return (
        <section className='py-8 lg:py-8'>
            <div className='container max-w-5xl'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <div className='p-4 rounded-md lg:col-span-2 border'>
                        <ItemList />
                    </div>
                    <div className='rounded-md border p-4 space-y-3'>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Choose Currency' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='ETH'>
                                    <div>
                                        <h5>ETHEREUM (ETH)</h5>
                                        <span>{eth}</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value='BTC'>
                                    <div>
                                        <h5>BITCOIN (BTC)</h5>
                                        <span>{btc}</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value='USDT'>
                                    <div>
                                        <h5>USDT (TRC20)</h5>
                                        <span>{total}</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {createOrder?.qrcodeLink && (
                            <div className='border p-2 rounded-md text-center'>
                                <Image
                                    src={createOrder.qrcodeLink}
                                    alt='QrCode'
                                    width={250}
                                    height={250}
                                    priority
                                />
                                <span className='text-sm'>Scan to Pay</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page
