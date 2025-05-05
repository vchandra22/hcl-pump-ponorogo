import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/footer';
import ProductCard from '@/components/custom/ProductCard';
import ArticleCard from '@/components/custom/ArticleCard';

export default function Beranda() {
    return (
        <>
            <Head title="Beranda">{/*some head meta*/}</Head>

            <Navigasi />

            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-24 lg:py-72">
                <img src="/asset/gambar-banner.png" className={'absolute top-0 left-0 h-full w-full overflow-hidden object-cover'} alt="" />
                <div className={'bg-secondary-color/60 absolute top-0 left-0 z-10 h-full w-full'}></div>
                <div className="relative z-20 container mx-auto px-4">
                    <div className="lg:max-w-2/3">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-bg-color text-center text-3xl h1 font-bold tracking-tighter sm:text-5xl lg:text-start xl:text-6xl/none">
                                    HCL – Pilihan Cerdas untuk Pompa Air yang Mengalir Tanpa Henti
                                </h1>
                                <p className="text-bg-color pt-2 text-center md:text-xl lg:pt-8 lg:text-start">
                                    HCL Water Pump hadir sebagai solusi terbaik untuk Anda yang membutuhkan pompa air dengan performa tangguh dan daya
                                    tahan luar biasa. Dengan teknologi modern dan material berkualitas, pompa HCL mampu bekerja terus-menerus tanpa
                                    mudah panas atau macet. Cocok untuk kebutuhan rumah tangga, industri, hingga pertanian.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:px-6 md:py-24 lg:py-32">
                <div className="mx-auto px-4 md:px-6">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-12">
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
                            <div>
                                <ProductCard />
                            </div>
                            <div>
                                <ProductCard />
                            </div>
                            <div>
                                <ProductCard />
                            </div>
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
                            <div className="w-full">
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

                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />

                    <div className="text-primary-color flex items-center justify-center py-12">
                        <Link href="#" as="button" preserveScroll className="cursor-pointer text-lg hover:underline md:text-2xl">
                            Lihat Artikel Lainnya
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative w-full overflow-hidden py-8 text-white md:py-12 lg:py-32">
                <img
                    src="/asset/gambar-ilustrasi-background.png"
                    className={'absolute top-0 left-0 h-full w-full overflow-hidden object-cover'}
                    alt=""
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
                                        href="#"
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

            <Footer />
        </>
    );
}
