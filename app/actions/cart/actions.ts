'use server'

import { IProductVariation } from '@/models/product-model'
import { Schema } from 'mongoose'

export interface ICartProps {
    category: string
    productId: Schema.Types.ObjectId
    selectedVariant: IProductVariation
    price: number
}
