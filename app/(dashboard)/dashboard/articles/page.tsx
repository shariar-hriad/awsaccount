import { getArticle } from '@/app/actions/article/actions'

const page = async () => {
    const articles = await getArticle()

    return (
        <div className='space-y-5'>
            
        </div>
    )
}

export default page
