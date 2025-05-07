import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';
import ProductCard from '@/components/custom/ProductCard';
import ArticleCard from '@/components/custom/ArticleCard';
import DOMPurify from 'dompurify';

interface HomepageData {
    id: string;
    title: string;
    description: string;
    banner_image: string;
    meta: {
        meta_title: string;
        meta_description: string;
        meta_keywords: string;
        og_image?: string;
        image_alt?: string;
    }
}

interface ProductData {
    id: string;
    title: string;
    slug: string;
    product_images: {
        image_path: string;
    };
    meta: {
        image_alt?: string;
    }
}

interface ArticleData {
    id: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    image_article: string;
    image_alt?: string;
    created_at: string;
    updated_at: string;
}

interface SocialMediaData {
    id: string;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
}

interface HomepageProps {
    homepage?: HomepageData[];
    product?: ProductData[];
    articles?: ArticleData[];
    social_media: SocialMediaData[];
}
export default function Beranda({ homepage, product, articles, social_media, base_url = '' }: HomepageProps) {
    const homepageData = homepage?.[0] || {};
    const bannerImage = homepageData.banner_image ? `/storage/${homepageData.banner_image}` : '/asset/logo-hcl-pump-ponorogo.png';

    const sanitizedContent = homepageData.description ? DOMPurify.sanitize(homepageData.description) : '';
    return (
        <>
            <Head title="Beranda">
                <meta
                    name="title"
                    content={`${homepageData.meta?.meta_title ?? 'Beranda - HCL Pump Ponorogo'}`}
                />
                <meta
                    name="description"
                    content={
                        homepageData.meta?.meta_description ??
                        'HCL Pump Ponorogo - Produsen dan distributor pompa air berkualitas tinggi untuk kebutuhan rumah tangga, industri, dan pertanian.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        `${homepageData.meta?.meta_keywords ?? 'pompa air, HCL Pump, pompa industri'}, distributor pompa, pompa sumur dalam, pompa submersible`
                    }
                />

                {/* Open Graph Meta Tags */}
                <meta
                    property="og:title"
                    content={`${homepageData.meta?.meta_title ?? 'Beranda - HCL Pump Ponorogo'}`}
                />
                <meta
                    property="og:description"
                    content={
                        homepageData.meta?.meta_description ??
                        'Solusi lengkap untuk kebutuhan pompa air dengan produk berkualitas dan layanan terbaik dari HCL Pump Ponorogo.'
                    }
                />
                <meta
                    property="og:image"
                    width="100"
                    height="100"
                    content={
                        homepageData.meta?.og_image
                            ? `${base_url}/storage/${homepageData.meta.og_image}`
                            : `${base_url}/asset/logo-hcl-pump-ponorogo.png`
                    }
                />
                <meta property="og:url" content={`${base_url}${location.pathname}`} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>

            <Navigasi />

            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-24 lg:py-72">
                <img src={bannerImage} width="100" height="100" className={'absolute top-0 left-0 h-full w-full overflow-hidden object-cover'} alt={homepageData.meta?.image_alt ?? 'HCL Pump Ponorogo'} />
                <div className={'bg-secondary-color/60 absolute top-0 left-0 z-10 h-full w-full'}></div>
                <div className="relative z-20 container mx-auto px-4">
                    <div className="lg:max-w-2/3">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-bg-color text-center text-xl h1 font-bold tracking-tighter sm:text-5xl lg:text-start xl:text-6xl/none">
                                    { homepageData.title ? homepageData.title : 'HCL – Pilihan Cerdas untuk Pompa Air yang Mengalir Tanpa Henti' }
                                </h1>

                                {sanitizedContent ? (
                                    <div
                                        className="max-w-none force-white"
                                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                                    />
                                ) : (
                                    <article className="force-white max-w-none">
                                        HCL Water Pump hadir sebagai solusi terbaik untuk Anda yang membutuhkan pompa air dengan performa tangguh dan daya
                                        tahan luar biasa. Dengan teknologi modern dan material berkualitas, pompa HCL mampu bekerja terus-menerus tanpa
                                        mudah panas atau macet. Cocok untuk kebutuhan rumah tangga, industri, hingga pertanian.
                                    </article>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:px-6 md:py-24 lg:py-32">
                <div className="mx-auto px-4 md:px-6">
                    <div className="grid w-full grid-cols-1 mb-9 md:mb-0 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-full">
                                <h2 className="text-primary-color font-regular pb-2 h2">Mengapa memilih kami?</h2>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <p className="text-text-color font-regular h1">
                                    Pompa air HCL dirancang dengan teknologi terkini untuk memastikan performa tangguh
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="mx-auto w-full md:py-12 lg:py-24">
                        <div className="grid w-full gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                            {product && product.map((item) => (
                                <div key={item.id}>
                                    <ProductCard
                                        title={item.title}
                                        img={item.product_images[0].image_path ? `${item.product_images[0].image_path}` : '/asset/logo-hcl-pump-ponorogo.png'}
                                        href={`/produk/${item.slug}`}
                                        image_alt={item.meta.image_alt ?? 'HCL Pump Ponorogo'}
                                    />
                                </div>
                            ))}
                        </div>`
                    </section>

                    <div className="w-full">
                        <div className="mx-auto">
                            <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-12">
                                <div className="hidden lg:col-span-4 lg:block"></div>
                                <div className="col-span-8">
                                    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 xl:gap-8">
                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 h2">Harga Terjangkau</p>
                                            <p className="font-regular text-text-color text-start h3">
                                                Kami menawarkan solusi pompa berkualitas tinggi dengan harga yang kompetitif, memastikan Anda
                                                mendapatkan nilai terbaik untuk investasi Anda.
                                            </p>
                                        </div>

                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 h2">Kualitas Tinggi</p>
                                            <p className="font-regular text-text-color text-start h3">
                                                Produk kami, termasuk pompa celup (submersible) dan berbagai jenis pompa lainnya, telah meraih
                                                sertifikat SNI, menjamin kualitas dan keandalan yang telah teruji.
                                            </p>
                                        </div>

                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 h2">Bergaransi</p>
                                            <p className="font-regular text-text-color text-start h3">
                                                Kami memberikan garansi pada setiap produk kami, memberikan Anda ketenangan pikiran dan kepercayaan
                                                pada performa pompa kami.
                                            </p>
                                        </div>

                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 h2">Konsultasi Gratis</p>
                                            <p className="font-regular text-text-color text-start h3">
                                                Butuh bantuan untuk memilih pompa yang tepat? Tim ahli kami siap memberikan konsultasi gratis untuk
                                                memastikan Anda mendapatkan solusi yang sesuai dengan kebutuhan Anda.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:px-6">
                <div className="mx-auto px-4 md:px-6">
                    <div className="grid w-full grid-cols-1 pb-8 md:pb-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-fulsl">
                                <h2 className="text-primary-color font-regular pb-2 h2">Update Artikel</h2>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <p className="text-text-color font-regular h1">
                                    Update Lengkap Tentang Teknologi dan Solusi Pompa Air
                                </p>
                            </div>
                        </div>
                    </div>

                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                img={`/storage/${article.image_article}`}
                                title={article.title}
                                alt={article.title}
                                date={article.date}
                                author={article.author}
                                shortDescription={article.short_description}
                                href={`/artikel/${article.slug}`}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-12">Belum ada artikel yang tersedia.</p>
                    )}

                    {articles.length > 0 && (
                        <div className="text-primary-color flex items-center justify-center py-12">
                            <Link href="/artikel" preserveScroll className="cursor-pointer text-lg hover:underline md:text-2xl">
                                Lihat Artikel Lainnya
                            </Link>
                        </div>
                    )}

                </div>
            </section>

            <section className="relative w-full overflow-hidden py-8 text-white md:py-12 lg:py-32">
                <img
                    src="/asset/gambar-ilustrasi-background.png"
                    className={'absolute top-0 left-0 h-full w-full overflow-hidden object-cover'}
                    alt="HCL Pump Ponorogo"
                />
                <div className="relative z-20 container mx-auto">
                    <div className="mx-auto max-w-11/12">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-bg-color pt-2 text-center text-2xl">Layanan & Harga</p>
                                    <p className="text-bg-color font-regular text-center text-3xl sm:text-5xl xl:text-6xl/none">
                                        Butuh Pompa dan Pengeboran Sekaligus? Kami Siap Bantu!
                                    </p>
                                </div>
                                <div className="mx-auto w-full flex justify-center mt-8">
                                    <Link
                                        href="/kontak"
                                        className="w-max border-bg-color text-center font-regular text-bg-color t ransition-colors inline-flex h-9 items-center justify-center rounded-full border bg-transparent px-12 py-6 text-2xl hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                        prefetch={false}
                                    >
                                        Hubungi Kami
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer social_media={social_media}  />
        </>
    );
}
