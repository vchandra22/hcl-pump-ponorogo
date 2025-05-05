import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import ArticleCard from '@/components/custom/ArticleCard';

export default function Article() {
    return (
        <>
            <Head title="Article">{/*some head meta*/}</Head>

            <Navigasi />

            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Inspirasi untuk Anda</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">Update Terbaru Seputar Inovasi dan Teknologi Pompa</h1>
                        <p className="p-body-text-lg text-text-color">
                            Halaman ini menyediakan berbagai artikel dan berita terkait solusi pompa air dari HCL Pump Indonesia, yang bisa Anda baca
                            kapan saja. Temukan ide dan wawasan terbaru mengenai produk kami serta inovasi yang dapat meningkatkan efisiensi sistem
                            pompa Anda dalam berbagai sektor industri.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 md:px-12 my-15">
                <img
                    src="/asset/gambar-perusahaan.png"
                    width="100"
                    height="100"
                    className="w-full min-h-52 h-full object-cover overflow-hidden mx-auto"
                    alt="" />
            </section>

            <section className="mx-auto w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Kumpulan Inspirasi</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">Temukan Lebih Banyak Inspirasi Di Sini</h1>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 md:px-12 mx-auto">
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>

                <div className="text-primary-color flex items-center justify-center py-12">
                    <Link href="#" as="button" preserveScroll className="cursor-pointer text-lg hover:underline md:text-2xl">
                        Lihat Artikel Lainnya
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
