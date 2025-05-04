import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import { CircleChevronRight } from 'lucide-react';
import Footer from '@/components/footer';

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
                                <h1 className="text-bg-color text-center text-3xl font-bold tracking-tighter sm:text-5xl lg:text-start xl:text-6xl/none">
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
                                <h2 className="text-primary-color font-regular pb-2 text-3xl xl:text-4xl">Mengapa memilih kami?</h2>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <p className="text-text-color font-regular text-4xl xl:text-6xl">
                                    Pompa air HCL dirancang dengan teknologi terkini untuk memastikan performa tangguh
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-4 py-12 md:py-24 lg:grid-cols-12 lg:py-24">
                        <div className="w-full rounded-3xl border border-slate-200 lg:col-span-4">
                            <img
                                src="/asset/contoh-gambar-pompa.png"
                                width="100"
                                height="100"
                                className="mx-auto w-full overflow-hidden object-cover"
                            />
                            <div className="border border-r-0 border-b-0 border-l-0 border-t-slate-200 px-8 py-8">
                                <p className="text-text-color font-regular line-clamp-2 min-h-20 overflow-hidden text-start text-2xl md:text-3xl lg:text-4xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </p>
                                <div className="text-primary-color flex items-center justify-between pt-2 xl:pt-4">
                                    <Link href="#" as="button" preserveScroll className="text-xl md:text-2xl">
                                        Lihat Produk
                                    </Link>
                                    <CircleChevronRight className="text-primary-color" size="28" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full rounded-3xl border border-slate-200 lg:col-span-4">
                            <img
                                src="/asset/contoh-gambar-pompa.png"
                                width="100"
                                height="100"
                                className="mx-auto w-full overflow-hidden object-cover"
                            />
                            <div className="border border-r-0 border-b-0 border-l-0 border-t-slate-200 px-8 py-8">
                                <p className="text-text-color font-regular line-clamp-2 min-h-20 overflow-hidden text-start text-2xl md:text-3xl lg:text-4xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </p>
                                <div className="text-primary-color flex items-center justify-between pt-2 xl:pt-4">
                                    <Link href="#" as="button" preserveScroll className="text-xl md:text-2xl">
                                        Lihat Produk
                                    </Link>
                                    <CircleChevronRight className="text-primary-color" size="28" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full rounded-3xl border border-slate-200 lg:col-span-4">
                            <img
                                src="/asset/contoh-gambar-pompa.png"
                                width="100"
                                height="100"
                                className="mx-auto w-full overflow-hidden object-cover"
                            />
                            <div className="border border-r-0 border-b-0 border-l-0 border-t-slate-200 px-8 py-8">
                                <p className="text-text-color font-regular line-clamp-2 min-h-20 overflow-hidden text-start text-2xl md:text-3xl lg:text-4xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                </p>
                                <div className="text-primary-color flex items-center justify-between pt-2 xl:pt-4">
                                    <Link href="#" as="button" preserveScroll className="text-xl md:text-2xl">
                                        Lihat Produk
                                    </Link>
                                    <CircleChevronRight className="text-primary-color" size="28" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="mx-auto">
                            <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-12">
                                <div className="hidden lg:col-span-4 lg:block"></div>
                                <div className="col-span-8">
                                    <div className="grid w-full grid-cols-2 gap-4 xl:gap-12">
                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 text-2xl md:text-3xl xl:text-4xl">Harga Terjangkau</p>
                                            <p className="font-regular text-text-color text-start text-lg xl:text-2xl">
                                                Kami menawarkan solusi pompa berkualitas tinggi dengan harga yang kompetitif, memastikan Anda
                                                mendapatkan nilai terbaik untuk investasi Anda.
                                            </p>
                                        </div>

                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 text-2xl md:text-3xl xl:text-4xl">Kualitas Tinggi</p>
                                            <p className="font-regular text-text-color text-start text-lg xl:text-2xl">
                                                Produk kami, termasuk pompa celup (submersible) dan berbagai jenis pompa lainnya, telah meraih
                                                sertifikat SNI, menjamin kualitas dan keandalan yang telah teruji.
                                            </p>
                                        </div>

                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 text-2xl md:text-3xl xl:text-4xl">Bergaransi</p>
                                            <p className="font-regular text-text-color text-start text-lg xl:text-2xl">
                                                Kami memberikan garansi pada setiap produk kami, memberikan Anda ketenangan pikiran dan kepercayaan
                                                pada performa pompa kami.
                                            </p>
                                        </div>

                                        <div className="w-full px-8 py-2">
                                            <p className="text-primary-color pb-4 text-2xl md:text-3xl xl:text-4xl">Konsultasi Gratis</p>
                                            <p className="font-regular text-text-color text-start text-lg xl:text-2xl">
                                                Butuh bantuan untuk memilih pompa yang tepat? Tim ahli kami siap memberikan konsultasi gratis untuk
                                                memastikan Anda mendapatkan solusi yang sesuai dengan kebutuhan Anda.​
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:px-6 md:py-24 lg:py-32">
                <div className="mx-auto px-4 md:px-6">
                    <div className="grid w-full grid-cols-1 pb-8 md:pb-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-full">
                                <h2 className="text-primary-color font-regular pb-2 text-3xl xl:text-4xl">Update Artikel</h2>
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <p className="text-text-color font-regular text-4xl xl:text-6xl">
                                    Update Lengkap Tentang Teknologi dan Solusi Pompa Air
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 py-4 md:py-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-full lg:pe-8">
                                <img
                                    src="/asset/gambar-ilustrasi-artikel.png"
                                    width="100"
                                    height="100"
                                    className="mx-auto h-72 w-full overflow-hidden rounded-3xl object-cover xl:h-96"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="flex h-full flex-col items-start justify-between py-2">
                                <p className="text-primary-color font-regular line-clamp-2 h-20 cursor-pointer text-4xl hover:underline lg:h-20 xl:h-30 xl:text-6xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores dolores exercitationem expedita id
                                    incidunt, iste magnam neque officia, perferendis quis rem velit voluptatem!
                                </p>
                                <p className="text-text-color-color font-regular pt-2 text-lg xl:text-xl">4 May 2025, Admin</p>
                                <p className="text-text-color font-regular line-clamp-3 h-24 py-2 text-lg lg:h-28 xl:text-xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ducimus est exercitationem inventore, magnam
                                    nostrum quo sit voluptates. Amet animi at autem doloremque earum, enim eos facere impedit ipsum itaque magnam
                                    minima minus porro, provident ratione tempora totam, ullam velit. Blanditiis, molestias.
                                </p>
                                <div className="text-primary-color flex w-full items-center justify-between pt-2 xl:pt-4">
                                    <Link href="#" as="button" preserveScroll className="cursor-pointer text-xl hover:underline md:text-2xl">
                                        Baca Selengkapnya
                                    </Link>
                                    <CircleChevronRight className="text-primary-color me-8" size="28" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 py-4 md:py-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-full lg:pe-8">
                                <img
                                    src="/asset/gambar-ilustrasi-artikel.png"
                                    width="100"
                                    height="100"
                                    className="mx-auto h-72 w-full overflow-hidden rounded-3xl object-cover xl:h-96"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="flex h-full flex-col items-start justify-between py-2">
                                <p className="text-primary-color font-regular line-clamp-2 h-20 cursor-pointer text-4xl hover:underline lg:h-20 xl:h-30 xl:text-6xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores dolores exercitationem expedita id
                                    incidunt, iste magnam neque officia, perferendis quis rem velit voluptatem!
                                </p>
                                <p className="text-text-color-color font-regular pt-2 text-lg xl:text-xl">4 May 2025, Admin</p>
                                <p className="text-text-color font-regular line-clamp-3 h-24 py-2 text-lg lg:h-28 xl:text-xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ducimus est exercitationem inventore, magnam
                                    nostrum quo sit voluptates. Amet animi at autem doloremque earum, enim eos facere impedit ipsum itaque magnam
                                    minima minus porro, provident ratione tempora totam, ullam velit. Blanditiis, molestias.
                                </p>
                                <div className="text-primary-color flex w-full items-center justify-between pt-2 xl:pt-4">
                                    <Link href="#" as="button" preserveScroll className="cursor-pointer text-xl hover:underline md:text-2xl">
                                        Baca Selengkapnya
                                    </Link>
                                    <CircleChevronRight className="text-primary-color me-8" size="28" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 py-4 md:py-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="w-full lg:pe-8">
                                <img
                                    src="/asset/gambar-ilustrasi-artikel.png"
                                    width="100"
                                    height="100"
                                    className="mx-auto h-72 w-full overflow-hidden rounded-3xl object-cover xl:h-96"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="flex h-full flex-col items-start justify-between py-2">
                                <p className="text-primary-color font-regular line-clamp-2 h-20 cursor-pointer text-4xl hover:underline lg:h-20 xl:h-30 xl:text-6xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores dolores exercitationem expedita id
                                    incidunt, iste magnam neque officia, perferendis quis rem velit voluptatem!
                                </p>
                                <p className="text-text-color-color font-regular pt-2 text-lg xl:text-xl">4 May 2025, Admin</p>
                                <p className="text-text-color font-regular line-clamp-3 h-24 py-2 text-lg lg:h-28 xl:text-xl">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ducimus est exercitationem inventore, magnam
                                    nostrum quo sit voluptates. Amet animi at autem doloremque earum, enim eos facere impedit ipsum itaque magnam
                                    minima minus porro, provident ratione tempora totam, ullam velit. Blanditiis, molestias.
                                </p>
                                <div className="text-primary-color flex w-full items-center justify-between pt-2 xl:pt-4">
                                    <Link href="#" as="button" preserveScroll className="cursor-pointer text-xl hover:underline md:text-2xl">
                                        Baca Selengkapnya
                                    </Link>
                                    <CircleChevronRight className="text-primary-color me-8" size="28" />
                                </div>
                            </div>
                        </div>
                    </div>
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
