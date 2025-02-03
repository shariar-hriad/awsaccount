import { getProducts } from '@/app/actions/product/actions'
import { columns } from '@/components/data-table/column'
import { DataTable } from '@/components/data-table/data-table'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

const page = async () => {
    const { products } = await getProducts()

    return (
        <div className='space-y-5'>
            <Link
                className={buttonVariants()}
                href='/dashboard/products/create-product'
            >
                Create Product
            </Link>
            <Suspense fallback={<p>Product table is loading...</p>}>
                <DataTable columns={columns} data={products} />
            </Suspense>
        </div>
    )
}

export default page
