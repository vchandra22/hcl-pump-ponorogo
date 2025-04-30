import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Image } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface About {
    id?: number;
    title: string;
    description: string;
    image_company: string | null | undefined;
    meta_title: string | null | undefined;
    meta_description: string | null | undefined;
    meta_keywords: string | null | undefined;
    og_image: string | null | undefined;
    image_alt: string | null | undefined;
}

interface AboutFormProps {
    about?: About;
    errors?: Record<string, string>;
}

export default function AboutForm({ about, errors }: AboutFormProps) {
    const isEditMode = !!about?.id;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'About Us Management',
            href: route('about.index'),
        },
        {
            title: isEditMode ? 'Edit About Us' : 'Tambah About Us',
            href: isEditMode ? route('about.edit', about.id) : route('about.create'),
        },
    ];

    const { data, setData, post, put, processing } = useForm({
        title: about?.title || '',
        description: about?.description || '',
        image_company: about?.image_company || null,
        meta_title: about?.meta_title || null,
        meta_description: about?.meta_description || null,
        meta_keywords: about?.meta_keywords || null,
        og_image: about?.og_image || null,
        image_alt: about?.image_alt || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('about.update', about.id));
        } else {
            post(route('about.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit About Us' : 'Tambah About Us'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit About Us' : 'Tambah About Us'}</h1>
                    </div>
                </div>

                <div>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Konten</TabsTrigger>
                            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                        </TabsList>

                        <form id="about-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
                            <TabsContent value="content">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul About Us *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Masukkan judul About Us"
                                        />
                                        <InputError message={errors?.title} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Deskripsi *</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Masukkan deskripsi About Us"
                                            rows={5}
                                        />
                                        <InputError message={errors?.description} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image_company">Company Image URL</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="image_company"
                                                value={data.image_company || ''}
                                                onChange={(e) => setData('image_company', e.target.value)}
                                                placeholder="URL gambar perusahaan"
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="outline">
                                                <Image className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>
                                        <InputError message={errors?.image_company} />
                                        <span className="text-xs text-gray-400">
                                            Masukkan URL gambar perusahaan atau gunakan tombol upload untuk mengunggah gambar baru.
                                        </span>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="seo">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            value={data.meta_title || ''}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            placeholder="Meta title untuk SEO"
                                        />
                                        <InputError message={errors?.meta_title} />
                                        <span className="text-xs text-gray-400">
                                            Judul yang akan muncul di hasil pencarian (50-60 karakter).
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            value={data.meta_description || ''}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder="Deskripsi untuk SEO"
                                            rows={3}
                                        />
                                        <InputError message={errors?.meta_description} />
                                        <span className="text-xs text-gray-400">
                                            Deskripsi yang akan muncul di hasil pencarian (120-160 karakter).
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                        <Input
                                            id="meta_keywords"
                                            value={data.meta_keywords || ''}
                                            onChange={(e) => setData('meta_keywords', e.target.value)}
                                            placeholder="Kata kunci (dipisahkan dengan koma)"
                                        />
                                        <InputError message={errors?.meta_keywords} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="og_image">Open Graph Image URL</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="og_image"
                                                value={data.og_image || ''}
                                                onChange={(e) => setData('og_image', e.target.value)}
                                                placeholder="URL gambar untuk social sharing"
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="outline">
                                                <Image className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>
                                        <InputError message={errors?.og_image} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image_alt">Image Alt Text</Label>
                                        <Input
                                            id="image_alt"
                                            value={data.image_alt || ''}
                                            onChange={(e) => setData('image_alt', e.target.value)}
                                            placeholder="Teks alternatif untuk gambar"
                                        />
                                        <InputError message={errors?.image_alt} />
                                        <span className="text-xs text-gray-400">
                                            Teks alternatif untuk aksesibilitas dan SEO.
                                        </span>
                                    </div>
                                </div>
                            </TabsContent>

                            <div className="flex justify-end gap-2 pt-6">
                                <Button
                                    variant="outline"
                                    type="button"
                                    asChild
                                >
                                    <Link href={route('about.index')}>Batal</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}