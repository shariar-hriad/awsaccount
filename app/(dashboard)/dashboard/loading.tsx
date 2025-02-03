import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className='p-5'>
            <Skeleton className='h-10 w-48' />
        </div>
    )
}
