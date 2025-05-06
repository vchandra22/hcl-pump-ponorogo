import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Kebijakan Privasi">{/*some head meta*/}</Head>

            <Navigasi />

            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-12 lg:py-44">
                <div className={'bg-primary-color/10 absolute top-0 left-0 z-10 h-full w-full'}></div>
                <div className="relative z-20 mx-auto w-full px-4">
                    <div className="mx-auto mb-9 grid w-full grid-cols-1 px-8 md:mb-0 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="p-subheading font-regular text-text-color text-start">
                                Kebijakan Privasi
                            </p>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <h1 className="text-text-color font-regular h1">
                                    Kebijakan Privasi HCL Pump Ponorogo
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-12 md:py-24 lg:py-32">
                <p className="p-subheading font-regular text-text-color text-start">
                    Aliquam erat volutpat. Morbi molestie arcu sit amet libero porttitor, a mollis odio suscipit. Integer id augue vitae urna
                    tristique tempus. Quisque sed dolor nec dui scelerisque dapibus. Curabitur tincidunt, felis a elementum tincidunt, ex felis
                    fermentum dui, eget pulvinar arcu eros eu eros. Duis efficitur, sapien quis bibendum auctor, lectus risus feugiat sapien, ac
                    pulvinar orci est a arcu. Integer vel turpis sed purus scelerisque euismod. Maecenas euismod tristique leo, vel malesuada ligula
                    malesuada sed. Suspendisse potenti. Integer sit amet metus non tortor tincidunt interdum. Curabitur auctor, tellus in congue
                    vestibulum, lacus lacus convallis justo, at fermentum libero felis nec ligula.
                </p>
                <div className="text-text-color"></div>
            </section>

            <Footer />
        </>
    );
}
