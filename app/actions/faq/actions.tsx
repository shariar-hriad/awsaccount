'use server'

import { connectDB } from '@/lib/mongodb'
import { Faq, IFaq } from '@/models/faq-model'
import { revalidatePath } from 'next/cache'

// Create Faq
export const createFaq = async (faq: IFaq) => {
    try {
        await connectDB()
        const newFaq = await Faq.create(faq)

        revalidatePath('/')
        return JSON.parse(JSON.stringify(newFaq))
    } catch (error) {
        console.log(error)
    }
}

// Get Faqs
export const getFaqs = async () => {
    try {
        await connectDB()
        const faqs = await Faq.find({}).lean()

        return JSON.parse(JSON.stringify(faqs))
    } catch (error) {
        console.log(error)
    }
}

// Edit Faq
export const editFaq = async (id: string, data: IFaq) => {
    try {
        await connectDB()
        const newFaq = await Faq.findByIdAndUpdate(id, data, { new: true })

        revalidatePath('/')
        revalidatePath('/dashboard/faqs')

        return JSON.parse(JSON.stringify(newFaq))
    } catch (error) {
        console.log(error)
    }
}

// Delete Faq
export const deleteFaq = async (id: string) => {
    try {
        await connectDB()
        await Faq.findByIdAndDelete(id)
        revalidatePath('/')
        revalidatePath('/dashboard/faqs')
    } catch (error) {
        console.log(error)
    }
}
