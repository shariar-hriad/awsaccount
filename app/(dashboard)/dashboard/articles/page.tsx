import { getArticle } from '@/app/actions/article/actions'
import { Button } from '@/components/ui/button'
import { IArticleDoc } from '@/models/article-model'
import Link from 'next/link'
import ArticlesTable from './_components/articles-tables'

const page = async () => {
    const articles: IArticleDoc[] = await getArticle()

    return (
        <div className='space-y-5 p-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Articles</h1>
                <Link href='/dashboard/articles/create-article'>
                    <Button>Create Article</Button>
                </Link>
            </div>
            <ArticlesTable articles={articles} />
        </div>
    )
}

export default page
