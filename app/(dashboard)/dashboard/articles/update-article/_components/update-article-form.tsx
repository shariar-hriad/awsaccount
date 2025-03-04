'use client'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })
import { updateArticle } from '@/app/actions/article/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IArticleDoc } from '@/models/article-model'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface ArticleFormData {
    title: string
    content: string
}

const UpdateArticleForm = ({ article }: { article: IArticleDoc }) => {
    const initialFormData: ArticleFormData = {
        title: article.title,
        content: article.content,
    }
    const router = useRouter()
    const [errors, setErrors] = useState<Partial<ArticleFormData>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] =
        React.useState<ArticleFormData>(initialFormData)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleContentChange = (content: string) => {
        setFormData((prev) => ({ ...prev, content }))
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<ArticleFormData> = {}

        if (!formData.title) newErrors.title = 'Title is required'
        if (!formData.content) newErrors.content = 'Content is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            await updateArticle(article._id as string, formData)
            toast.success('Successfully created')
            router.refresh()
            router.push('/dashboard/articles')
        } catch (error) {
            toast.error('Failed to create article. Please try again.')
            console.error('Failed to create article:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Article</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='title'>Title</Label>
                        <Input
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder='MacBook Pro M1'
                        />
                        {errors.title && (
                            <p className='text-sm text-red-500'>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className='space-y-2'>
                        <Label htmlFor='content'>Content</Label>

                        <Editor
                            model={formData.content}
                            onModelChange={handleContentChange}
                        />
                        {errors.content && (
                            <p className='text-sm text-red-500'>
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Update Article'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default UpdateArticleForm
