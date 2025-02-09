import { CopyClipboardButton } from '@/components/ui/copy-clipboard-button'

const page = () => {
    return (
        <section className='py-8 lg:py-16'>
            <div className='container space-y-8'>
                <h1 className='text-2xl font-bold text-center'>
                    Payment Address
                </h1>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>BTC Address</span>

                        <CopyClipboardButton text='TE4QQx4WxxvC3nHCFrYUYmTUu7fByi7H5G' />
                    </div>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>Eth address</span>
                        <CopyClipboardButton text='TE4QQx4WxxvC3nHCFrYUYmTUu7fByi7H5G' />
                    </div>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>Usdt trc20 address</span>
                        <CopyClipboardButton text='TE4QQx4WxxvC3nHCFrYUYmTUu7fByi7H5G' />
                    </div>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>Usdt erc20 address</span>
                        <CopyClipboardButton text='TE4QQx4WxxvC3nHCFrYUYmTUu7fByi7H5G' />
                    </div>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>Bnb bep20 address</span>
                        <CopyClipboardButton text='TE4QQx4WxxvC3nHCFrYUYmTUu7fByi7H5G' />
                    </div>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>Binance Pay Id</span>
                        <CopyClipboardButton text='538927693' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
