import { Document, model, models, Schema } from 'mongoose'

// I for interface
export interface IProductVariation {
    credit: string // e.g., '5k', '8k'
    amount: number // e.g., 500, 800
}

export interface IProduct {
    slug: string
    title: string
    priceRange: {
        min: number
        max: number
    }
    variations: IProductVariation[] // Array of price-credit pairs
    excerpt: string
    description: string
    image?: string
    category: string
    content: string
    keywords?: string[]
    createdAt?: string
    updatedAt?: string
}

export interface IProductDoc extends IProduct, Document {}

// Define the price schema
const ProductVariationSchema = new Schema<IProductVariation>({
    credit: { type: String, required: true }, // e.g., '5k', '8k'
    amount: { type: Number, required: true }, // e.g., 500, 800
})

// Define the main product schema
const ProductSchema = new Schema<IProduct>(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        priceRange: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
        },
        variations: { type: [ProductVariationSchema], required: true }, // Array of price-credit pairs
        excerpt: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        category: { type: String, required: true },
        content: { type: String, required: true },
        keywords: { type: [String], default: [] },
    },
    {
        timestamps: true,
    }
)

// Add index for frequent queries
ProductSchema.index({ category: 1 })

export const Product =
    models.Product || model<IProduct>('Product', ProductSchema)
