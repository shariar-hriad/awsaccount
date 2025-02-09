import { getOrders } from '@/app/actions/order/actions'
import { IOrderDoc } from '@/models/order-model'

export default async function page() {
    const orders: IOrderDoc[] = await getOrders()

    return (
        <div className='p-5 space-y-5'>
            <h1 className='text-2xl font-bold mb-6'>Orders</h1>

            <div className='rounded-md border'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Order ID
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Name
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Email
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {orders?.map((order: IOrderDoc) => (
                            <tr key={order._id as string}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                    {order._id as string}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {order.firstName} {order.lastName}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {order.email}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {order.createdAt
                                        ? new Date(
                                              order.createdAt
                                          ).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
