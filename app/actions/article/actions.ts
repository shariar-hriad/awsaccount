'use server'

import { connectDB } from '@/lib/mongodb'
import { Article, IArticle } from '@/models/article-model'

// create article
export const createArticle = async (article: IArticle) => {
    try {
        await connectDB()
        const newArticle = await Article.create(article)

        return JSON.parse(JSON.stringify(newArticle))
    } catch (err) {
        console.log(err)
    }
}

// get article
export const getArticle = async () => {
    try {
        await connectDB()

        const articles = await Article.find({}).lean()

        return JSON.parse(JSON.stringify(articles))
    } catch (error) {
        console.log(error)
    }
}
