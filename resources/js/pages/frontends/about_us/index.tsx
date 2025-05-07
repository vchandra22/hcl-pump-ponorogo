import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import DOMPurify from 'dompurify';

interface AboutData {
    id: string;
    title: string;
    description: string;
    image_company: string;
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
    }
}

interface SocialMediaData {
    id: string;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
}

interface AboutProps {
    about?: AboutData[];
    product?: ProductData[];
    social_media: SocialMediaData[];
}

export default function AboutUsIndex({ about, product, social_media, base_url = '' }: AboutProps) {
    const aboutData = about[0] || {};
    const companyImage = aboutData.image_company ? `/storage/${aboutData.image_company}` : '/asset/gambar-perusahaan.png';

    const sanitizedContent = aboutData.description ? DOMPurify.sanitize(aboutData.description) : '';

    return (
        <>
            <Head title="Tentang Kami">
                <meta
                    name="title"
                    content={`${aboutData.meta.meta_title ?? 'Tentang Kami'}`}
                />
                <meta
                    name="description"
                    content={
                        aboutData.meta.meta_description ??
                        'Kenali lebih dekat HCL Pump Ponorogo, perusahaan spesialis teknologi pompa air industri.'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        `${aboutData.meta.meta_keywords ?? 'tentang kami, HCL Pump Ponorogo'}, profil perusahaan, teknologi pompa`
                    }
                />

                <meta
                    property="og:title"
                    content={`${aboutData.meta.meta_title ?? 'Tentang Kami'}`}
                />
                <meta
                    property="og:description"
                    content={
                        aboutData.meta.meta_description ??
                        'Kenali lebih dekat HCL Pump Ponorogo dan bagaimana kami menghadirkan solusi pompa terbaik untuk industri Anda.'
                    }
                />
                <meta
                    property="og:image"
                    content={
                        aboutData.meta.og_image
                            ? `${base_url}/storage/${aboutData.meta.og_image}`
                            : `${base_url}/asset/logo-hcl-pump-ponorogo.png`
                    }
                />
                <meta property="og:url" content={`${base_url}${location.pathname}`} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>
            <Navigasi />
            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Tentang Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1">
                            {aboutData.title ? aboutData.title : 'HCL Pump Ponorogo hadir sebagai solusi terpercaya untuk kebutuhan pompa air'}
                        </h1>
                        {sanitizedContent ? (
                            <article className="text-text-color max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                        ) : (
                            <article className="text-text-color max-w-none">
                                <p>
                                    HCL Pump Ponorogo adalah penyedia pompa air dan minyak berkualitas tinggi yang telah dipercaya oleh ribuan
                                    pelanggan di seluruh Ponorogo. Kami tidak hanya menjual produk pompa, tetapi juga menawarkan solusi menyeluruh
                                    untuk kebutuhan distribusi air, termasuk layanan pengeboran sumur profesional. Dengan pengalaman dan komitmen
                                    terhadap kualitas, kami menghadirkan pompa celup bersertifikat SNI yang dirancang untuk ketahanan, efisiensi, dan
                                    performa maksimal. Mulai dari kebutuhan rumah tangga hingga industri, produk HCL hadir sebagai pilihan terbaik
                                    untuk sistem perpompaan Anda.
                                </p>
                            </article>
                        )}
                    </div>
                </div>
            </section>

            <section className="my-15 px-4 md:px-12">
                <img src={companyImage} width="100" height="100" className="mx-auto h-full min-h-52 w-full overflow-hidden object-cover" alt={aboutData.meta.image_alt ?? 'HCL Pump Ponorogo'} />
            </section>

            <section>
                <div className="w-full">
                    <div className="mx-auto">
                        <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-12">
                            <div className="hidden lg:col-span-4 lg:block"></div>
                            <div className="col-span-8">
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:gap-8">
                                    <div className="w-full px-8 py-2">
                                        <p className="text-primary-color h2 pb-4">Harga Terjangkau</p>
                                        <p className="font-regular text-text-color h3 text-start">
                                            Kami menawarkan solusi pompa berkualitas tinggi dengan harga yang kompetitif, memastikan Anda mendapatkan
                                            nilai terbaik untuk investasi Anda.
                                        </p>
                                    </div>

                                    <div className="w-full px-8 py-2">
                                        <p className="text-primary-color h2 pb-4">Kualitas Tinggi</p>
                                        <p className="font-regular text-text-color h3 text-start">
                                            Produk kami, termasuk pompa celup (submersible) dan berbagai jenis pompa lainnya, telah meraih sertifikat
                                            SNI, menjamin kualitas dan keandalan yang telah teruji.
                                        </p>
                                    </div>

                                    <div className="w-full px-8 py-2">
                                        <p className="text-primary-color h2 pb-4">Bergaransi</p>
                                        <p className="font-regular text-text-color h3 text-start">
                                            Kami memberikan garansi pada setiap produk kami, memberikan Anda ketenangan pikiran dan kepercayaan pada
                                            performa pompa kami.
                                        </p>
                                    </div>

                                    <div className="w-full px-8 py-2">
                                        <p className="text-primary-color h2 pb-4">Konsultasi Gratis</p>
                                        <p className="font-regular text-text-color h3 text-start">
                                            Butuh bantuan untuk memilih pompa yang tepat? Tim ahli kami siap memberikan konsultasi gratis untuk
                                            memastikan Anda mendapatkan solusi yang sesuai dengan kebutuhan Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* optional feature */}
            {/*
                <section className="mx-auto mt-15 w-full px-4 md:px-12">
                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                    <div>
                        <AboutCard total={100} title="Produk" />
                    </div>
                    <div>
                        <AboutCard total={12} title="Klien" />
                    </div>
                    <div>
                        <AboutCard total={18} title="Testimoni" />
                    </div>
                </div>
            </section>
            */}

            <section className="w-full py-10 md:px-6 md:py-24 lg:py-17">
                <div className="mx-auto px-4 md:px-6">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-12">
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
                        </div>
                    </section>
                </div>
                <div className="mt-9 flex justify-center text-center md:mb-4 lg:mt-0 lg:mb-3">
                    <Link href="/product" as="button" preserveScroll className="cursor-pointer text-primary-color p-subheading hover:underline md:text-2xl">
                        Lihat produk lainya
                    </Link>
                </div>
            </section>
            <CtaComponent href="/kontak" />

            <Footer social_media={social_media}  />

        </>
    );
}
