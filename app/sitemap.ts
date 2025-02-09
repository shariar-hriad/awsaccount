import type { MetadataRoute } from 'next'

import { getProducts } from './actions/product/actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://awsbulk.com'

    const { products } = await getProducts({})

    const productUrls = products.map((product) => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [
        {
            url: 'https://awsbulk.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...productUrls,
    ]
}
