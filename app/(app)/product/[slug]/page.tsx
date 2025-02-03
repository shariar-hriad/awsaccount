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
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const product = await getProductBySlug((await params).slug)
        if (!product) {
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found.',
            }
        }

        const previousImages = (await parent).openGraph?.images || []

        return {
            title: `${product.title} - AWS Account for Sale | AWSBulk`,
            description: `Buy verified ${product.title}. Premium AWS accounts available at competitive prices. Secure, reliable, and instant delivery.`,
            keywords: [
                'Buy AWS Account',
                product.title,
                'verified aws account',
                'aws account for sale',
                'premium aws accounts',
            ],
            openGraph: {
                title: product.title,
                description:
                    product.description ||
                    'Premium AWS account for sale with instant delivery.',
                url: `https://www.awsbulk.com/product/${product.slug}`,
                siteName: 'AWSBulk',
                images: [
                    {
                        url: product.image || '/default-product-image.jpg',
                        alt: product.title,
                    },
                    ...previousImages,
                ],
                locale: 'en_US',
                type: 'website',
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error)
        return {
            title: 'Error Loading Product',
            description: 'There was an error loading the product information.',
        }
    }
}

export default async function ProductPage({ params }: Props) {
    const product: IProductDoc = await getProductBySlug((await params).slug)

    if (!product) {
        return (
            <section className='py-4 lg:py-8'>
                <div className='container'>
                    <h1>Product Not Found</h1>
                    <p>The requested product could not be found.</p>
                </div>
            </section>
        )
    }

    return (
        <section className='py-4 lg:py-8'>
            <div className='container space-y-8'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/products'>
                                Products
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <SingleProduct product={product} />
            </div>
        </section>
    )
}
