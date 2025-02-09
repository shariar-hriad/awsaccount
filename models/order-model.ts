import { Document, model, models, Schema } from 'mongoose'

export interface IOrder {
    firstName: string
    lastName: string
    email: string
    createdAt?: Date
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Order = models.Order || model('Order', OrderSchema)
