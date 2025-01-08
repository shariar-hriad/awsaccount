import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { AppSidebar } from './_components/app-sidebar'
import Header from './_components/header'
import Provider from './provider'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Provider>
                <TooltipProvider>
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>
                            <Header />
                            <main className='flex flex-1 flex-col gap-4 p-4'>
                                {children}
                            </main>
                        </SidebarInset>
                    </SidebarProvider>
                </TooltipProvider>
            </Provider>
        </>
    )
}

export default AdminLayout
