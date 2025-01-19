'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

interface DisableDevToolsEvent extends KeyboardEvent {
    key: string
    ctrlKey: boolean
    shiftKey: boolean
}

const DisableConsole = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const detectDevTools = () => {
            const element = new Image()
            Object.defineProperty(element, 'id', {
                get: function () {
                    // Redirect or disable functionality
                    redirect('/console-is-open/close-console-and-try-again') // Example: Redirect to a blank page
                },
            })
            console.log(element)
        }

        detectDevTools()
        const interval = setInterval(detectDevTools, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Disable console methods
        console.log = console.warn = console.error = console.debug = () => {}
        console.info = console.clear = () => {}

        // Disable right click
        const disableRightClick = (e: MouseEvent): void => e.preventDefault()
        // Disable developer tools shortcuts
        const disableDevTools = (e: DisableDevToolsEvent): void => {
            if (
                e.key === 'F12' || // Block F12
                (e.ctrlKey && e.shiftKey && e.key === 'I') || // Block Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.key === 'J') // Block Ctrl+Shift+J
            ) {
                e.preventDefault()
            }
        }

        document.addEventListener('contextmenu', disableRightClick)
        window.addEventListener('keydown', disableDevTools)

        return () => {
            document.removeEventListener('contextmenu', disableRightClick)
            window.removeEventListener('keydown', disableDevTools)
        }
    }, [])

    return <>{children}</>
}

export default DisableConsole
