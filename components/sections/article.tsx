import { getArticle } from '@/app/actions/article/actions'

const Article = async () => {
    const articles = await getArticle()

    return (
        <article className='py-6'>
            <div className='container'>
                {articles && articles.length >= 1 ? (
                    <div
                        className='prose dark:prose-invert max-w-[100ch] mx-auto'
                        dangerouslySetInnerHTML={{
                            __html: articles[0].content,
                        }}
                    />
                ) : (
                    <p>No Data found!</p>
                )}
            </div>
        </article>
    )
}

export default Article
