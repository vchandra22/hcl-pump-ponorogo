import Caraousel from '@/components/custom/Caraousel';
import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Product } from '@/types/product';
import formatRupiah from '@/utils/formatRupiah';
import { Head, Link, usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';

interface ProductDetailProps {
    product: Product;
    products: Product[];
}

export default function ProductDetail({ product, products }: ProductDetailProps) {
    const {
        props: {
            ziggy: { url },
        },
    } = usePage();

    const sanitizedDescriptionContent = product.product_detail?.description ? DOMPurify.sanitize(product.product_detail.description) : '';

    const sanitizedSpecificationContent = product.product_detail?.specification ? DOMPurify.sanitize(product.product_detail.specification) : '';

    const sanitizedInfoContent = product.product_detail?.additional_info ? DOMPurify.sanitize(product.product_detail.additional_info) : '';

    return (
        <>
            <Head title={`${product.meta?.meta_title} | HCL Pump Ponorogo`}>
                <meta name="description" content={product.meta?.meta_description ?? ''} />
                <meta name="keywords" content={product.meta?.meta_keywords ?? ''} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={`${product.meta?.meta_title} | HCL Pump Ponorogo`} />
                <meta property="og:description" content={product.meta?.meta_description} />
                <meta
                    property="og:image"
                    content={product.meta?.og_image ? `${url}${product.meta?.og_image}` : '/asset/logo-hcl-pump-ponorogo.png'}
                />
                <meta property="og:type" content="article" />

                {/* SEO Related */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>
            <Navigasi />

            <section className="text-secondary-color mx-auto px-4 md:px-6">
                <div className="my-10 grid lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="h2 text-primary-color">Produk Kami</p>
                    </div>
                    <div className="lg:col-span-8">
                        <h1 className="h1 font-medium">{product.title}</h1>
                        <p className="p-body-text-lg my-15">{product.short_description}</p>
                        <div className="my-10 flex justify-center">
                            <Caraousel images={product.product_images!} />
                        </div>

                        <p className="h2">{product.title}</p>

                        {product.price != 0 ? (
                            <div className="my-5">
                                <p className="text-xl text-red-500 line-through">{formatRupiah(product.price)}</p>
                                <p className="h1">{formatRupiah(product.sale_price ?? 0)}</p>
                            </div>
                        ) : (
                            <div className="my-5">
                                <Link href="https://www.youtube.com" className="cursor-pointer text-blue-600 hover:underline">
                                    Hubungi kami untuk info lebih lanjut!!
                                </Link>
                            </div>
                        )}

                        <div>
                            <p className="h3">Deskripsi: </p>
                            <div className="p-body-text-lg prose mb-10" dangerouslySetInnerHTML={{ __html: sanitizedDescriptionContent }}></div>
                        </div>
                        <div className="-mt-5">
                            <p className="h3">Spesifikasi: </p>
                            <div className="p-body-text-lg prose mb-10" dangerouslySetInnerHTML={{ __html: sanitizedSpecificationContent }}></div>
                        </div>
                        <div className="-mt-5">
                            <p className="h3">Info: </p>
                            <div className="p-body-text-lg prose mb-10" dangerouslySetInnerHTML={{ __html: sanitizedInfoContent }}></div>
                        </div>
                        <Link href="" className="bg-primary-color rounded-3xl p-2 px-5 text-white">
                            Beli Sekarang
                        </Link>
                    </div>
                </div>
            </section>

            <section className="text-secondary-color mx-auto my-20 px-4 md:px-6">
                <div className="grid lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="h2 text-primary-color">Produk Lainnya</p>
                    </div>
                    <div className="lg:col-span-8">
                        <p className="h1">HCL Pump Indonesia Menghadirkan Inovasi dan Kualitas Terbaik untuk Solusi Pompa Air</p>
                    </div>
                </div>

                <div className="my-10 grid gap-6 lg:grid-cols-3">
                    {products.length > 0 ? (
                        products.map((item) => {
                            if (item.id != product.id) {
                                return (
                                    <div>
                                        <ProductCard title={item.title} img={item.product_images![0].image_path} href={`/product/${item.slug}`} />
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <p>Belun ada product.</p>
                    )}
                </div>
            </section>

            <CtaComponent />

            <Footer />
        </>
    );
}
