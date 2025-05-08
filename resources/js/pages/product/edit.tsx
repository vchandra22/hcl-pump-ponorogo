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
import { Product, ProductFormData } from '@/types/product';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image, Trash } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface EditPageProps {
    product: Product;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Produk',
        href: '/products',
    },
    {
        title: 'Edit Produk',
        href: '',
    },
];

export default function EditPage({ product }: EditPageProps) {
    const { data, setData, submit, processing, errors } = useForm<ProductFormData>({
        title: product.title ?? '',
        short_description: product.short_description ?? '',
        price: Number(product.price).toFixed(0),
        sale_price: Number(product.sale_price).toFixed(0),
        is_featured: !!product.is_featured,
        is_active: !!product.is_active,
        description: product.product_detail?.description ?? '',
        specification: product.product_detail?.specification ?? '',
        additional_info: product.product_detail?.additional_info ?? '',
        meta_title: product.meta?.meta_title ?? '',
        meta_description: product.meta?.meta_description ?? '',
        meta_keywords: product.meta?.meta_keywords ?? '',
        image_alt: product.meta?.image_alt ?? '',
        product_images: null,
        og_image: null,
        old_og_image: product.meta?.og_image ?? '' 
    });
    const og_image = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submit('post', `/products/${product.id}/update`, { forceFormData: data.product_images ? true : false });
    };

    useEffect(() => {
        if (data.product_images?.length == 0) setData('product_images', null);
    }, [data.product_images, setData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
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
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={product.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="Masukkan slug produk"
                                        readOnly
                                        disabled
                                    />
                                    <InputError message={errors?.slug} />
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
                                    <CustomInputFile
                                        onChange={(data: File[]) => setData('product_images', data)}
                                        isEdit={true}
                                        value={product.product_images}
                                    />
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

                                <div className="space-y-2">
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
                                    {(product.meta?.og_image && !data.og_image) && (
                                        <div
                                            className="flex justify-center"
                                            onClick={() => {
                                                setData('og_image', null);

                                                if (og_image.current) og_image.current.value = '';
                                            }}
                                        >
                                            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-7">
                                                <div className="relative h-32 w-32 overflow-hidden rounded bg-gray-200 shadow">
                                                    <Link method='delete' href={`/og-image/${product.meta_id}/delete`} className='h-full w-full'>
<span className="group absolute block h-full w-full cursor-pointer hover:bg-black/50">
                                                        <Trash className="relative top-[40%] left-[40%] hidden group-hover:block" color="red" />
                                                    </span>
                                                    <img src={product.meta?.og_image} className="h-full w-full object-cover" />
                                                    </Link>
                                                    
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
