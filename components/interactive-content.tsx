'use client'

import { useState } from 'react'

type InteractiveContentProps = {
    text: string | undefined
    limit: number
}

const InteractiveContent = ({ text, limit }: InteractiveContentProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <p className='mt-4 sm:text-xl/relaxed'>
            {isExpanded ? text : `${text?.substring(0, limit)}... `}
            {!isExpanded && (
                <button
                    onClick={toggleExpanded}
                    className='text-blue-500 hover:text-blue-700 inline'
                >
                    See More
                </button>
            )}

            {isExpanded && (
                <button
                    onClick={toggleExpanded}
                    className='mt-4 text-blue-500 hover:text-blue-700'
                >
                    See Less
                </button>
            )}
        </p>
    )
}

export default InteractiveContent
