import CustomInputFile from '@/components/custom/CustomInputFile';
import QuillEditor from '@/components/custom/quill-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ProductFormData } from '@/types/product';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image, Trash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajeman Produk',
        href: '/products',
    },
    {
        title: 'Tambah Produk',
        href: '',
    },
];

type Status = {
    success: string;
    failed: string;
}

interface CreateProductProps {
    status: Status;
}

export default function CreateProduct({ status }: CreateProductProps) {
    const { data, setData, submit, processing, errors } = useForm<ProductFormData>({
        title: '',
        short_description: '',
        price: '0',
        sale_price: '0',
        is_featured: false,
        is_active: true,
        product_images: null,
        description: '',
        specification: '',
        additional_info: '',
        meta_title: null,
        meta_description: '',
        meta_keywords: '',
        og_image: null,
        image_alt: '',
    });
    const og_image = useRef<HTMLInputElement>(null);

    const handleFiles = (data: File[]) => {
        setData('product_images', data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submit('post', route('product.store'), {
            forceFormData: true,
        });
    };

    useEffect(() => {
        if(status.failed) toast.error(status.failed);
    }, [status.failed]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk" />
            <Toaster />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Tabs defaultValue="product" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="product" className="cursor-pointer">
                            Produk
                        </TabsTrigger>
                        <TabsTrigger value="seo" className="cursor-pointer">
                            SEO & Meta
                        </TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <TabsContent value="product">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => {
                                            setData('title', e.target.value);
                                            setData('meta_title', e.target.value);
                                        }}
                                        placeholder="Masukkan nama produk"
                                    />
                                    <InputError message={errors?.title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="short_description">Deskripsi singkat Produk *</Label>
                                    <Textarea
                                        id="short_description"
                                        value={data.short_description}
                                        onChange={(e) => {
                                            setData('short_description', e.target.value);
                                            setData('meta_description', e.target.value);
                                        }}
                                        placeholder="Masukkan deskripsi singkat produk"
                                        rows={3}
                                    />
                                    <InputError message={errors?.short_description} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Harga *</Label>
                                    <Input
                                        id="price"
                                        value={data.price}
                                        type="number"
                                        className="no-spinner"
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="Masukkan harga produk"
                                    />
                                    <InputError message={errors?.price} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sale_price">Harga Jual *</Label>
                                    <Input
                                        id="sale_price"
                                        value={data.sale_price}
                                        type="number"
                                        className="no-spinner"
                                        onChange={(e) => setData('sale_price', e.target.value)}
                                        placeholder="Masukkan harga jual produk"
                                    />
                                    <InputError message={errors?.sale_price} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="is_featured">Produk Utama</Label>
                                    <div className="mt-1 flex gap-2">
                                        <Checkbox
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', !!checked)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="is_featured"
                                                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Jadikan Produk Utama
                                            </label>
                                            <p className="text-muted-foreground text-sm">Jika di centang maka akan menjadi produk utama.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="is_active">Produk Aktif *</Label>
                                    <div className="mt-1 flex gap-2">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', !!checked)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="is_active"
                                                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Jadikan Produk Aktif
                                            </label>
                                            <p className="text-muted-foreground text-sm">Jika di centang maka produk akan akan tampil di halaman.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <CustomInputFile onChange={handleFiles} />
                                    <InputError message={errors?.product_images} />
                                </div>

                                <p className="-mb-4 text-lg font-bold">Detail Produk</p>

                                <div className="mb-10">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <QuillEditor
                                        id="description"
                                        value={data.description}
                                        onChange={(value) => setData('description', value)}
                                        placeholder="Masukkan deskripsi produk"
                                        height="250px"
                                    />
                                    <InputError />
                                </div>

                                <div className="mb-10">
                                    <Label htmlFor="specification">Spesifikasi</Label>
                                    <QuillEditor
                                        id="specification"
                                        value={data.specification}
                                        onChange={(value) => setData('specification', value)}
                                        placeholder="Masukkan spesifikasi produk"
                                        height="250px"
                                    />
                                    <InputError />
                                </div>

                                <div className="mb-10">
                                    <Label htmlFor="additional_info">Info(opsional)</Label>
                                    <QuillEditor
                                        id="additional_info"
                                        value={data.additional_info}
                                        onChange={(value) => setData('additional_info', value)}
                                        placeholder="Masukkan spesifikasi produk"
                                        height="250px"
                                    />

                                    <InputError />
                                </div>
                            </div>
                        </TabsContent>
                        {/* seo */}
                        <TabsContent value="seo">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={data.meta_title ?? ''}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                        placeholder="Meta title untuk SEO"
                                    />
                                    <InputError message={errors?.meta_title} />
                                    <span className="text-xs text-gray-400">Judul yang akan muncul di hasil pencarian (50-60 karakter).</span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        value={data.meta_description ?? ''}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                        placeholder="Deskripsi untuk SEO"
                                        rows={3}
                                    />
                                    <InputError message={errors?.meta_description} />
                                    <span className="text-xs text-gray-400">Deskripsi yang akan muncul di hasil pencarian (120-160 karakter).</span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                    <Input
                                        id="meta_keywords"
                                        value={data.meta_keywords ?? ''}
                                        onChange={(e) => setData('meta_keywords', e.target.value)}
                                        placeholder="Kata kunci (dipisahkan dengan koma)"
                                    />
                                    <InputError />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="og_image">Open Graph Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="og_image"
                                            ref={og_image}
                                            type="file"
                                            accept="image/*"
                                            className="flex-1"
                                            onChange={(e) => {
                                                if (e.target.files) setData('og_image', e.target.files[0]);
                                            }}
                                        />
                                        <Button type="button" variant="outline" onClick={() => og_image.current?.click()}>
                                            <Image className="mr-2 h-4 w-4" />
                                            Upload
                                        </Button>
                                    </div>
                                    {data.og_image && (
                                        <div
                                            className="flex justify-center"
                                            onClick={() => {
                                                setData('og_image', null);

                                                if (og_image.current) og_image.current.value = '';
                                            }}
                                        >
                                            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-7">
                                                <div className="relative h-32 w-32 overflow-hidden rounded bg-gray-200 shadow">
                                                    <span className="group absolute block h-full w-full cursor-pointer hover:bg-black/50">
                                                        <Trash className="relative top-[40%] left-[40%] hidden group-hover:block" color="red" />
                                                    </span>
                                                    <img src={URL.createObjectURL(data.og_image)} className="h-full w-full object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <InputError />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image_alt">Image Alt Text</Label>
                                    <Input
                                        id="image_alt"
                                        value={data.image_alt ?? ''}
                                        onChange={(e) => setData('image_alt', e.target.value)}
                                        placeholder="Teks alternatif untuk gambar"
                                    />
                                    <InputError />
                                    <span className="text-xs text-gray-400">Teks alternatif untuk aksesibilitas dan SEO.</span>
                                </div>
                            </div>
                        </TabsContent>
                        <div className="flex justify-end gap-2 pt-6">
                            <Button variant="outline" type="button" asChild>
                                <Link href={route('product.index')}>Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </Tabs>
            </div>
        </AppLayout>
    );
}
