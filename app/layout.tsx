import { Toaster } from '@/components/ui/sonner'
import { Open_Sans } from 'next/font/google'
import { ReactNode, Suspense } from 'react'

import './globals.css'

const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
})

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <html lang='en' suppressHydrationWarning>
                <body className={`${openSans.variable} antialiased`}>
                    <Suspense fallback={<p>Loading...</p>}>
                        {/* <ThemeProvider
                            attribute='class'
                            defaultTheme='system'
                            enableSystem
                            disableTransitionOnChange
                        > */}
                        {children}
                        {/* <DisableConsole>{children}</DisableConsole> */}
                        <Toaster position='bottom-center' />
                        {/* </ThemeProvider> */}
                    </Suspense>
                </body>
            </html>
        </>
    )
}

export default RootLayout
