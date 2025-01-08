import { getProductBySlug } from '@/app/actions/product/actions'
import SingleProduct from '@/components/product/single-product'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { IProductDoc } from '@/models/product-model'
import { notFound } from 'next/navigation'

export default async function ProductPage({
    params,
}: {
    params: { slug: string }
}) {
    const product: IProductDoc = await getProductBySlug(params.slug)
    if (!product) return notFound()

    return (
        <section className='py-10'>
            <div className='container'>
                <div className='py-5'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbLink href='#'>
                                    Product
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {product?.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <SingleProduct product={product} />
            </div>
        </section>
    )
}
