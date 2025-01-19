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

export default async function ProductPage({
    params,
}: {
    params: { slug: string }
}) {
    const product: IProductDoc = await getProductBySlug(params.slug)

    return (
        <section className='py-4 lg:py-8'>
            <div className='container space-y-8'>
                {product ? (
                    <>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/'>
                                        Home
                                    </BreadcrumbLink>
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
                        <SingleProduct product={product} />
                    </>
                ) : (
                    <p>No Product found!</p>
                )}
            </div>
        </section>
    )
}
