'use client'

import { convertUSDTtoBTC, convertUSDTtoETH } from '@/lib/binance-pay'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CurrencyList = () => {
    const { total } = useCartStore()
    const [eth, setEth] = useState<string | null>()
    const [btc, setBtc] = useState<string | null>()
    const router = useRouter()

    convertUSDTtoETH(total)
        .then((result) => setEth(result.equivalentETH))
        .catch((error) => console.log(error))
    convertUSDTtoBTC(total)
        .then((result) => setBtc(result.equivalentBTC))
        .catch((error) => console.log(error))

    // Handle navigation
    const handleNavigation = (currency: string) => {
        router.push(`/payment/${currency}`)
    }

    return (
        <div className='space-y-2'>
            <button
                onClick={() => handleNavigation('USDT')}
                className='border w-full text-left p-4 rounded-md flex items-center gap-5 hover:border-green-500 hover:bg-green-50 transition-colors duration-300'
            >
                <div>
                    <Image
                        src='/payment-method/usdt.png'
                        alt='usdt'
                        width={60}
                        height={60}
                    />
                </div>
                <div>
                    <h2 className='font-medium text-xl'>USDT TRC20</h2>
                    <p>{total} USDT</p>
                    <p className='text-muted-foreground'>
                        Including Fee of 0 USDT
                    </p>
                </div>
            </button>
            <button
                onClick={() => handleNavigation('eth')}
                className='border w-full text-left p-4 rounded-md hover:border-gray-500 hover:bg-gray-200 transition-colors duration-300 flex items-center gap-5'
            >
                <div>
                    <Image
                        src='/payment-method/eth.png'
                        alt='Ethereum'
                        width={60}
                        height={60}
                    />
                </div>
                <div>
                    <h2 className='font-medium text-xl'>Ethereum ETH ERC20</h2>
                    <p>{eth} ETH</p>
                    <p className='text-muted-foreground'>
                        Including Fee of 0 ETH
                    </p>
                </div>
            </button>
            <button
                onClick={() => handleNavigation('btc')}
                className='border w-full text-left p-4 hover:border-orange-500 hover:bg-orange-50 transition-colors duration-300 rounded-md flex items-center gap-5'
            >
                <div>
                    <Image
                        src='/payment-method/bitcoin.png'
                        alt='Bitcoin'
                        width={60}
                        height={60}
                    />
                </div>
                <div>
                    <h2 className='font-medium text-xl'>Bitcoin BTC</h2>
                    <p>{btc} BTC</p>
                    <p className='text-muted-foreground'>
                        Including Fee of 0 BTC
                    </p>
                </div>
            </button>
        </div>
    )
}

export default CurrencyList
