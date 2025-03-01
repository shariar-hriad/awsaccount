import { getProductBySlug } from '@/app/actions/product/actions'
import { notFound } from 'next/navigation'
import EditProductForm from '../_components/edit-product-form'

const page = async ({ params }: { params: { slug: string } }) => {
    const product = await getProductBySlug(params.slug)

    if (!product) notFound()

    return (
        <div className='p-5'>
            <EditProductForm product={product} />
        </div>
    )
}

export default page
