'use server'

import { connectDB } from '@/lib/mongodb'
import { Article, IArticle } from '@/models/article-model'
import { revalidatePath } from 'next/cache'

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

// get article by id
export const getArticleById = async (id: string) => {
    try {
        await connectDB()
        const article = await Article.findById(id).lean()

        return JSON.parse(JSON.stringify(article))
    } catch (error) {
        console.log(error)
    }
}

// update article
export const updateArticle = async (id: string, article: IArticle) => {
    try {
        await connectDB()
        const updatedArticle = await Article.findByIdAndUpdate(id, article, {
            new: true,
        })

        revalidatePath('/')
        revalidatePath('/dashboard/articles')

        return JSON.parse(JSON.stringify(updatedArticle))
    } catch (error) {
        console.log(error)
    }
}

// delete article
export const deleteArticle = async (id: string) => {
    try {
        await connectDB()

        await Article.findByIdAndDelete(id)

        revalidatePath('/dashboard/articles')
        revalidatePath('/')

        return JSON.parse(
            JSON.stringify({ message: 'Article deleted successfully' })
        )
    } catch (error) {
        console.log(error)
    }
}
