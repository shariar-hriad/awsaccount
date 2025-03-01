'use client'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })
import { createProduct } from '@/app/actions/product/actions'
import MediaUploader from '@/components/product/media-uploader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { generateSlug } from '@/lib/utils'
import { IProductVariation } from '@/models/product-model'
import { Trash } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface ProductFormData {
    slug: string
    title: string
    priceRange: {
        min: number
        max: number
    }
    priceRangeError?: string
    variations: IProductVariation[]
    excerpt: string
    description: string
    image: string
    category: string
    content: string
    keywords: string[]
    variationsError?: string
    keywordsError?: string
}

export default function CreateProductForm() {
    const initialFormData: ProductFormData = {
        slug: '',
        title: '',
        priceRange: { min: 0, max: 0 },
        variations: [{ amount: 0, credit: '' }],
        excerpt: '',
        description: '',
        image: '',
        category: '',
        content: '',
        keywords: [],
    }

    const [formData, setFormData] = useState<ProductFormData>(initialFormData)
    const [errors, setErrors] = useState<Partial<ProductFormData>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // useEffect for generating slug from title
    useEffect(() => {
        setFormData((prev) => ({ ...prev, slug: generateSlug(formData.title) }))
    }, [formData.title])
    // handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        if (name === 'min' || name === 'max') {
            setFormData((prev) => ({
                ...prev,
                priceRange: {
                    ...prev.priceRange,
                    [name]: parseFloat(value) || 0, // Parse numeric values
                },
            }))
            return
        }

        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name as keyof ProductFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }
    // handle variation change
    const handleVariationChange = (
        index: number,
        field: 'amount' | 'credit',
        value: string
    ) => {
        const newVariations = [...formData.variations]
        if (field === 'amount') {
            newVariations[index][field] = parseFloat(value) || 0
        } else {
            newVariations[index][field] = value // Keep credits as string
        }
        setFormData((prev) => ({ ...prev, variations: newVariations }))
    }
    // handle content change
    const handleContentChange = (content: string) => {
        setFormData((prev) => ({ ...prev, content }))
        if (errors.content) {
            setErrors((prev) => ({ ...prev, content: undefined }))
        }
    }
    // handle image upload
    const handleImageUpload = (url: string) => {
        setFormData((prev) => ({ ...prev, image: url }))
        if (errors.image) {
            setErrors((prev) => ({ ...prev, image: undefined }))
        }
    }
    // handle description change
    const handleDescriptionChange = (description: string) => {
        setFormData((prev) => ({ ...prev, description }))
        if (errors.description) {
            setErrors((prev) => ({ ...prev, description: undefined }))
        }
    }
    // validate form
    const validateForm = (): boolean => {
        const newErrors: Partial<ProductFormData> = {}

        if (!formData.slug) newErrors.slug = 'Slug is required'
        if (!formData.title) newErrors.title = 'Title is required'
        if (!formData.priceRange.min || !formData.priceRange.max)
            newErrors.priceRangeError = 'Price range is required'
        if (formData.variations.length === 0)
            newErrors.variationsError = 'At least one variation is required'
        if (
            formData.variations.some(
                (variation) =>
                    variation.amount <= 0 || variation.credit.trim() === ''
            )
        ) {
            newErrors.variationsError =
                'All variations must have valid amount and credit'
        }
        if (!formData.excerpt) newErrors.excerpt = 'Excerpt is required'
        if (!formData.description)
            newErrors.description = 'Description is required'
        if (!formData.image) newErrors.image = 'Image URL is required'
        if (!formData.category) newErrors.category = 'Category is required'
        if (!formData.content) newErrors.content = 'Content is required'
        if (formData.keywords.length === 0)
            newErrors.keywordsError = 'At least one keyword is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    // handle add variation
    const handleAddVariation = () => {
        setFormData((prev) => ({
            ...prev,
            variations: [...prev.variations, { amount: 0, credit: '' }],
        }))
    }
    // handle remove variation
    const handleRemoveVariation = (index: number) => {
        const updatedVariations = formData.variations.filter(
            (_, i) => i !== index
        )
        setFormData((prev) => ({ ...prev, variations: updatedVariations }))
    }
    // handle keyword change
    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keywordsArray = e.target.value
            .split(',')
            .map((keyword) => keyword.trim())
        setFormData((prev) => ({ ...prev, keywords: keywordsArray }))
    }
    // handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            setIsSubmitting(true)
            await createProduct(formData)
            toast.success('Product created successfully!')
            setFormData(initialFormData) // Reset form to initial state
            setErrors({}) // Clear any errors
        } catch (error) {
            toast.error('Failed to create product. Please try again.')
            console.error('Failed to create product: ', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Title and Slug */}
                    <div className='grid grid-cols-2 gap-4'>
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
                        <div className='space-y-2'>
                            <Label htmlFor='slug'>Slug</Label>
                            <Input
                                id='slug'
                                name='slug'
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder='macbook-pro-m1'
                            />
                            {errors.slug && (
                                <p className='text-sm text-red-500'>
                                    {errors.slug}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Price Range & Category */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex gap-2 items-center'>
                            <div className='space-y-2 flex-grow'>
                                <Label htmlFor='min'>Minimum Price</Label>
                                <Input
                                    id='min'
                                    name='min'
                                    value={formData.priceRange.min}
                                    onChange={handleInputChange}
                                    min={1}
                                />
                                {errors.priceRange && (
                                    <p className='text-sm text-red-500'>
                                        {errors.priceRangeError}
                                    </p>
                                )}
                            </div>
                            <div className='space-y-2 flex-grow'>
                                <Label htmlFor='max'>Maximum Price</Label>
                                <Input
                                    id='max'
                                    name='max'
                                    value={formData.priceRange.max}
                                    onChange={handleInputChange}
                                    max={10000}
                                />
                                {errors.priceRange && (
                                    <p className='text-sm text-red-500'>
                                        {errors.priceRangeError}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='category'>Category</Label>
                            <Input
                                id='category'
                                name='category'
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder='Electronics'
                            />
                            {errors.category && (
                                <p className='text-sm text-red-500'>
                                    {errors.category}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Variations */}
                    <div className='space-y-2'>
                        <Label>Variations</Label>

                        <div className='flex flex-wrap gap-4'>
                            {formData.variations.map((variation, index) => (
                                <div
                                    key={index}
                                    className='flex space-x-2 mt-2'
                                >
                                    <Input
                                        type='number'
                                        value={variation.amount}
                                        onChange={(e) =>
                                            handleVariationChange(
                                                index,
                                                'amount',
                                                e.target.value
                                            )
                                        }
                                        placeholder='Price'
                                        className='w-24'
                                    />
                                    <Input
                                        type='text'
                                        value={variation.credit}
                                        onChange={(e) =>
                                            handleVariationChange(
                                                index,
                                                'credit',
                                                e.target.value
                                            )
                                        }
                                        placeholder='Credits'
                                        className=''
                                    />
                                    <Button
                                        type='button'
                                        size='icon'
                                        variant='outline'
                                        onClick={() =>
                                            handleRemoveVariation(index)
                                        }
                                        className='text-red-500 shrink-0'
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type='button'
                                variant='outline'
                                size='sm'
                                className='mt-2'
                                onClick={handleAddVariation}
                            >
                                Add Variation
                            </Button>
                            {errors.variationsError && (
                                <p className='text-sm text-red-500'>
                                    {errors.variationsError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Excerpt & Image */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='excerpt'>Excerpt</Label>
                            <Textarea
                                id='excerpt'
                                name='excerpt'
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                placeholder='Brief description'
                                className='min-h-[250px]'
                            />
                            {errors.excerpt && (
                                <p className='text-sm text-red-500'>
                                    {errors.excerpt}
                                </p>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='image'>Upload product image</Label>
                            <MediaUploader onUpload={handleImageUpload} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <Label htmlFor='description'>Description</Label>
                        <Editor
                            model={formData.description}
                            onModelChange={handleDescriptionChange}
                            storageKey='product-description'
                        />

                        {errors.description && (
                            <p className='text-sm text-red-500'>
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div className='space-y-2'>
                        <Label htmlFor='content'>Content</Label>

                        <Editor
                            model={formData.content}
                            onModelChange={handleContentChange}
                            storageKey='product-content'
                        />
                        {errors.content && (
                            <p className='text-sm text-red-500'>
                                {errors.content}
                            </p>
                        )}
                    </div>

                    {/* Keywords */}
                    <div className='space-y-2'>
                        <Label htmlFor='keywords'>Keywords</Label>
                        <Input
                            id='keywords'
                            name='keywords'
                            value={formData.keywords.join(', ')}
                            onChange={handleKeywordsChange}
                            placeholder='laptop, apple, macbook, M1, electronics'
                        />
                        {errors.keywords && (
                            <p className='text-sm text-red-500'>
                                {errors.keywords}
                            </p>
                        )}
                    </div>

                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Create Product'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
