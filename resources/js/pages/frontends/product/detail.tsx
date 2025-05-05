import Caraousel from '@/components/custom/Caraousel';
import CtaComponent from '@/components/custom/CtaComponent';
import ProductCard from '@/components/custom/ProductCard';
import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';

export default function ProductDetail() {
    return (
        <>
            <Head title="Detail Produk" />
            <Navigasi />

            <section className="text-secondary-color mx-auto px-4 md:px-6">
                <div className="my-10 grid lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="h2 text-primary-color">Produk Kami</p>
                    </div>
                    <div className="lg:col-span-8">
                        <h1 className="h1 font-medium">HCL PUMP 4SPM5-17</h1>
                        <p className="p-body-text-lg my-15">
                            Mauris vitae quam in justo dictum sodales. In eget tortor a nunc vehicula tempor. Nam ac tincidunt ipsum, eget accumsan
                            nisi. Praesent porta, magna vitae dapibus pharetra, erat eros efficitur nunc, in mattis lectus libero a velit. Nulla
                            facilisi. Nullam nec turpis et arcu egestas commodo. Integer sit amet metus non tortor tincidunt interdum. Donec et metus
                            mollis, ultricies est at, ultricies nulla. Morbi non libero magna. Praesent imperdiet magna ac ipsum cursus, ut fermentum
                            turpis tincidunt.
                        </p>
                        <div className="my-10 flex justify-center">
                            <Caraousel images={['/asset/contoh-gambar-pompa.png', '/asset/gambar-ilustrasi-artikel.png']} />
                        </div>

                        <p className="h2">Integer ullamcorper felis sit amet.</p>

                        <div className="my-5">
                            <p className="text-xl text-red-500 line-through">Rp 7.500.00</p>
                            <p className="h1">Rp 7.250.00</p>
                        </div>

                        <div>
                            <p className='h3'>Secification: </p>
                            <p className='p-body-text-lg mb-10'>
                                Marketing automation streamlines repetitive tasks and workflows, allowing marketers to focus on strategic activities.
                                Automation tools can manage email campaigns, social media posts, lead nurturing, and customer segmentation. By
                                automating routine processes, businesses can improve efficiency, maintain consistency, and scale their marketing
                                efforts. Video marketing has gained immense popularity as a powerful tool for engaging audiences. Videos can convey
                                complex information in an easily digestible format, making them ideal for product demonstrations, tutorials, and
                                storytelling. Platforms like YouTube and TikTok offer vast reach, while live streaming provides real-time interaction
                                with viewers. Personalization in marketing tailors messages and offers to individual consumers based on their
                                preferences, behavior, and demographics. Advanced data analytics and machine learning algorithms enable businesses to
                                deliver highly relevant content, improving engagement and conversion rates. Personalization fosters a deeper
                                connection between brands and their customers.
                            </p>
                        </div>
                        <Link href='' className='bg-primary-color text-white p-2 px-5 rounded-3xl'>Beli Sekarang</Link>
                    </div>
                </div>
            </section>

            <section className='text-secondary-color mx-auto px-4 md:px-6 my-20'>
                <div className='grid lg:grid-cols-12'>
                    <div className='lg:col-span-4'>
                        <p className='h2 text-primary-color'>Produk Lainnya</p>
                    </div>
                    <div className='lg:col-span-8'>
                        <p className='h1'>HCL Pump Indonesia Menghadirkan Inovasi dan Kualitas Terbaik untuk Solusi Pompa Air</p>
                    </div>
                </div>
                
                <div className='grid lg:grid-cols-3 gap-6 my-10'>
                    <div>
                        <ProductCard/>
                    </div>
                    <div>
                        <ProductCard/>
                    </div>
                    <div>
                        <ProductCard/>
                    </div>
                </div>
            </section>

            <CtaComponent/>
            
            <Footer/>
        </>
    );
}
