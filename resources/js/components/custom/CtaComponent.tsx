import { Link } from "@inertiajs/react";

interface CtaComponentProps {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
}

export default function CtaComponent({ title, description, buttonText, href }: CtaComponentProps) {
    return (
        <section className="relative w-full overflow-hidden py-8 text-white md:py-12 lg:py-32">
            <img src="/asset/gambar-ilustrasi-background.png" width={"100"} height={"100"} className={'absolute top-0 left-0 h-full w-full overflow-hidden object-cover'} alt="HCL Pump Ponorogo" />
            <div className="relative z-20 container mx-auto">
                <div className="mx-auto max-w-11/12">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-bg-color pt-2 text-center text-2xl">{ title ?? 'Layanan & Harga' }</p>
                                <p className="text-bg-color font-regular text-center text-3xl sm:text-5xl xl:text-6xl/none">
                                    {description ?? 'Butuh Pompa dan Pengeboran Sekaligus? Kami Siap Bantu!'}
                                </p>
                            </div>
                            <div className="mx-auto mt-8 flex w-full justify-center">
                                <Link
                                    href={ href ?? '#'}
                                    className="border-bg-color font-regular text-bg-color t ransition-colors inline-flex h-9 w-max items-center justify-center rounded-full border bg-transparent px-12 py-6 text-center text-2xl hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                    prefetch={false}
                                >
                                    { buttonText ?? 'Hubungi Kami'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
