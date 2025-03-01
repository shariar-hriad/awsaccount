'use client'

import { deleteFaq } from '@/app/actions/faq/actions'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { FC } from 'react'

const DeleteFaq: FC<{ id: string }> = ({ id }) => {
    return (
        <Button
            size='icon'
            variant='destructive'
            onClick={async () => await deleteFaq(id)}
        >
            <Trash />
        </Button>
    )
}

export default DeleteFaq
