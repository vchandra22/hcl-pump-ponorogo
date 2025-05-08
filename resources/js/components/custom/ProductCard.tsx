import { Link } from '@inertiajs/react';
import { CircleChevronRight } from 'lucide-react';

interface ProductCardProps {
    title?: string;
    img?: string;
    href?: string;
    image_alt?: string;
}

export default function ProductCard({ title, img, href, image_alt }: ProductCardProps) {
    return (
        <div className="w-full rounded-3xl border border-slate-200 lg:col-span-4 overflow-hidden cursor-pointer" onClick={() => { 
            window.location.href = href! }
            }>
            <div className='w-full h-80 md:h-100 overflow-hidden flex justify-center'>
                <img src={img ?? `/asset/contoh-gambar-pompa.png`} alt={image_alt} width="100" height="100" className="mx-auto w-full overflow-hidden min-h-44 object-cover" />
            </div>
            <div className="border border-r-0 border-b-0 border-l-0 border-t-slate-200 px-8 py-8">
                <p className="text-text-color font-regular line-clamp-2 min-h-20 overflow-hidden text-start text-2xl md:text-3xl lg:text-4xl">
                    {title ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'}
                </p>
                <div className="text-primary-color group flex items-center justify-between pt-2 xl:pt-4">
                    <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} href={href ?? `#`} as="button" preserveScroll className="cursor-pointer text-xl group-hover:underline md:text-2xl">
                        Lihat Produk
                    </Link>
                    <CircleChevronRight color="#0fae7d" className="text-primary-color cursor-pointer" size="28" />
                </div>
            </div>
        </div>
    );
}
