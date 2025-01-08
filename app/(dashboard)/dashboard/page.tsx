import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
}

export default function Dashboard() {
    return (
        <div className='space-y-5'>
            <div className='grid items-start grid-cols-1 md:grid-cols-2 gap-5'>
                Dashboard
            </div>
        </div>
    )
}
