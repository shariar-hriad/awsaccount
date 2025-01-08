'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

const EditProduct = ({ slug }: { slug: string }) => {
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={() =>
                router.push(`/dashboard/products/edit-product/${slug}`)
            }
        >
            Edit
        </DropdownMenuItem>
    )
}

export default EditProduct
