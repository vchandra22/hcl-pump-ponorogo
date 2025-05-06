import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Pompa HCL Ponorogo';

const navLinks: { name: string; href: string; className: string }[] = [
    {
        name: 'Beranda',
        href: '/',
        className:
            'group inline-flex h-9 w-max items-center justify-center rounded-md bg-hcl-background px-4 py-2 text-md font-regular text-text-color transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50',
    },
    {
        name: 'Tentang Kami',
        href: '/about',
        className:
            'group inline-flex h-9 w-max items-center justify-center rounded-md bg-hcl-background px-4 py-2 text-md font-regular text-text-color transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50',
    },
    {
        name: 'Produk',
        href: '/product',
        className:
            'group inline-flex h-9 w-max items-center justify-center rounded-md bg-hcl-background px-4 py-2 text-md font-regular text-text-color transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50',
    },
    {
        name: 'Artikel',
        href: '/article',
        className:
            'group inline-flex h-9 w-max items-center justify-center rounded-md bg-hcl-background px-4 py-2 text-md font-regular text-text-color transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50',
    },
    {
        name: 'Kontak',
        href: '/contact',
        className:
            'group inline-flex h-9 w-max items-center justify-center rounded-full bg-primary-color px-6 py-3 text-md font-regular text-bg-color t ransition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50',
    },
];

export default function Navigasi() {
    const { url } = usePage();
    return (
        <header className="bg-bg-color/80 flex h-20 w-full shrink-0 items-center justify-end border-b border-slate-200 px-4 backdrop-blur-md md:sticky md:top-0 md:z-50 md:px-6">
            <Sheet>
                <SheetTrigger>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
                        <img src="/asset/logo-hcl-pump-ponorogo.png" alt="Logo" className="h-8 w-auto" />
                        <span className="sr-only">{appName}</span>
                    </Link>
                    <div className="grid gap-2 px-8 py-6">
                        {navLinks.map((link, i) => (
                            <Link key={i} href={link.href} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                <img src="/asset/logo-hcl-pump-ponorogo.png" alt="Logo" className="h-12 w-auto" />
                <span className="sr-only">{appName}</span>
            </Link>
            <nav className="ml-auto hidden gap-6 lg:flex">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        href={link.href}
                        className={`${link.className} ${link.href == url && url !== '/contact' ? 'underline' : ''}`}
                        prefetch={false}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}

function MenuIcon(props: { [key: string]: unknown }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
