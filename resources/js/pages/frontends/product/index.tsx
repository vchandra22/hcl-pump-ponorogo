import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Product } from '@/types/product';
import { Head } from '@inertiajs/react';

interface SocialMediaData {
    id: string;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
}

interface SocialMediaLink {
    social_media_link: string;
}

interface addressData {
    address: string[];
}
interface ProductIndexProps {
    products: Product[];
    social_media: SocialMediaData[];
    social_media_link: SocialMediaLink[];
    addressData?: addressData[];
}

export default function ProductIndex({ products, social_media, social_media_link, base_url = '',addressData}: ProductIndexProps) {
    return (
        <>
            <Head title={`Produk | HCL Pump Ponorogo`}>
                <meta
                    name="description"
                    content="Temukan berbagai produk pompa berkualitas dari HCL Pump Ponorogo, mulai dari pompa industri, pertanian, hingga kebutuhan rumah tangga."
                />
                <meta name="keywords" content="HCL Pump Ponorogo, pompa air, pompa industri, pompa rumah tangga, produk pompa, jual pompa Ponorogo" />

                {/* Open Graph Tags */}
                <meta property="og:title" content={`Produk | HCL Pump Ponorogo`} />
                <meta
                    property="og:description"
                    content="Lihat daftar produk unggulan dari HCL Pump Ponorogo yang siap memenuhi kebutuhan pompa air Anda dengan performa terbaik."
                />
                <meta property="og:image" content={`${base_url}/asset/logo-hcl-pump-ponorogo.png`} />

                <meta property="og:url" content={`${base_url}${location.pathname}`} />
                <meta property="og:type" content="article" />

                {/* SEO Related */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>

            <Navigasi />

            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Produk Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1">HCL Pump Ponorogo Menghadirkan Inovasi dan Kualitas Terbaik untuk Solusi Pompa Air</h1>
                        <p className="p-body-text-lg">
                            HCL Pump Ponorogo menyediakan solusi pompa air berkualitas tinggi yang dirancang untuk memenuhi berbagai kebutuhan, mulai
                            dari rumah tangga hingga industri. Dengan sertifikasi SNI, produk kami, seperti pompa submersible dan centrifugal,
                            menawarkan efisiensi energi, daya tahan tinggi, dan instalasi yang mudah.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto mb-15 w-full">
                {products.length > 0 ? (
                    <div className="grid w-full gap-6 px-4 md:grid-cols-2 md:gap-4 md:px-0 lg:grid-cols-3 lg:gap-6">
                        {products.map((product: Product, i) => (
                            <div key={i}>
                                <ProductCard
                                    title={product.title}
                                    img={product.product_images![0].image_path}
                                    href={`/produk/${product.slug}`}
                                    image_alt={product.title}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full py-10 text-center">
                        <p className="h3 opacity-50">Belum ada produk yang tersedia.</p>
                    </div>
                )}
            </section>

            <CtaComponent
                href={social_media_link}
            />

            <Footer social_media={social_media} address={addressData} />
        </>
    );
}
