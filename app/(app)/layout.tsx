import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'

import Footer from './_components/layout/footer'
import Header from './_components/layout/header'

export const metadata: Metadata = {
    title: 'AWSBULK',
    description: 'Buy AWS account from here',
    verification: {
        google: 'zwGqBm3o77HdJ9fmECHztUSQd48EuiYXAwHm4gdfAR8',
    },
}

type AppLayoutProps = {
    children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default AppLayout
