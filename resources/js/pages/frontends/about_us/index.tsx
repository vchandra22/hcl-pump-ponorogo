import AboutCard from '@/components/custom/AboutCard';
import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head } from '@inertiajs/react';

export default function AboutUsIndex() {
    return (
        <>
            <Head title="Article">{/*some head meta*/}</Head>
            <Navigasi />
            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Tentang Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1">HCL Pump Indonesia Menghadirkan Inovasi dan Kualitas Terbaik untuk Solusi Pompa Air</h1>
                        <p className="p-body-text-lg">
                            HCL Pump Indonesia adalah penyedia pompa air dan minyak berkualitas tinggi yang telah dipercaya oleh ribuan pelanggan di
                            seluruh Indonesia. Kami tidak hanya menjual produk pompa, tetapi juga menawarkan solusi menyeluruh untuk kebutuhan
                            distribusi air, termasuk layanan pengeboran sumur profesional.
                        </p>
                        <p className="p-body-text-lg">
                            Dengan pengalaman dan komitmen terhadap kualitas, kami menghadirkan pompa celup bersertifikat SNI yang dirancang untuk
                            ketahanan, efisiensi, dan performa maksimal. Mulai dari kebutuhan rumah tangga hingga industri, produk HCL hadir sebagai
                            pilihan terbaik untuk sistem perpompaan Anda.
                        </p>
                    </div>
                </div>
            </section>

            <section className="my-15 px-4 md:px-12">
                <img
                    src="/asset/gambar-perusahaan.png"
                    width="100"
                    height="100"
                    className="mx-auto h-full min-h-52 w-full overflow-hidden object-cover"
                    alt=""
                />
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
                            <div>
                                <ProductCard />
                            </div>
                            <div>
                                <ProductCard />
                            </div>
                            <div>
                                <ProductCard />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="mt-9 md:mb-4 lg:mb-3 lg:mt-0">
                    <p className="text-primary-color text-center">Lihat produk lainya</p>
                </div>
            </section>
            <CtaComponent />
            <Footer />
        </>
    );
}
