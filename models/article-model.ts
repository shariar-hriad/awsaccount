import { Document, model, models, Schema } from 'mongoose'

export interface IArticle {
    title: string
    content: string
    createdAt?: string
}

export interface IArticleDoc extends IArticle, Document {}

const ArticleSchema = new Schema<IArticle>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

export const Article = models.Article || model('Article', ArticleSchema)
