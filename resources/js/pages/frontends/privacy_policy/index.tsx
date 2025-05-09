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

interface PrivacyPolicyIndexProps {
    social_media: SocialMediaData[];
    addressData?: addressData[];
}
export default function PrivacyPolicy({ privacy_policy = {}, social_media, base_url = '',addressData }: PrivacyPolicyIndexProps) {

    const privacyPolicyData = Array.isArray(privacy_policy) ? privacy_policy[0] : privacy_policy;

    // Sanitasi konten
    const sanitizedContent = privacyPolicyData?.privacy_policy
        ? DOMPurify.sanitize(privacyPolicyData.privacy_policy)
        : '';

    return (
        <>
            <Head title="Kebijakan Privasi">
                <meta name="title" content={privacyPolicyData?.meta?.meta_title || "Kebijakan Privasi | HCL Pump Ponorogo"} />
                <meta
                    name="description"
                    content={privacyPolicyData?.meta?.meta_description || "Kebijakan privasi resmi HCL Pump Ponorogo tentang pengumpulan, penggunaan, dan perlindungan data pengguna."}
                />
                <meta
                    name="keywords"
                    content={privacyPolicyData?.meta?.meta_keywords || "kebijakan privasi, HCL Pump, Ponorogo, keamanan data, perlindungan privasi"}
                />

                <meta property="og:title" content={privacyPolicyData?.meta?.meta_title || "Kebijakan Privasi | HCL Pump Ponorogo"} />
                <meta
                    property="og:description"
                    content={privacyPolicyData?.meta?.meta_description || "Kebijakan privasi resmi HCL Pump Ponorogo tentang pengumpulan, penggunaan, dan perlindungan data pengguna."}
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
                {sanitizedContent ? (
                    <article
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                ) : (
                    <article className="prose max-w-none">
                        <p>Kebijakan privasi sedang dalam proses pembaruan. Silakan kunjungi kembali halaman ini nanti.</p>
                    </article>
                )}
                <div className="text-text-color"></div>
            </section>

            <Footer social_media={social_media}  address={addressData} />
        </>
    );
}
