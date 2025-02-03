import { getArticle } from '@/app/actions/article/actions'
import { IArticleDoc } from '@/models/article-model'
import ArticlesTable from './_components/articles-tables'

const page = async () => {
    const articles: IArticleDoc[] = await getArticle()

    return (
        <div className='space-y-5 p-5'>
            <ArticlesTable articles={articles} />
        </div>
    )
}

export default page
