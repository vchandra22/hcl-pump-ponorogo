import Footer from '@/components/footer';
import Navigasi from '@/components/navigasi';
import { Head, Link } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Kontak Kami">{/*some head meta*/}</Head>

            <Navigasi />
            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Hubungi Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">Kami siap membantu Anda menemukan solusi pompa terbaik. </h1>
                        <p className="p-body-text-lg text-text-color">
                            Sebagai penyedia pompa air dan minyak berkualitas tinggi, HCL Pump Indonesia selalu berkomitmen menghadirkan solusi
                            terbaik dan pelayanan maksimal bagi setiap pelanggan. Kami siap terhubung dengan Anda di mana pun berada. Hubungi kami
                            untuk penawaran, solusi, atau informasi lebih lanjut.
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

            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Informasi Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">
                            Untuk informasi lebih lanjut atau pemesanan, silakan hubungi kami melalui kontak berikut{' '}
                        </h1>
                        <p className="h2 text-text-color">Alamat dan Kontak Kami</p>
                        <div className="flex flex-col items-start justify-start space-y-8">
                            <div className="flex items-center space-x-8">
                                <FacebookIcons className="bg-secondary-color" />
                                <Link href="#" className="font-regular text-text-color p-body-text-lg cursor-pointer hover:underline">
                                    HCLPUMP_PONOROGO
                                </Link>
                            </div>
                            <div className="flex items-center space-x-8">
                                <FacebookIcons className="bg-secondary-color" />
                                <Link href="#" className="font-regular text-text-color p-body-text-lg cursor-pointer hover:underline">
                                    HCLPUMP_PONOROGO
                                </Link>
                            </div>
                            <div className="flex items-center space-x-8">
                                <FacebookIcons className="bg-secondary-color" />
                                <Link href="#" className="font-regular text-text-color p-body-text-lg cursor-pointer hover:underline">
                                    HCLPUMP_PONOROGO
                                </Link>
                            </div>
                            <div className="flex items-center space-x-8">
                                <FacebookIcons className="bg-secondary-color" />
                                <Link href="#" className="font-regular text-text-color p-body-text-lg cursor-pointer hover:underline">
                                    HCLPUMP_PONOROGO
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto my-15 w-full px-4 md:px-12">
                <div className="grid lg:grid-cols-12">
                    <p className="text-primary-color h2 lg:col-span-4">Pesan Untuk Kami</p>
                    <div className="flex flex-col gap-y-9 lg:col-span-8">
                        <h1 className="h1 text-secondary-color">Silakan tinggalkan pesan Anda melalui formulir di bawah ini.</h1>
                        <p className="p-body-text-lg text-text-color">
                            Apabila Anda memiliki pertanyaan dan pesan untuk kami, silakan tinggalkan pesan dengan menghubungi kontak yang tertera
                            atau dengan mengisi formulir di bawah ini. Kami akan sangat senang mendengar dan menjawab pesan Anda.
                        </p>
                        <div>
                            <form className="w-full">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-text-color h2 mb-4">Isi formulir dibawah ini:</p>
                                    </div>

                                    <div className="flex flex-col gap-y-6">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="nama">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="nama"
                                            name="nama"
                                            placeholder="John Doe"
                                            className="rounded-md border border-gray-300 p-2"
                                            required
                                        />
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
                                            className="rounded-md border border-gray-300 p-2"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="telp">
                                            Nomor Telp <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="telp"
                                            name="telp"
                                            placeholder="081234567890"
                                            className="rounded-md border border-gray-300 p-2"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-text-color font-regular p-subheading" htmlFor="pesan">
                                            Pesan Anda <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="pesan"
                                            name="pesan"
                                            rows="6"
                                            placeholder="Tuliskan pesan Anda"
                                            className="rounded-md border border-gray-300 p-2"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="bg-primary-color hover:bg-primary-color/80 text-bg-color font-regular rounded-full px-10 py-4 transition duration-300"
                                        >
                                            Kirim Pesan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

function FacebookIcons(props: any) {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M29.3334 15.9998C29.3334 8.63984 23.3601 2.6665 16.0001 2.6665C8.64008 2.6665 2.66675 8.63984 2.66675 15.9998C2.66675 22.4532 7.25342 27.8265 13.3334 29.0665V19.9998H10.6667V15.9998H13.3334V12.6665C13.3334 10.0932 15.4267 7.99984 18.0001 7.99984H21.3334V11.9998H18.6667C17.9334 11.9998 17.3334 12.5998 17.3334 13.3332V15.9998H21.3334V19.9998H17.3334V29.2665C24.0667 28.5998 29.3334 22.9198 29.3334 15.9998Z"
                fill="#1C333B"
            />
        </svg>
    );
}
