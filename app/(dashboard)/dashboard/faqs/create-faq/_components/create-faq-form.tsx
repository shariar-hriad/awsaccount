'use client'

import { createFaq } from '@/app/actions/faq/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { toast } from 'sonner'

export interface FaqFormData {
    title: string
    description: string
}

const CreateFaqForm = () => {
    const initialFormData: FaqFormData = {
        title: '',
        description: '',
    }

    const [formData, setFormData] = useState<FaqFormData>(initialFormData)
    const [errors, setErrors] = useState<Partial<FaqFormData>>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name as keyof FaqFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }
    // validate form
    const validateForm = (): boolean => {
        const newErrors: Partial<FaqFormData> = {}

        if (!formData.title) newErrors.title = 'Faq title is required'
        if (!formData.description)
            newErrors.description = 'Faq description is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    // handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm) return

        try {
            setIsSubmitting(true)
            await createFaq(formData)
            toast.success('Faq created successfully')
            setFormData(initialFormData)
            setErrors({})
        } catch (error) {
            toast.error('Failed to create faq. Please try again.')
            console.error('Failed to create faq: ', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Faq</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Title */}
                    <div className='space-y-2'>
                        <Label htmlFor='title'>Faq Title</Label>
                        <Input
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder='Faq Title'
                        />
                        {errors.title && (
                            <p className='text-sm text-red-500'>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <Label htmlFor='description'>Faq Description</Label>
                        <Input
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder='Faq Description'
                        />
                        {errors.description && (
                            <p className='text-sm text-red-500'>
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Create Faq'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateFaqForm
