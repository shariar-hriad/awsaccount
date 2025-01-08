'use client'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

interface ArticleFormData {
    title: string
    content: string
}

const CreateArticleForm = () => {
    const initialFormData: ArticleFormData = {
        title: '',
        content: '',
    }

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)

        console.log(formData)
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
                            storageKey='article-content'
                        />
                        {errors.content && (
                            <p className='text-sm text-red-500'>
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Create Article'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateArticleForm
