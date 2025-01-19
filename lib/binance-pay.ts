export async function convertUSDTtoETH(amountInUSDT: number) {
    try {
        // Fetch the current price of ETH in USDT
        const response = await fetch(
            'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'
        )
        const data = await response.json()

        if (!response.ok) {
            throw new Error(`Error fetching price: ${data.msg}`)
        }

        const ethPriceInUSDT = parseFloat(data.price) // Price of 1 ETH in USDT
        const equivalentETH = amountInUSDT / ethPriceInUSDT // Convert USDT to ETH

        return {
            ethPriceInUSDT: ethPriceInUSDT.toPrecision(6),
            equivalentETH: equivalentETH.toPrecision(6),
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error converting USDT to ETH:', error.message)
        } else {
            console.error('Error converting USDT to ETH:', error)
        }
        throw error
    }
}

export async function convertUSDTtoBTC(amountInUSDT: number) {
    try {
        // Fetch the current price of BTC in USDT
        const response = await fetch(
            'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
        )
        const data = await response.json()

        if (!response.ok) {
            throw new Error(`Error fetching price: ${data.msg}`)
        }

        const btcPriceInUSDT = parseFloat(data.price) // Price of 1 BTC in USDT
        const equivalentBTC = amountInUSDT / btcPriceInUSDT // Convert USDT to BTC

        return {
            btcPriceInUSDT: btcPriceInUSDT.toFixed(6), // Limit to 6 decimal places
            equivalentBTC: equivalentBTC.toFixed(6), // Limit to 6 decimal places
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error converting USDT to ETH:', error.message)
        } else {
            console.error('Error converting USDT to ETH:', error)
        }
        throw error
    }
}
