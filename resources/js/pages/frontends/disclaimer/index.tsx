import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head } from '@inertiajs/react';
import DOMPurify from 'dompurify';

interface SocialMediaData {
    id: string;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
}

interface addressData {
    address: string[];
}
interface DisclaimerIndexProps {
    social_media: SocialMediaData[];
    addressData?: addressData[];
}

export default function DisclaimerIndex({ disclaimer = {}, social_media, base_url = '',addressData }: DisclaimerIndexProps) {

    const disclaimerData = Array.isArray(disclaimer) ? disclaimer[0] : disclaimer;

    // Sanitasi konten
    const sanitizedContent = disclaimerData?.disclaimer
        ? DOMPurify.sanitize(disclaimerData.disclaimer)
        : '';

    return (
        <>
            <Head title="Disclaimer">
                <meta name="title" content={disclaimerData?.meta?.meta_title || "Disclaimer | HCL Pump Ponorogo"} />
                <meta
                    name="description"
                    content={disclaimerData?.meta?.meta_description || "Disclaimer resmi HCL Pump Ponorogo mengenai batasan tanggung jawab dan informasi yang disediakan pada situs web kami."}
                />
                <meta
                    name="keywords"
                    content={disclaimerData?.meta?.meta_keywords || "disclaimer, HCL Pump, Ponorogo, batasan tanggung jawab, informasi situs"}
                />

                <meta property="og:title" content={disclaimerData?.meta?.meta_title || "Disclaimer | HCL Pump Ponorogo"} />
                <meta
                    property="og:description"
                    content={disclaimerData?.meta?.meta_description || "Disclaimer resmi HCL Pump Ponorogo mengenai batasan tanggung jawab dan informasi yang disediakan pada situs web kami."}
                />
                <meta property="og:image" content={`${base_url}/asset/logo-hcl-pump-ponorogo.png`} />
                <meta property="og:url" content={`${base_url}${location.pathname}`} />
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
                                Disclaimer
                            </p>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="w-full">
                                <h1 className="text-text-color font-regular h1">
                                    Disclaimer HCL Pump Ponorogo
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
                        <p className="p-subheading font-regular text-text-color text-start">
                            Semua informasi di situs web ini diterbitkan dengan itikad baik dan hanya untuk tujuan informasi umum. HCL Pump Ponorogo tidak memberikan jaminan
                            apa pun tentang kelengkapan, keandalan, dan keakuratan informasi ini. Segala tindakan yang Anda ambil atas informasi yang Anda temukan
                            di situs web ini sepenuhnya merupakan risiko Anda sendiri. HCL Pump Ponorogo tidak bertanggung jawab atas kerugian atau kerusakan sehubungan
                            dengan penggunaan situs ini.
                        </p>
                    </article>
                )}
                <div className="text-text-color"></div>
            </section>

            <Footer social_media={social_media} address={addressData} />
        </>
    );
}
