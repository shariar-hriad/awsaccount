import { Document, model, models, Schema } from 'mongoose'

export interface IFaq {
    title: string
    description: string
}

export interface IFaqDoc extends IFaq, Document {}

const FaqSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

export const Faq = models.Faq || model('Faq', FaqSchema)
