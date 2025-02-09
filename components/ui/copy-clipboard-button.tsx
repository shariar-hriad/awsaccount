'use client'

import { Check, Copy } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface CopyButtonProps {
    text: string
}

export function CopyClipboardButton({ text }: CopyButtonProps) {
    const [isCopied, setIsCopied] = React.useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={copyToClipboard}
                        className='h-8 w-8'
                    >
                        {isCopied ? (
                            <Check className='h-4 w-4' />
                        ) : (
                            <Copy className='h-4 w-4' />
                        )}
                        <span className='sr-only'>Copy to clipboard</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isCopied ? 'Copied!' : 'Copy to clipboard'}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
