'use server'

import { connectDB } from '@/lib/mongodb'
import { IProduct, IProductDoc, Product } from '@/models/product-model'
import { revalidatePath } from 'next/cache'

// Create Product
export const createProduct = async (product: IProduct) => {
    try {
        await connectDB()
        const newProduct = await Product.create(product)

        return JSON.parse(JSON.stringify(newProduct))
    } catch (err) {
        console.log(err)
    }
}

// Get Products
export const getProducts = async (
    query: Record<string, string | number | boolean> = {},
    page: number = 1,
    limit: number = 100
) => {
    try {
        await connectDB()

        const data = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })

        const products: IProductDoc[] = JSON.parse(JSON.stringify(data))

        const totalProducts = await Product.countDocuments()
        const totalPages = Math.ceil(totalProducts / limit)

        return { products, totalProducts, totalPages }
    } catch (err) {
        console.log(err)
        return { products: [], totalProducts: 0, totalPages: 0 }
    }
}

// Get Product By Slug
export const getProductBySlug = async (slug: string) => {
    try {
        await connectDB()
        const product = await Product.findOne({ slug })

        return JSON.parse(JSON.stringify(product))
    } catch (err) {
        console.log(err)
    }
}

// Update Product By Slug
export const updateProductBySlug = async (slug: string, product: IProduct) => {
    try {
        await connectDB()
        const updatedProduct = await Product.findOneAndUpdate(
            { slug },
            product,
            { new: true }
        )
        revalidatePath('/dashboard/products')
        revalidatePath(`/dashboard/products/edit-product/${slug}`)
        return JSON.parse(JSON.stringify(updatedProduct))
    } catch (err) {
        console.log(err)
    }
}

// Delete Product By Id
export async function deleteProductById(productId: string) {
    try {
        await connectDB()
        await Product.findByIdAndDelete(productId)

        revalidatePath('/dashboard/products')
    } catch (err) {
        console.log(err)
    }
}
