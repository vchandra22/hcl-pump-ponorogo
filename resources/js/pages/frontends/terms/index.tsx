import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head } from '@inertiajs/react';
import DOMPurify from 'dompurify';

export default function TermsIndex({ terms_condition = {} }) {

    const termsConditionData = Array.isArray(terms_condition) ? terms_condition[0] : terms_condition;

    // Sanitasi konten
    const sanitizedContent = termsConditionData?.terms_and_condition
        ? DOMPurify.sanitize(termsConditionData.terms_and_condition)
        : '';

    return (
        <>
            <Head title="Syarat & Ketentuan | HCL Pump Ponorogo">
                {/* Improved meta tags with default values if data is missing */}
                <meta name="title" content={termsConditionData?.meta?.meta_title || "Syarat & Ketentuan | HCL Pump Ponorogo"} />
                <meta
                    name="description"
                    content={termsConditionData?.meta?.meta_description || "Syarat dan ketentuan resmi HCL Pump Ponorogo yang mengatur penggunaan layanan dan produk kami."}
                />
                <meta
                    name="keywords"
                    content={termsConditionData?.meta?.meta_keywords || "syarat dan ketentuan, HCL Pump, Ponorogo, persyaratan layanan, peraturan penggunaan"}
                />

                {/* Added additional meta tags for SEO and sharing */}
                <meta property="og:title" content={termsConditionData?.meta?.meta_title || "Syarat & Ketentuan | HCL Pump Ponorogo"} />
                <meta
                    property="og:description"
                    content={termsConditionData?.meta?.meta_description || "Syarat dan ketentuan resmi HCL Pump Ponorogo yang mengatur penggunaan layanan dan produk kami."}
                />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>

            <Navigasi />

            <section className="relative w-full overflow-hidden py-12 text-white md:px-6 md:py-12 lg:py-44">
                <div className={'bg-primary-color/10 absolute top-0 left-0 z-10 h-full w-full'}></div>
                <div className="relative z-20 mx-auto w-full px-4">
                    <div className="mx-auto mb-9 grid w-full grid-cols-1 px-8 md:mb-0 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="p-subheading font-regular text-text-color text-start">
                                Syarat & Ketentuan
                            </p>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <h1 className="text-text-color font-regular h1">
                                    Syarat & Ketentuan HCL Pump Ponorogo
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 py-12 md:px-12 md:py-24 lg:py-32">
                {sanitizedContent ? (
                    <article
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                ) : (
                    <article className="prose max-w-none">
                        <p className="text-text-color text-start">
                            Konten Syarat & Ketentuan belum tersedia. Silakan kembali lagi nanti.
                        </p>
                    </article>
                )}
                <div className="text-text-color"></div>
            </section>

            <Footer />
        </>
    );
}
