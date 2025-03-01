import { getFaqs } from '@/app/actions/faq/actions'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { IFaqDoc } from '@/models/faq-model'

const Faq = async () => {
    const faqs: IFaqDoc[] = await getFaqs()
    if (!faqs) {
        return (
            <div className='p-5'>
                <p>No Faq found!</p>
            </div>
        )
    }

    return (
        <section className='py-8 lg:py-16 border-t'>
            <div className='container space-y-8'>
                <div className='text-center'>
                    <h2 className='text-2xl lg:text-4xl font-semibold'>Faq.</h2>
                </div>

                <div className='mx-auto w-full max-w-3xl'>
                    <FaqAccordion faqs={faqs} />
                </div>
            </div>
        </section>
    )
}

export default Faq

export function FaqAccordion({ faqs }: { faqs: IFaqDoc[] }) {
    return (
        <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq) => (
                <AccordionItem
                    key={faq._id as string}
                    value={faq._id as string}
                >
                    <AccordionTrigger>{faq.title}</AccordionTrigger>
                    <AccordionContent>{faq.description}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
