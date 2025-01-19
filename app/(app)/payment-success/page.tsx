import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function page({
    searchParams,
}: {
    searchParams: { amount: number }
}) {
    // Mock order details
    const orderDetails = {
        orderId: '#12345',
        total: `${searchParams.amount}`,
        date: new Date().toLocaleDateString(),
    }

    return (
        <div className='flex items-center justify-center py-8 lg:py-16 '>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <div className='flex items-center justify-center mb-4'>
                        <CheckCircle className='h-12 w-12 text-green-500' />
                    </div>
                    <CardTitle className='text-2xl font-bold text-center'>
                        Payment Successful!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        <p className='text-center text-gray-600'>
                            Thank you for your purchase. Your order has been
                            processed successfully.
                        </p>
                        <div className='p-4 rounded-lg'>
                            <h3 className='font-semibold mb-2'>
                                Order Details
                            </h3>
                            <div className='grid grid-cols-2 gap-2 text-sm'>
                                <span className='text-gray-600'>Order ID:</span>
                                <span>{orderDetails.orderId}</span>
                                <span className='text-gray-600'>Total:</span>
                                <span>{orderDetails.total}</span>
                                <span className='text-gray-600'>Date:</span>
                                <span>{orderDetails.date}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href='/' className='w-full'>
                        <Button className='w-full'>Return to Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
