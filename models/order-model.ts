import { model, models, Schema } from 'mongoose'
import { IProduct } from './product-model'

export interface IOrder {
    firstName: string
    lastName: string
    email: string
    product: IProduct
    createdAt?: string
}

export interface IOrderDoc extends IOrder, Document {}

const OrderSchema = new Schema<IOrder>({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    product: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Order = models.Order || model('Order', OrderSchema)
