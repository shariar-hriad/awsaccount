'use server'

import { connectDB } from '@/lib/mongodb'
import { IOrder, Order } from '@/models/order-model'
import { revalidatePath } from 'next/cache'

export async function createOrder(order: IOrder) {
    try {
        await connectDB()
        const newOrder = await Order.create(order)
        revalidatePath('/dashboard')
        return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
        console.log(error)
    }
}

// Get All Orders
export async function getOrders() {
    try {
        await connectDB()
        const orders = await Order.find()
        return JSON.parse(JSON.stringify(orders))
    } catch (error) {
        console.log(error)
    }
}
