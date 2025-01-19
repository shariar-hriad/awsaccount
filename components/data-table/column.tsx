'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { timeAgo } from '@/lib/utils'
import { IProductDoc } from '@/models/product-model'
import { ColumnDef } from '@tanstack/react-table'
import { DollarSign, MoreHorizontal } from 'lucide-react'
import { DataTableColumnHeader } from './data-table-column-header'
import DeleteProduct from './delete-product'
import EditProduct from './edit-product'

export const columns: ColumnDef<IProductDoc>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: '_id',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='ID' />
        ),
        cell: ({ row }) => (
            <div className='w-[80px] truncate'>{row.getValue('_id')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: 'image',
    //     header: 'Image',
    //     cell: ({ row }) => {
    //         const product = row.original
    //         return (
    //             <div className='flex items-center justify-center'>
    //                 <Image
    //                     src={product.image || '/product-placeholder.png'}
    //                     alt={product.title}
    //                     width={30}
    //                     height={30}
    //                     className='object-cover rounded'
    //                     priority
    //                 />
    //             </div>
    //         )
    //     },
    //     enableSorting: false,
    // },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Product Name' />
        ),
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue('title')}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: 'priceRange',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Price' />
        ),
        cell: ({ row }) => {
            const priceRange = row.getValue('priceRange') as {
                min: number
                max: number
            }

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] font-medium flex items-center'>
                        <DollarSign className='w-3 h-3' /> {priceRange.min} -
                        <DollarSign className='w-3 h-3' />
                        {priceRange.max}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Category' />
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Created At' />
        ),
        cell: ({ row }) => {
            const product = row.original

            return <>{timeAgo(product.createdAt || '')}</>
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditProduct slug={product.slug} />
                        <DropdownMenuSeparator />
                        <DeleteProduct productId={product._id as string} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
