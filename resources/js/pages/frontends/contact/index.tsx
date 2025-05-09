import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, useForm } from '@inertiajs/react';
import { ClockIcon, LocateIcon, LucideMail, PhoneIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';

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
interface ContactProps {
    social_media: SocialMediaData[];
    addressData?: addressData[];
}

export default function Contact({ contacts = {}, social_media, base_url = '' ,addressData}: ContactProps) {
    // Removed flash prop
    const contactData = Array.isArray(contacts) ? contacts[0] : contacts;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('pesan.store'), {
            onSuccess: () => {
                reset();
                toast.success('Pesan berhasil terkirim!');
            },
            onError: (errors) => {
                if (errors.message) {
                    toast.error(errors.message);
                } else {
                    toast.error('Terjadi kesalahan pada pengisian form');
                }
            },
        });
    };

    return (
        <>
            <Head title={'Kontak Kami'}>
                <meta name="title" content={contactData?.meta?.meta_title ?? 'Kontak Kami'} />
                <meta
                    name="description"
                    content={
                        contactData?.meta?.meta_description ??
                        'Hubungi HCL Pump Ponorogo untuk informasi produk, layanan, dan konsultasi pompa industri terpercaya.'
                    }
                />
                <meta
                    name="keywords"
                    content={contactData?.meta?.meta_keywords ?? 'kontak HCL Pump, Ponorogo, layanan pelanggan, konsultasi pompa, informasi produk'}
                />

                {/* Meta untuk Open Graph dan SEO */}
                <meta property="og:title" content={contactData?.meta?.meta_title ?? 'Kontak Kami'} />
                <meta
                    property="og:description"
                    content={
                        contactData?.meta?.meta_description ??
                        'Hubungi HCL Pump Ponorogo untuk informasi produk, layanan, dan konsultasi pompa industri terpercaya.'
                    }
                />
                <meta property="og:image" content={`${base_url}/asset/logo-hcl-pump-ponorogo.png`} />
                <meta property="og:url" content={`${base_url}${location.pathname}`} />
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="Indonesian" />
            </Head>

            <Navigasi />
            <Toaster />
            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Hubungi Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">{contactData.title}</h1>
                        <div className="p-body-text-lg text-text-color" dangerouslySetInnerHTML={{ __html: contactData.description }} />
                    </div>
                </div>
            </section>

            <section className="my-15 px-4 md:px-12">
                <div className="h-full min-h-52 w-full block md:flex gap-4 space-y-4  md:space-y-0 overflow-hidden" dangerouslySetInnerHTML={{ __html: contactData.gmaps_embed_code }} />
            </section>

            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Informasi Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <p className="h1 text-secondary-color">
                            Untuk informasi lebih lanjut atau pemesanan, silakan hubungi kami melalui kontak berikut{' '}
                        </p>
                        <p className="h2 text-text-color">Alamat dan Kontak Kami</p>
                        <div className="flex flex-col items-start justify-start space-y-8">
                            <div className="flex items-center space-x-8">
                                <LucideMail />
                                <a
                                    href={`mailto:${contactData.email}`}
                                    className="font-regular text-text-color p-body-text-lg cursor-pointer hover:underline"
                                >
                                    {contactData.email}
                                </a>
                            </div>
                            <div className="flex items-center space-x-8">
                                <PhoneIcon />
                                <a
                                    href={`https://wa.me/${contactData.phone}`}
                                    target={'_blank'}
                                    className="font-regular text-text-color p-body-text-lg cursor-pointer hover:underline"
                                >
                                    +{contactData.phone}
                                </a>
                            </div>
                            {contactData.address.split(',').map((alamat, index) => (
                                <div className="flex items-center space-x-8">
                                    <LocateIcon />
                                    <div className="flex flex-col">
                                            <span key={index} className="font-regular text-text-color p-body-text-lg">
                                                {alamat.trim()}
                                            </span>
                                    </div>
                                </div>
                            ))
                            }
                            <div className="flex items-center space-x-8">
                                <ClockIcon />
                                <span className="font-regular text-text-color p-body-text-lg">{contactData.business_hours}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Pesan Untuk Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <p className="h1 text-secondary-color">Silakan tinggalkan pesan Anda melalui formulir di bawah ini.</p>
                        <p className="p-body-text-lg text-text-color">
                            Apabila Anda memiliki pertanyaan dan pesan untuk kami, silakan tinggalkan pesan dengan menghubungi kontak yang tertera
                            atau dengan mengisi formulir di bawah ini. Kami akan sangat senang mendengar dan menjawab pesan Anda.
                        </p>
                        <div>
                            <form className="w-full" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-text-color h2 mb-4">Isi formulir dibawah ini:</p>
                                    </div>

                                    <div className="flex flex-col gap-y-6">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="name">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            className={`rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2`}
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="email">
                                            Alamat Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john.doe@example.com"
                                            className={`rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2`}
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="phone">
                                            Nomor Telp <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="081234567890"
                                            className={`rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2`}
                                            required
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <div className="mt-1 text-sm text-red-500">{errors.phone}</div>}
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="message">
                                            Pesan Anda <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            placeholder="Tuliskan pesan Anda"
                                            className={`rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-300'} p-2`}
                                            required
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                        ></textarea>
                                        {errors.message && <div className="mt-1 text-sm text-red-500">{errors.message}</div>}
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="bg-primary-color hover:bg-primary-color/80 text-bg-color font-regular rounded-full px-10 py-4 transition duration-300"
                                            disabled={processing}
                                        >
                                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer social_media={social_media} address={addressData}/>
        </>
    );
}
