'use client'

import { deleteArticle } from '@/app/actions/article/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { IArticleDoc } from '@/models/article-model'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

interface ArticlesTableProps {
    articles: IArticleDoc[]
}

const ArticlesTable = ({ articles }: ArticlesTableProps) => {
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        try {
            setIsDeleting(id)
            await deleteArticle(id)
            toast.success('Article deleted successfully')
        } catch (error) {
            toast.error('Failed to delete article')
            console.error(error)
        } finally {
            setIsDeleting(null)
        }
    }

    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article._id as string}>
                            <TableCell>{article.title}</TableCell>
                            <TableCell>{article.createdAt}</TableCell>
                            <TableCell className='text-right'>
                                <Link
                                    href={`/dashboard/articles/update-article/${article._id}`}
                                    className={buttonVariants({
                                        variant: 'ghost',
                                        size: 'icon',
                                    })}
                                >
                                    <Pencil className='w-4 h-4' />
                                </Link>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() =>
                                        handleDelete(article._id as string)
                                    }
                                    disabled={isDeleting === article._id}
                                >
                                    <Trash2 className='w-4 h-4' />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ArticlesTable
