'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

const Header = () => {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(Boolean)

    return (
        <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
            <div className='flex items-center gap-2 px-3'>
                <SidebarTrigger />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <Breadcrumb>
                    <BreadcrumbList>
                        {pathSegments.map((segment, index) => (
                            <Fragment key={segment}>
                                {index > 0 && <BreadcrumbSeparator />}
                                <BreadcrumbItem>
                                    {index === pathSegments.length - 1 ? (
                                        <BreadcrumbPage className='capitalize'>
                                            {segment}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            className='capitalize'
                                            href={`/${pathSegments
                                                .slice(0, index + 1)
                                                .join('/')}`}
                                        >
                                            {segment}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}

export default Header
