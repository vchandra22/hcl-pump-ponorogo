import ArticleCard from '@/components/custom/ArticleCard';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';
import CtaComponent from '@/components/custom/CtaComponent';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface AboutData {
    image_company?: string;
}

interface ArticleItem {
    id: number;
    title: string;
    image_article: string;
    date: string;
    author: string;
    summary: string;
    slug: string;
}

interface PaginatedArticles {
    data: ArticleItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface SocialMediaData {
    id: string;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
}
interface ArticleProps {
    about?: AboutData[];
    articles?: PaginatedArticles;
    social_media: SocialMediaData[];
    base_url?: string;
}

export default function Article({ about = [], articles = { data: [], current_page: 1, last_page: 1, per_page: 10, total: 0 }, social_media, base_url = '' }: ArticleProps) {
    const aboutData = about[0] || {};
    const companyImage = aboutData.image_company
        ? `/storage/${aboutData.image_company}`
        : '/asset/gambar-perusahaan.png';

    const getVisiblePages = () => {
        const visiblePages = [];
        const totalPages = articles.last_page;
        const currentPage = articles.current_page;
        const maxVisible = 5; // Maximum visible page numbers

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    };

    return (
        <>
            <Head title="Artikel">
                <meta
                    name="title"
                    content="Artikel"
                />
                <meta
                    name="description"
                    content={"Baca artikel dan berita terbaru dari HCL Pump Ponorogo mengenai teknologi pompa air, solusi industri, dan inovasi efisiensi sistem."}
                />
                <meta
                    name="keywords"
                    content={"artikel pompa air, teknologi pompa, solusi industri, HCL Pump Ponorogo, efisiensi pompa"}
                />

                {/* Meta untuk Open Graph dan SEO */}
                <meta
                    property="og:title"
                    content={"Artikel"}
                />
                <meta
                    property="og:description"
                    content={"Jelajahi berbagai artikel inspiratif seputar inovasi dan teknologi pompa dari HCL Pump Ponorogo."}
                />
                <meta property="og:image" content={`${base_url}/asset/logo-hcl-pump-ponorogo.png`} />
                <meta property="og:url" content={`${base_url}${location.pathname}`} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>

            <Navigasi />

            {/* Header */}
            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Inspirasi untuk Anda</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">Update Terbaru Seputar Inovasi dan Teknologi Pompa</h1>
                        <p className="p-body-text-lg text-text-color">
                            Halaman ini menyediakan berbagai artikel dan berita terkait solusi pompa air dari HCL Pump Ponorogo, yang bisa Anda baca kapan saja. Temukan ide dan wawasan terbaru mengenai produk kami serta inovasi yang dapat meningkatkan efisiensi sistem pompa Anda dalam berbagai sektor industri.
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Image */}
            <section className="my-15 px-4 md:px-12">
                <img
                    src={companyImage}
                    width="100"
                    height="100"
                    className="mx-auto h-full min-h-52 w-full overflow-hidden object-fit"
                    alt="Company Image"
                />
            </section>

            {/* Article Section */}
            <section className="mx-auto w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12 py-4 md:py-8">
                    <p className="text-primary-color h2 lg:col-span-4">Kumpulan Inspirasi</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <p className="h1 text-secondary-color">Temukan Lebih Banyak Inspirasi Di Sini</p>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 md:px-12 mx-auto">
                {articles.data.length > 0 ? (
                    articles.data.map((article) => (
                        <ArticleCard
                            key={article.id}
                            img={`/storage/${article.image_article}`}
                            title={article.title}
                            alt={article.title}
                            date={article.date}
                            author={article.author}
                            shortDescription={article.summary}
                            href={`/artikel/${article.slug}`}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-12">Belum ada artikel yang tersedia.</p>
                )}

                {articles.data.length > 0 && (
                    <div className="py-12">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={`/artikel?page=${articles.current_page - 1}`}
                                        preserveScroll
                                        className={articles.current_page <= 1 ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>

                                {getVisiblePages().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href={`/artikel?page=${page}`}
                                            preserveScroll
                                            isActive={page === articles.current_page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href={`/artikel?page=${articles.current_page + 1}`}
                                        preserveScroll
                                        className={articles.current_page >= articles.last_page ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                        <div className="text-primary-color flex items-center justify-center mt-4">
                            <p className="text-sm text-gray-600">
                                Menampilkan halaman {articles.current_page} dari {articles.last_page} (Total {articles.total} artikel)
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <section>
                <CtaComponent
                    title="Layanan & Harga"
                    description="Tentang HCL Pump Ponorogo"
                    href="/tentang-kami"
                    buttonText="Tentang Kami"
                />
            </section>

            <Footer social_media={social_media}  />
        </>
    );
}
