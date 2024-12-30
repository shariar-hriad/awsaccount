import { Document, model, models, Schema } from 'mongoose'

// I for interface
export interface IProduct {
    slug: string
    title: string
    price: string
    excerpt: string
    description: string
    image?: string
    category: string
    content: string
    keywords?: string[]
    createdAt?: string
}

export interface IProductDoc extends IProduct, Document {}

// Define the main product schema
const schema = new Schema<IProduct>(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        image: { type: String, default: '/product-placeholder.png' },
        price: { type: String, required: true }, // Store as string for ranges like '$17.00 - $399.00'
        excerpt: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        content: { type: String, required: true },
        keywords: { type: [String], default: [] },
        createdAt: Date,
    },
    {
        timestamps: true,
    }
)

export const Product = models.Product || model<IProduct>('Product', schema)
