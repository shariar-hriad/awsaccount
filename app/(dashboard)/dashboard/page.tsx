import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
}

const DummyCard = ({ title }: { title: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
                <Skeleton className='h-4 w-[150px]' />
            </div>
        </CardContent>
    </Card>
)

export default function Dashboard() {
    return (
        <div className='space-y-5'>
            <div className='grid items-start grid-cols-1 md:grid-cols-2 gap-5'>
                <DummyCard title='Total Products' />
                <DummyCard title='Total Orders' />
                <DummyCard title='Total Revenue' />
                <DummyCard title='Total Customers' />
            </div>
        </div>
    )
}
