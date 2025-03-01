import { getFaqs } from '@/app/actions/faq/actions'
import { IFaqDoc } from '@/models/faq-model'
import DeleteFaq from './_components/delete-faq'
import EditFaq from './_components/edit-faq'

const page = async () => {
    const faqs: IFaqDoc[] = await getFaqs()

    if (!faqs) {
        return (
            <div className='p-5'>
                <p>No Faq found!</p>
            </div>
        )
    }

    return (
        <div className='p-5 space-y-5'>
            <h2 className='font-semibold text-xl lg:text-2xl'>Faqs.</h2>
            {faqs.map((faq) => (
                <div
                    key={faq._id as string}
                    className='flex gap-5 justify-between items-start border p-5 rounded-md'
                >
                    <div className='space-y-2'>
                        <h3 className='font-medium text-2xl'>{faq.title}</h3>
                        <p className='text-muted-foreground'>
                            {faq.description}
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <EditFaq faq={faq} />
                        <DeleteFaq id={faq._id as string} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default page
