import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

import { FC } from 'react'

type ProductAccordionProps = {
    description: string
}

const ProductAccordion: FC<ProductAccordionProps> = ({ description }) => {
    return (
        <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                    <div
                        className='prose dark:prose-invert'
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default ProductAccordion
