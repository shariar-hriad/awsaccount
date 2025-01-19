import { getArticle } from '@/app/actions/article/actions'

const page = async () => {
    const articles = await getArticle()
    console.log(articles)

    return (
        <div className='space-y-5'>{JSON.parse(JSON.stringify(articles))}</div>
    )
}

export default page
