import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className='p-5'>
            <div className='rounded-lg border bg-card'>
                <div className='p-4 space-y-6'>
                    {/* Header */}
                    <Skeleton className='h-6 w-48' />

                    {/* Title and Slug */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-10 w-full' />
                        </div>
                        <div className='space-y-2'>
                            <Skeleton className='h-4 w-16' />
                            <Skeleton className='h-10 w-full' />
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-10 w-full' />
                        </div>
                        <div className='space-y-2'>
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-10 w-full' />
                        </div>
                    </div>

                    {/* Variations */}
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-10 w-full' />
                    </div>

                    {/* Excerpt */}
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-10 w-full' />
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-32 w-full' />
                    </div>

                    {/* Content */}
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-32 w-full' />
                    </div>

                    {/* Keywords */}
                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-10 w-full' />
                    </div>

                    {/* Submit Button */}
                    <Skeleton className='h-10 w-32' />
                </div>
            </div>
        </div>
    )
}
