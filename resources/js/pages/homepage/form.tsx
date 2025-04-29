import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the Homepage interface
interface Homepage {
    id?: number;
    title: string;
    description: string;
    banner_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image: string | null;
    image_alt: string | null;
}

interface HomepageFormProps {
    homepage?: Homepage;
    errors?: Record<string, string>;
}

export default function HomepageForm({ homepage, errors }: HomepageFormProps) {
    const isEditMode = !!homepage?.id;

    // Define breadcrumbs based on whether we're editing or creating
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Homepage Management',
            href: route('homepage.index'),
        },
        {
            title: isEditMode ? 'Edit Homepage' : 'Tambah Homepage',
            href: isEditMode ? route('homepage.edit', homepage.id) : route('homepage.create'),
        },
    ];

    // Set up form with default values
    const { data, setData, post, put, processing } = useForm<Homepage>({
        title: homepage?.title || '',
        description: homepage?.description || '',
        banner_image: homepage?.banner_image || null,
        meta_title: homepage?.meta_title || null,
        meta_description: homepage?.meta_description || null,
        meta_keywords: homepage?.meta_keywords || null,
        og_image: homepage?.og_image || null,
        image_alt: homepage?.image_alt || null,
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('homepage.update', homepage.id));
        } else {
            post(route('homepage.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Homepage' : 'Tambah Homepage'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route('homepage.index')}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Homepage' : 'Tambah Homepage'}</h1>
                    </div>

                    <Button type="submit" form="homepage-form">
                        <Save className="mr-2 h-4 w-4" />
                        Simpan
                    </Button>
                </div>

                <div>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Konten</TabsTrigger>
                            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                        </TabsList>

                        <form id="homepage-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
                            <TabsContent value="content">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul Homepage *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Masukkan judul homepage"
                                        />
                                        <InputError message={errors?.title} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Deskripsi *</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Masukkan deskripsi homepage"
                                            rows={5}
                                        />
                                        <InputError message={errors?.description} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="banner_image">Banner Image URL</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="banner_image"
                                                value={data.banner_image || ''}
                                                onChange={(e) => setData('banner_image', e.target.value)}
                                                placeholder="URL gambar banner"
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="outline">
                                                <Image className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>
                                        <InputError message={errors?.banner_image} />
                                        <span className="text-xs text-gray-400">
                                            Masukkan URL gambar banner atau gunakan tombol upload untuk mengunggah gambar baru.
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
                                    <Link href={route('homepage.index')}>Batal</Link>
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
