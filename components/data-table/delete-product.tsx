'use client'

import { deleteProductById } from '@/app/actions/product/actions'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FC } from 'react'

const DeleteProduct: FC<{ productId: string }> = ({ productId }) => {
    return (
        <DropdownMenuItem
            onClick={async () => await deleteProductById(productId)}
        >
            Delete
        </DropdownMenuItem>
    )
}

export default DeleteProduct
