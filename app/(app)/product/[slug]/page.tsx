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
import { IProduct, IProductDoc } from '@/models/product-model'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug

    const product: IProduct = await getProductBySlug(slug)

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: 'Buy AWS Account – 100% Verified AWS Accounts for Sale',
        description:
            'Are you looking forward to buy AWS account? Take a look at the services we offer and get your hands on a reliable AWS account for cheap.',
        keywords: [
            'Buy AWS Account',
            'buy aws account',
            'buy amazon aws account',
            'aws account sale',
            'aws account for sale',
        ],
        openGraph: {
            title: product.title,
            description:
                'Are you looking forward to buy AWS account? Take a look at the services we offer and get your hands on a reliable AWS account for cheap.',
            url: `https://www.awsbulk.com/product/${product.slug}`,
            siteName: 'Awsbulk',
            images: [
                {
                    url: product.image!,
                },
                ...previousImages,
            ],
            locale: 'en_US',
            type: 'website',
        },
    }
}

export default async function ProductPage({ params }: Props) {
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
