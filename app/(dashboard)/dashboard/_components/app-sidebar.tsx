'use client'

import {
    Book,
    GalleryVerticalEnd,
    Grid2X2,
    Settings,
    ShoppingBag,
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import Link from 'next/link'

// This is sample data.
const data = {
    user: {
        name: 'Munwar Maruf',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Product',
            url: '#',
            icon: Grid2X2,
            items: [
                {
                    title: 'Products',
                    url: '/dashboard/products',
                },
                {
                    title: 'Create Product',
                    url: '/dashboard/products/create-product',
                },
                {
                    title: 'Categories',
                    url: '/dashboard/products/categories',
                },
            ],
        },
        {
            title: 'Order',
            url: '#',
            icon: ShoppingBag,
            items: [
                {
                    title: 'Order History',
                    url: '/dashboard/orders',
                },
            ],
        },
        {
            title: 'Article',
            url: '#',
            icon: Book,
            items: [
                {
                    title: 'Articles',
                    url: '/dashboard/articles',
                },
                {
                    title: 'Create Article',
                    url: '/dashboard/articles/create-article',
                },
            ],
        },
        {
            title: 'Faq',
            url: '#',
            icon: Settings,
            items: [
                {
                    title: 'Faqs',
                    url: '/dashboard/faqs',
                },
                {
                    title: 'Create Faq',
                    url: '/dashboard/faqs/create-faq',
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg' asChild>
                            <Link href='/'>
                                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                    <GalleryVerticalEnd className='size-4' />
                                </div>
                                <div className='flex flex-col gap-0.5 leading-none'>
                                    <span className='font-semibold'>
                                        AWS Bulk
                                    </span>
                                    <span className=''>v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
