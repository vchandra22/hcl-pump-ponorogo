import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, HomeIcon, Phone, Info, Mail, EarthIcon, NewspaperIcon,BookmarkPlusIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Beranda Manajemen',
        href: '/homepage',
        icon: HomeIcon,
    },
    {
        title: 'Tentang Kami Manajemen',
        href: '/about-us',
        icon: Info,
    },
    {
        title: 'Submission Manajemen',
        href: '/submission',
        icon: Mail,
    },
    {
        title: 'Kontak',
        href: '/contacts',
        icon: Phone,
    },
    {
        title: 'Social Media',
        href: '/social-media',
        icon: EarthIcon,
    },
    {
        title: 'Artikel',
        href: '/articles',
        icon: NewspaperIcon,
    },
    {
        title: 'Alasan',
        href: '/reasons',
        icon: BookmarkPlusIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
