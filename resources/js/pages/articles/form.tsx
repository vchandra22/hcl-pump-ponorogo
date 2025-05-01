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

interface Article {
    id?: number;
    title: string;
    summary: string;
    content: string;
    image_article: string | null;
    author: string;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image: string | null;
    image_alt: string | null;
}

interface ArticleFormProps {
    article?: Article;
    errors?: Record<string, string>;
}

export default function ArticleForm({ article, errors }: ArticleFormProps) {
    const isEditMode = !!article?.id;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Manajemen Artikel',
            href: route('articles.index'),
        },
        {
            title: isEditMode ? 'Edit Artikel' : 'Tambah Artikel',
            href: isEditMode ? route('articles.edit', article.id) : route('articles.create'),
        },
    ];

    const { data, setData, post, put, processing } = useForm<Article>({
        title: article?.title || '',
        summary: article?.summary || '',
        content: article?.content || '',
        image_article: article?.image_article || null,
        author: article?.author || '',
        meta_title: article?.meta_title || null,
        meta_description: article?.meta_description || null,
        meta_keywords: article?.meta_keywords || null,
        og_image: article?.og_image || null,
        image_alt: article?.image_alt || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('articles.update', article.id));
        } else {
            post(route('articles.store'));
        }
    };



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Artikel' : 'Tambah Artikel'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Artikel' : 'Tambah Artikel'}</h1>
                    </div>
                </div>

                <div>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Konten</TabsTrigger>
                            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                        </TabsList>

                        <form id="article-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
                            <TabsContent value="content">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul Artikel *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Masukkan judul artikel"
                                        />
                                        <InputError message={errors?.title} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="author">Penulis *</Label>
                                        <Input
                                            id="author"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            placeholder="Nama penulis artikel"
                                        />
                                        <InputError message={errors?.author} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="summary">Ringkasan Artikel *</Label>
                                        <Textarea
                                            id="summary"
                                            value={data.summary}
                                            onChange={(e) => setData('summary', e.target.value)}
                                            placeholder="Ringkasan singkat artikel yang akan ditampilkan di daftar artikel"
                                            rows={3}
                                        />
                                        <InputError message={errors?.summary} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content">Konten Artikel *</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Tulis konten artikel lengkap di sini..."
                                            rows={10}
                                            className="min-h-[200px]"
                                        />
                                        <InputError message={errors?.content} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image_article">Gambar Artikel *</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="image_article"
                                                value={data.image_article || ''}
                                                onChange={(e) => setData('image_article', e.target.value)}
                                                placeholder="URL gambar artikel"
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="outline">
                                                <Image className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>
                                        <InputError message={errors?.image_article} />
                                        <span className="text-xs text-gray-400">
                                            Gambar utama yang akan ditampilkan di artikel
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
                                            Judul yang akan muncul di hasil pencarian (50-60 karakter). Jika kosong, akan menggunakan judul artikel.
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
                                            Deskripsi yang akan muncul di hasil pencarian (120-160 karakter). Jika kosong, akan menggunakan ringkasan artikel.
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
                                        <span className="text-xs text-gray-400">
                                            Gambar yang ditampilkan saat artikel dibagikan di media sosial. Jika kosong, akan menggunakan gambar artikel utama.
                                        </span>
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
                                    <Link href={route('articles.index')}>Batal</Link>
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
