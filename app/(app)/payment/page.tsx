import { CopyClipboardButton } from '@/components/ui/copy-clipboard-button'

const page = () => {
    return (
        <section className='py-8 lg:py-16'>
            <div className='container'>
                <h1 className='text-2xl font-bold text-center'>
                    Payment Address
                </h1>
                <div className='max-w-sm space-y-4'>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>
                            https://example.com/very-long-url
                        </span>
                        <CopyClipboardButton text='https://example.com/very-long-url' />
                    </div>
                    <div className='flex items-center space-x-2 p-2 border rounded-md'>
                        <span className='flex-grow'>API_KEY_12345</span>
                        <CopyClipboardButton text='API_KEY_12345' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
