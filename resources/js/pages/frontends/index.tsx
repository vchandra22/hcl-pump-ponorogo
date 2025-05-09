import ArticleCard from '@/components/custom/ArticleCard';
import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import formatDate from '@/utils/formatDate';
import { Head, Link } from '@inertiajs/react';
import DOMPurify from 'dompurify';
import HotlineWhatsapp from '@/components/custom/HotlineWhatsapp';

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
    };
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
    };
}

interface addressData {
    address: string[];
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
    address: string[];
}

interface ReasonData {
    id: string;
    title: string;
    description: string;
}

interface SocialMediaLink {
    social_media_link: string;
}

interface HomepageProps {
    homepage?: HomepageData[];
    product?: ProductData[];
    articles?: ArticleData[];
    social_media: SocialMediaData[];
    reason_service?: ReasonData[];
    base_url?: string;
    addressData?: addressData[];
    social_media_link?: SocialMediaLink[];
}

export default function Beranda({
    homepage = [],
    product = [],
    articles = [],
    social_media = [],
    reason_service = [],
    social_media_link,
    base_url = '',
    addressData = [],
}: HomepageProps) {
    const homepageData = homepage[0] || {};
    const bannerImage = homepageData.banner_image ? `/storage/${homepageData.banner_image}` : '/asset/gambar-banner.png';
    const sanitizedContent = homepageData.description ? DOMPurify.sanitize(homepageData.description) : '';
    console.log('ini social media link :')
    console.log(social_media_link);
    // Fallback reasons data
    const fallbackReasons = [
        {
            id: 'fallback-1',
            title: 'Harga Terjangkau',
            description:
                'Kami menawarkan solusi pompa berkualitas tinggi dengan harga yang kompetitif, memastikan Anda mendapatkan nilai terbaik untuk investasi Anda.',
        },
        {
            id: 'fallback-2',
            title: 'Kualitas Tinggi',
            description:
                'Produk kami, termasuk pompa celup (submersible) dan berbagai jenis pompa lainnya, telah meraih sertifikat SNI, menjamin kualitas dan keandalan yang telah teruji.',
        },
        {
            id: 'fallback-3',
            title: 'Bergaransi',
            description:
                'Kami memberikan garansi pada setiap produk kami, memberikan Anda ketenangan pikiran dan kepercayaan pada performa pompa kami.',
        },
        {
            id: 'fallback-4',
            title: 'Konsultasi Gratis',
            description:
                'Butuh bantuan untuk memilih pompa yang tepat? Tim ahli kami siap memberikan konsultasi gratis untuk memastikan Anda mendapatkan solusi yang sesuai dengan kebutuhan Anda.',
        },
    ];

    // Combine API reasons with fallback if needed
    const displayedReasons = [...reason_service, ...fallbackReasons.slice(reason_service.length)].slice(0, 4);

    return (
        <>
            <Head title="Beranda">
                <meta name="title" content={`${homepageData.meta?.meta_title ?? 'Beranda - HCL Pump Ponorogo'}`} />
                <meta
                    name="description"
                    content={
                        homepageData.meta?.meta_description ??
                        'HCL Pump Ponorogo - Produsen dan distributor pompa air berkualitas tinggi untuk kebutuhan rumah tangga, industri, dan pertanian.'
                    }
                />
                <meta
                    name="keywords"
                    content={`${homepageData.meta?.meta_keywords ?? 'pompa air, HCL Pump, pompa industri'}, distributor pompa, pompa sumur dalam, pompa submersible`}
                />

                <meta property="og:title" content={`${homepageData.meta?.meta_title ?? 'Beranda - HCL Pump Ponorogo'}`} />
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

            {/* Banner Section */}
            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-24 lg:py-96">
                <img
                    src={bannerImage}
                    width="100"
                    height="100"
                    className="absolute top-0 left-0 h-full w-full overflow-hidden object-fit object-center"
                    alt={homepageData.meta?.image_alt ?? 'HCL Pump Ponorogo'}
                />
                <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-r from-secondary-color/70 to-transparent"></div>
                <div className="relative z-20 container mx-auto px-4">
                    <div className="lg:max-w-2/3">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-bg-color h1 text-center text-xl font-bold tracking-tighter sm:text-5xl lg:text-start xl:text-6xl/none">
                                    {homepageData.title || ''}
                                </h1>

                                {sanitizedContent ? (
                                    <div className="force-white max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                                ) : (
                                    <div className="force-white max-w-none">
                                        <p></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="w-full py-12 md:px-6 md:py-24 lg:py-32">
                <div className="mx-auto px-4 md:px-6">
                    <div className="mb-9 grid w-full grid-cols-1 md:mb-0 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-full">
                                <h2 className="text-primary-color font-regular h2 pb-2">Mengapa memilih kami?</h2>
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

                    {/* Products Grid */}
                    <section className="mx-auto w-full md:py-12 lg:py-24">
                        <div className="grid w-full gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                            {product.map((item) => (
                                <div key={item.id}>
                                    <ProductCard
                                        title={item.title}
                                        img={item.product_images[0]?.image_path || '/asset/logo-hcl-pump-ponorogo.png'}
                                        href={`/produk/${item.slug}`}
                                        image_alt={item.meta?.image_alt || 'HCL Pump Ponorogo'}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reasons Grid */}
                    <div className="w-full">
                        <div className="mx-auto">
                            <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-12">
                                <div className="hidden lg:col-span-4 lg:block"></div>
                                <div className="col-span-8">
                                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:gap-8">
                                        {displayedReasons.map((reason) => (
                                            <div key={reason.id} className="w-full px-8 py-2">
                                                <p className="text-primary-color h2 pb-4">{reason.title}</p>
                                                <p className="font-regular text-text-color h3 text-start">{reason.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Section */}
            <section className="w-full py-12 md:px-6">
                <div className="mx-auto px-4 md:px-6">
                    <div className="grid w-full grid-cols-1 pb-8 md:pb-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-fulsl">
                                <h2 className="text-primary-color font-regular h2 pb-2">Update Artikel</h2>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <p className="text-text-color font-regular h1">Update Lengkap Tentang Teknologi dan Solusi Pompa Air</p>
                            </div>
                        </div>
                    </div>

                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                img={`/storage/${article.image_article}`}
                                title={article.title}
                                alt={article.image_alt || article.title}
                                date={formatDate(article.created_at)}
                                author={article.author}
                                shortDescription={article.summary}
                                href={`/artikel/${article.slug}`}
                            />
                        ))
                    ) : (
                        <p className="py-12 text-center text-gray-500">Belum ada artikel yang tersedia.</p>
                    )}

                    {articles.length > 0 && (
                        <div className="text-primary-color flex items-center justify-center py-12">
                            <Link
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                href="/artikel"
                                preserveScroll
                                className="cursor-pointer text-lg hover:underline md:text-2xl"
                            >
                                Lihat Artikel Lainnya
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <CtaComponent href="/kontak" />

            <Footer social_media={social_media} address={addressData}/>

            <HotlineWhatsapp href={social_media_link} />

        </>
    );
}
