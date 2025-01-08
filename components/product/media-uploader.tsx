'use client'

import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'

export default function MediaUploader({
    onUpload,
}: {
    onUpload: (url: string) => void
}) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // Handle image file selection and convert it to base64
    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'buycloudshop') // Ensure this matches your Cloudinary upload preset

        try {
            setLoading(true)
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dhqz7sqzh/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )
            const data = await res.json()

            if (data.secure_url) {
                setPreviewUrl(data.secure_url)
                onUpload(data.secure_url) // Pass the image URL to the parent component
            }
        } catch (err) {
            console.error('Image upload failed:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = () => {
        setPreviewUrl(null)
        onUpload('')
    }

    return (
        <Card className='w-full max-w-lg'>
            <CardContent className='pt-6'>
                <div className='space-y-4'>
                    <div className='flex items-center space-x-2'>
                        <Input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            disabled={loading}
                            className='flex-grow'
                        />
                        {previewUrl && (
                            <Button
                                type='button'
                                variant='destructive'
                                size='icon'
                                onClick={handleRemove}
                                disabled={loading}
                            >
                                <X className='h-4 w-4' />
                            </Button>
                        )}
                    </div>
                    {loading && (
                        <p className='text-sm text-center text-muted-foreground'>
                            Uploading...
                        </p>
                    )}
                    {previewUrl && (
                        <div className='relative'>
                            <Image
                                src={previewUrl}
                                alt='Picture of the author'
                                sizes='100vw'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                width={500}
                                height={300}
                            />
                        </div>
                    )}
                    {!previewUrl && !loading && (
                        <div className='flex items-center justify-center w-full h-32 bg-muted rounded-md'>
                            <Upload className='h-8 w-8 text-muted-foreground' />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
