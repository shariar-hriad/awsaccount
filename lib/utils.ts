import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateSlug(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

export function timeAgo(isoTimestamp: string): string {
    const now = new Date()
    const timestampDate = new Date(isoTimestamp)
    const differenceInSeconds = Math.floor(
        (now.getTime() - timestampDate.getTime()) / 1000
    )

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`
    }

    const differenceInMinutes = Math.floor(differenceInSeconds / 60)
    if (differenceInMinutes < 60) {
        return `${differenceInMinutes} minutes ago`
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60)
    if (differenceInHours < 24) {
        return `${differenceInHours} hours ago`
    }

    const differenceInDays = Math.floor(differenceInHours / 24)
    if (differenceInDays < 30) {
        return `${differenceInDays} days ago`
    }

    const differenceInMonths = Math.floor(differenceInDays / 30)
    if (differenceInMonths < 12) {
        return `${differenceInMonths} months ago`
    }

    const differenceInYears = Math.floor(differenceInMonths / 12)
    return `${differenceInYears} years ago`
}

export const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString() // Current timestamp in milliseconds (13 digits)
    const randomNumber = Math.floor(Math.random() * 10 ** 19).toString() // Random number (up to 19 digits)
    const orderNumber = (timestamp + randomNumber).slice(0, 32) // Ensure it's exactly 32 digits
    return orderNumber
}
