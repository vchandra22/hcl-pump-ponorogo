import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import ArticleCard from '@/components/custom/ArticleCard';
import DOMPurify from 'dompurify';

interface ArticleDetailProps {
    article: {
        title: string;
        content: string;
        created_at: string;
        author: string;
        image_article?: string;
        shortDescription: string;
        meta: {
            meta_title: string;
            meta_description: string;
            meta_keywords: string;
            og_image?: string;
        };
    };
    listArticle: {
        id: number;
        title: string;
        slug: string;
        image_article?: string;
        short_description?: string;
        author: string;
        date: string;
    }[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export default function ArticleDetail({ article, listArticle, base_url = '' }: ArticleDetailProps) {
    const coverImage = article.image_article
        ? `/storage/${article.image_article}`
        : '/asset/gambar-ilustrasi-artikel.png';

    const sanitizedContent = article.content
        ? DOMPurify.sanitize(article.content)
        : '';

    return (
        <>
            <Head title={article.title} />
                <meta name="title" content={`${article.meta.meta_title} | HCL Pump Ponorogo`} />
                <meta name="description" content={article.meta.meta_description} />
                <meta
                    name="keywords"
                    content={`${article.meta.meta_keywords}, artikel pompa, HCL Pump Ponorogo, teknologi pompa`}
                />

                {/* Open Graph Tags */}
                <meta property="og:title" content={`${article.meta.meta_title} | HCL Pump Ponorogo`} />
                <meta property="og:description" content={article.meta.meta_description} />
                <meta
                    property="og:image"
                    content={
                        article.meta.og_image
                            ? `${base_url}/storage/${article.meta.og_image}`
                            : `${base_url}/asset/logo-hcl-pump-ponorogo.png`
                    }
                />
                <meta property="og:url" content={`${base_url}${location.pathname}`} />
                <meta property="og:type" content="article" />

                {/* SEO Related */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            <Navigasi />

            {/* Hero Section */}
            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-24 lg:py-72">
                <img
                    src={coverImage}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    alt="Cover Artikel"
                />
                <div className="bg-secondary-color/60 absolute top-0 left-0 z-10 h-full w-full"></div>
                <div className="relative z-20 w-full mx-auto px-4">
                    <div className="mb-9 grid mx-auto px-8 w-full grid-cols-1 md:mb-0 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <Link href="/article" prefetch={false}>
                                <p className="group border text-md font-regular text-bg-color inline-flex h-9 items-center rounded-full px-6 py-3 hover:bg-gray-100 hover:text-gray-900">
                                    Kembali
                                </p>
                            </Link>
                        </div>
                        <div className="lg:col-span-8">
                            <h1 className="text-bg-color font-regular h1">{article.title}</h1>
                            <p className="py-4 p-subheading text-bg-color">
                                {formatDate(article.created_at)}, {article.author}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="w-full py-12 px-4 md:px-12 md:py-24 lg:py-32">
                {sanitizedContent ? (
                    <article
                        className="prose max-w-none text-text-color"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                ) : (
                    <article className="prose max-w-none text-text-color">
                        <p>Konten Artikel belum tersedia. Silakan kembali lagi nanti.</p>
                    </article>
                )}
            </section>

            {/* Related Articles */}
            <section className="w-full py-12 px-4 md:px-12 md:py-24 lg:py-32">
                <div className="grid w-full grid-cols-1 mb-9 md:mb-0 lg:grid-cols-12">
                    <div className="lg:col-span-4 py-4 md:py-8">
                        <h2 className="text-primary-color font-regular pb-2 h2">Artikel Terkait</h2>
                    </div>
                    <div className="lg:col-span-8">
                        {listArticle.length > 0 ? (
                            listArticle
                                .filter(item => item.id !== article.id)
                                .slice(0, 3)
                                .map((item) => (
                                    <ArticleCard
                                        key={item.id}
                                        img={`/storage/${item.image_article}`}
                                        title={item.title}
                                        alt={item.title}
                                        date={item.date}
                                        author={item.author}
                                        shortDescription={item.short_description}
                                        href={`/article/${item.slug}`}
                                    />
                                ))
                        ) : (
                            <p className="text-text-color">Belum ada artikel yang tersedia.</p>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
