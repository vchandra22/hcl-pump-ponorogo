import { Link } from "@inertiajs/react";
import { CircleChevronRight } from "lucide-react";

interface ProductCardProps {
  title?: string;
  img?: string;
  slug?: string;
}

export default function ProductCard({ title, img, slug }: ProductCardProps) {
    return (
        <div className="w-full rounded-3xl border border-slate-200 lg:col-span-4">
            <img src={img ?? `/asset/contoh-gambar-pompa.png`} width="100" height="100" className="mx-auto w-full overflow-hidden object-cover" />
            <div className="border border-r-0 border-b-0 border-l-0 border-t-slate-200 px-8 py-8">
                <p className="text-text-color font-regular line-clamp-2 min-h-16 overflow-hidden text-start text-2xl md:text-3xl lg:text-4xl">
                    {title ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'}
                </p>
                <div className="text-primary-color flex items-center justify-between pt-2 xl:pt-4 group">
                    <Link href={slug ?? `#`} as="button" preserveScroll className="text-xl md:text-2xl cursor-pointer group-hover:underline">
                        Lihat Produk
                    </Link>
                    <CircleChevronRight className="text-primary-color cursor-pointer" size="28" />
                </div>
            </div>
        </div>
    );
}
