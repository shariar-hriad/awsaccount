'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { IProductVariation } from '@/models/product-model'

interface ISelectProps {
    variations: IProductVariation[]
    setSelectedVariant: (value: string) => void
}

export function SelectScrollable({
    variations,
    setSelectedVariant,
}: ISelectProps) {
    const handleChange = (value: string) => {
        setSelectedVariant(value)
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className='max-w-full w-[380px]'>
                <SelectValue placeholder='Choose an option' />
            </SelectTrigger>
            <SelectContent>
                {variations.map((variation) => (
                    <SelectItem key={variation.credit} value={variation.credit}>
                        {variation.credit} credits
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
