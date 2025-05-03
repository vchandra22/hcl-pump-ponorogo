import CustomInputFile from '@/components/custom/CustomInputFile';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image } from 'lucide-react';

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

type ProductFormData = {
  title: string;
  slug: string;
  short_description: string;
  price: string;
  sale_price: string;
  is_featured: boolean;
  is_active: boolean;
  product_images: File[] | null;
  description: string;
  specification: string;
  additional_info: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image: File | null;
  image_alt: string | null;
}

export default function CreateProduct() {
    const { data, setData, submit, processing,  errors } = useForm<ProductFormData>({
        title: '',
        slug: '',
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

    const handleFiles = (data: File[]) => {
        setData('product_images', data);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      submit('post', route('product.store'), {
        forceFormData: true,
      });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk" />
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

                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <TabsContent value="product">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => {
                                            setData('title', e.target.value)
                                            setData('meta_title', e.target.value)
                                          }
                                        }
                                        placeholder="Masukkan nama produk"
                                    />
                                    <InputError message={errors?.title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="Masukkan slug produk"
                                    />
                                    <InputError message={errors?.slug} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="short_description">Deskripsi singkat Produk *</Label>
                                    <Textarea
                                        id="short_description"
                                        value={data.short_description}
                                        onChange={(e) => {
                                            setData('short_description', e.target.value)
                                            setData('meta_description', e.target.value)
                                          }
                                        }
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

                                <div className='space-y-10'>
                                  <CustomInputFile onChange={handleFiles} />
                                  <InputError message={errors?.product_images}/>
                                </div>
                                
                                <p className="-mb-4 text-lg font-bold">Detail Produk</p>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Masukkan deskripsi produk"
                                        rows={3}
                                    />
                                    <InputError />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specification">Spesifikasi</Label>
                                    <Textarea
                                        id="specification"
                                        value={data.specification}
                                        onChange={(e) => setData('specification', e.target.value)}
                                        placeholder="Masukkan spesifikasi produk"
                                        rows={3}
                                    />
                                    <InputError />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="additional_info">Info(opsional)</Label>
                                    <Textarea
                                        id="additional_info"
                                        value={data.additional_info}
                                        onChange={(e) => setData('additional_info', e.target.value)}
                                        placeholder="Masukkan info produk"
                                        rows={3}
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
                                    <Input id="meta_title" value={data.meta_title ?? ''} onChange={(e) => setData('meta_title', e.target.value)} placeholder="Meta title untuk SEO" />
                                    <InputError message={errors?.meta_title} />
                                    <span className="text-xs text-gray-400">Judul yang akan muncul di hasil pencarian (50-60 karakter).</span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea id="meta_description" value={data.meta_description ?? ''} onChange={(e) => setData('meta_description', e.target.value)} placeholder="Deskripsi untuk SEO" rows={3} />
                                    <InputError message={errors?.meta_description} />
                                    <span className="text-xs text-gray-400">Deskripsi yang akan muncul di hasil pencarian (120-160 karakter).</span>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                    <Input id="meta_keywords" value={data.meta_keywords ?? ''} onChange={(e) => e.target.value} placeholder="Kata kunci (dipisahkan dengan koma)" />
                                    <InputError />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="og_image">Open Graph Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input id="og_image" placeholder="URL gambar untuk social sharing" className="flex-1" />
                                        <Button type="button" variant="outline">
                                            <Image className="mr-2 h-4 w-4" />
                                            Upload
                                        </Button>
                                    </div>
                                    <InputError />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image_alt">Image Alt Text</Label>
                                    <Input id="image_alt" value={data.image_alt ?? ''} onChange={(e) => setData('image_alt', e.target.value)} placeholder="Teks alternatif untuk gambar" />
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
