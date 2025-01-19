import CurrencyList from './_components/currency-list'
import ItemList from './_components/item-list'

const page = () => {
    return (
        <section className='py-8 lg:py-16'>
            <div className='container max-w-5xl'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <div className='p-4 rounded-lg lg:col-span-2 border'>
                        <ItemList />
                    </div>
                    <div className='space-y-5'>
                        <p className='p-3 border rounded-md text-center font-semibold text-primary text-2xl'>
                            Choose Your Currency
                        </p>
                        <CurrencyList />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page
