export default function Loading() {
    return (
        <div className='p-5 w-full'>
            <div className='space-y-3'>
                <div className='h-8 w-48 bg-muted animate-pulse rounded' />
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='p-4 border rounded-lg bg-card'>
                            <div className='h-4 w-24 bg-muted animate-pulse rounded mb-3' />
                            <div className='h-8 w-32 bg-muted animate-pulse rounded' />
                        </div>
                    ))}
                </div>
                <div className='rounded-lg border bg-card'>
                    <div className='p-4 space-y-3'>
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className='h-4 w-full bg-muted animate-pulse rounded'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
