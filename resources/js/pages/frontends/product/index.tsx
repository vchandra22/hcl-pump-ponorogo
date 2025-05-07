import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Product } from '@/types/product';
import { Head } from '@inertiajs/react';

interface ProductIndexProps {
    products: Product[];
}

export default function ProductIndex({ products }: ProductIndexProps) {
    console.log(products);
    return (
        <>
            <Head title="Produk" />
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
                    <div className="grid w-full gap-6 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                        {products.map((product: Product, i) => (
                            <div key={i}>
                                <ProductCard title={product.title} img={product.product_images![0].image_path} href={`/product/${product.slug}`} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center py-10">
                        <p className='h3 opacity-50'>Belum ada produk yang tersedia.</p>
                    </div>
                )}
            </section>

            <CtaComponent />

            <Footer />
        </>
    );
}
