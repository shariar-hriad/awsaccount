'use client'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })
import { createArticle } from '@/app/actions/article/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface ArticleFormData {
    title: string
}

const CreateArticleForm = () => {
    const [content, setContent] = useState<string>('')
    // const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const initialFormData: ArticleFormData = {
        title: '',
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

    // const handleImageUpload = async (
    //     e: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     const file = e.target.files?.[0]
    //     if (!file) return

    //     const formData = new FormData()
    //     formData.append('file', file)
    //     formData.append('upload_preset', 'awsbulk') // Ensure this matches your Cloudinary upload preset

    //     try {
    //         setLoading(true)
    //         const res = await fetch(
    //             `https://api.cloudinary.com/v1_1/dhqz7sqzh/image/upload`,
    //             {
    //                 method: 'POST',
    //                 body: formData,
    //             }
    //         )
    //         const data = await res.json()

    //         if (data.secure_url) {
    //             // setPreviewUrl(data.secure_url)
    //             // onUpload(data.secure_url) // Pass the image URL to the parent component
    //             console.log(data.secure_url)
    //         }
    //     } catch (err) {
    //         console.error('Image upload failed:', err)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

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
            await createArticle(formData)
            toast.success('Article created successfully')
            setFormData(initialFormData)
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

                        <Editor value={content} onChange={setContent} />

                        {/* {errors.content && (
                            <p className='text-sm text-red-500'>
                                {errors.content}
                            </p>
                        )} */}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className='animate-spin' />
                                Please wait
                            </>
                        ) : (
                            'Create Article'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateArticleForm
