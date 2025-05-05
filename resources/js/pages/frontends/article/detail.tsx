import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';
import ArticleCard from '@/components/custom/ArticleCard';
import { CircleChevronRight } from 'lucide-react';

export default function ArticleDetail() {
    return (
        <>
            <Head title="Detail Article">{/*some head meta*/}</Head>

            <Navigasi />

            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-24 lg:py-72">
                <img
                    src="/asset/gambar-ilustrasi-artikel.png"
                    className={'absolute top-0 left-0 h-full w-full overflow-hidden object-cover'}
                    alt=""
                />
                <div className={'bg-secondary-color/60 absolute top-0 left-0 z-10 h-full w-full'}></div>
                <div className="relative z-20 w-full mx-auto px-4">
                    <div className="mb-9 grid mx-auto px-8 w-full grid-cols-1 md:mb-0 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <Link href="/article" prefetch={false} className="w-full">
                                <p className="group bg-none border borer-bg-color text-md font-regular text-bg-color t ransition-colors inline-flex h-9 w-max items-center justify-center rounded-full px-6 py-3 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
                                    Kembali
                                </p>
                            </Link>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <h1 className="text-bg-color font-regular h1">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias consequatur ex fuga?
                                </h1>
                                <p className="py-4">12 Maret 2025, Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 px-4 md:px-12 md:py-24 lg:py-32">
                <p className="p-subheading font-regular text-text-color text-start">
                    Aliquam erat volutpat. Morbi molestie arcu sit amet libero porttitor, a mollis odio suscipit. Integer id augue vitae urna
                    tristique tempus. Quisque sed dolor nec dui scelerisque dapibus. Curabitur tincidunt, felis a elementum tincidunt, ex felis
                    fermentum dui, eget pulvinar arcu eros eu eros. Duis efficitur, sapien quis bibendum auctor, lectus risus feugiat sapien, ac
                    pulvinar orci est a arcu. Integer vel turpis sed purus scelerisque euismod. Maecenas euismod tristique leo, vel malesuada ligula
                    malesuada sed. Suspendisse potenti. Integer sit amet metus non tortor tincidunt interdum. Curabitur auctor, tellus in congue
                    vestibulum, lacus lacus convallis justo, at fermentum libero felis nec ligula.
                </p>
                <div className="text-text-color">

                </div>
            </section>

            <section className="w-full py-12 px-4 md:px-12 md:py-24 lg:py-32">
                <div className="grid w-full grid-cols-1 mb-9 md:mb-0 lg:grid-cols-12">
                    <div className="lg:col-span-4 py-4 md:py-8">
                        <div className="w-full">
                            <h2 className="text-primary-color font-regular pb-2 h2">Artikel Terkait</h2>
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <ArticleCard/>
                        <ArticleCard/>
                        <ArticleCard/>
                        <div className="text-primary-color flex w-full items-end justify-end pt-2 mt-2 xl:pt-4">
                            <Link href={'#'} as="button" preserveScroll className="cursor-pointer h3 hover:underline">
                                Baca Selengkapnya
                            </Link>
                            <CircleChevronRight className="text-primary-color me-8" size="28" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
