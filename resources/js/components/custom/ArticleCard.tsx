import { Link } from '@inertiajs/react';
import { CircleChevronRight } from 'lucide-react';

interface ArticleCardProps {
    img: string;
    title: string;
    alt?: string;
    date: string;
    author: string;
    shortDescription: string;
    href: string;
}

export default function ArticleCard({
        img,
        title,
        alt,
        date,
        author,
        shortDescription,
        href,
    }: ArticleCardProps) {
    return (
        <section className="w-full">
            <div className="mx-auto">
                <div className="grid w-full grid-cols-1 py-4 md:py-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <div className="w-full lg:pe-8">
                            <img
                                src={img ?? "/asset/gambar-ilustrasi-artikel.png"}
                                width="100"
                                height="100"
                                alt={alt}
                                className="mx-auto h-56 w-full overflow-hidden rounded-3xl object-cover xl:h-72"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <div className="flex h-full flex-col items-start justify-between py-2">
                            <p className="text-primary-color font-regular line-clamp-2 h-[4.5rem] cursor-pointer h2 hover:underline h2">
                                {title ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores dolores exercitationem expedita id\n' +
                                    'incidunt, iste magnam neque officia, perferendis quis rem velit voluptatem!'}
                            </p>
                            <p className="text-text-color font-regular pt-2 p">{date ?? '12 Maret 2025'}, {author ?? 'Admin'}</p>
                            <p className="text-text-color font-regular line-clamp-3 h-20 py-2 p">
                                {shortDescription ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ducimus est exercitationem inventore, magnam\n' +
                                    '                                    nostrum quo sit voluptates. Amet animi at autem doloremque earum, enim eos facere impedit ipsum itaque magnam\n' +
                                    '                                    minima minus porro, provident ratione tempora totam, ullam velit. Blanditiis, molestias.'}
                            </p>
                            <div className="text-primary-color flex w-full items-center justify-between pt-2 xl:pt-4">
                                <Link href={href ?? '#'} as="button" preserveScroll className="cursor-pointer h3 hover:underline">
                                    Baca Selengkapnya
                                </Link>
                                <CircleChevronRight color="#0fae7d" className="text-primary-color me-8" size="28" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
