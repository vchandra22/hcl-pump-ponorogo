import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

// Import the same navigation links as used in Navigasi component
const navLinks = [
    {
        name: 'Beranda',
        href: '/',
    },
    {
        name: 'Tentang Kami',
        href: '/tentang-kami',
    },
    {
        name: 'Produk',
        href: '/produk',
    },
    {
        name: 'Artikel',
        href: '/artikel',
    },
    {
        name: 'Kontak',
        href: '/kontak',
    },
];

interface SocialMediaData {
    id: string;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
}

interface FooterProps {
    social_media: SocialMediaData[];
}

export default function Footer({ social_media }: FooterProps) {

    return (
        <footer className="w-full">
            <div className="bg-bg-color mx-auto border border-t-slate-200 px-4 md:px-6">
                <div className="grid w-full grid-cols-1 gap-12 py-4 md:py-12 lg:grid-cols-3">
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="item-center mb-8 flex w-full justify-center">
                            <img
                                src="/asset/logo-hcl-pump-ponorogo.png"
                                width={'100'}
                                height={'100'}
                                className="h-full w-96"
                                alt="HCL Pump Ponorogo"
                            />
                        </div>
                        <div className="flex items-start space-x-2 px-8">
                            <MapPin className="mt-1 hidden h-5 w-5 flex-shrink-0 lg:block" />
                            <p className="text-text-color font-regular text text-center text-lg md:text-xl lg:text-start">
                                Jl. Trunojoyo No. 88, Krajan, Mangkujayan, Kec. Ponorogo, Kabupaten Ponorogo, Jawa Timur 63413
                            </p>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex flex-col items-center justify-start space-y-6">
                        {social_media.map((media) => {
                            const socialMediaIcon = media.icon_social_media ? `/storage/${media.icon_social_media}` : '/favicon.ico';
                            return (
                                <div key={media.id} className="flex items-center space-x-2">
                                    <img src={socialMediaIcon} alt={media.platform} className="h-6 w-6" />
                                    <a href={media.social_media_link} target="_blank" className="font-regular text-text-color cursor-pointer text-lg hover:underline md:text-xl">
                                        {media.title}
                                    </a>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="font-regular text-text-color flex flex-col items-center space-y-8 lg:items-start">
                            {/* Use the same navLinks from Navigasi component */}
                            {navLinks.map((link, i) => (
                                <Link key={i} href={link.href} className="cursor-pointer text-lg hover:underline md:text-xl" prefetch={false}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="font-regular text-text-color flex flex-col items-center space-y-8 lg:items-start">
                            <Link href="/syarat-ketentuan" className="cursor-pointer text-lg hover:underline md:text-xl">
                                Syarat & Ketentuan
                            </Link>
                            <Link href="/kebijakan-privasi" className="cursor-pointer text-lg hover:underline md:text-xl">
                                Kebijakan & Privasi
                            </Link>
                            <Link href="/penafian" className="cursor-pointer text-lg hover:underline md:text-xl">
                                Desclaimer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-secondary-color text-bg-color py-3 text-center text-lg md:text-xl">
                © 2025 - HCL Pump Ponorogo - Hak cipta dilindungi hukum
            </div>
        </footer>
    );
}

function FacebookIcons(props: any) {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M29.3334 15.9998C29.3334 8.63984 23.3601 2.6665 16.0001 2.6665C8.64008 2.6665 2.66675 8.63984 2.66675 15.9998C2.66675 22.4532 7.25342 27.8265 13.3334 29.0665V19.9998H10.6667V15.9998H13.3334V12.6665C13.3334 10.0932 15.4267 7.99984 18.0001 7.99984H21.3334V11.9998H18.6667C17.9334 11.9998 17.3334 12.5998 17.3334 13.3332V15.9998H21.3334V19.9998H17.3334V29.2665C24.0667 28.5998 29.3334 22.9198 29.3334 15.9998Z"
                fill="#1C333B"
            />
        </svg>
    );
}
