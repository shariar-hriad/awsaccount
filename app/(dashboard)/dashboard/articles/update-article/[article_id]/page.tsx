import { getArticleById } from '@/app/actions/article/actions'
import UpdateArticleForm from '../_components/update-article-form'

const page = async ({ params }: { params: { article_id: string } }) => {
    const article = await getArticleById(params.article_id)

    if (!article) {
        return <div className='p-5'>Article not found</div>
    }

    return (
        <div className='p-5'>
            <UpdateArticleForm article={article} />
        </div>
    )
}

export default page
