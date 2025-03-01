import { Toaster } from '@/components/ui/sonner'
import { Poppins } from 'next/font/google'
import { ReactNode, Suspense } from 'react'

import './globals.css'

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
})

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <html lang='en' suppressHydrationWarning>
                <body className={`${poppins.className} antialiased`}>
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
