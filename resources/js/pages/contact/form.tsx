import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputError from '@/components/input-error';
import { Image } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

interface Contact {
    id?: number;
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    business_hours: string;
    gmaps_embed_code: string;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image: string | null;
    image_alt: string | null;
}

interface ContactFormProps {
    contact?: Contact;
    errors?: Record<string, string>;
}

export default function ContactForm({ contact, errors }: ContactFormProps) {
    const isEditMode = !!contact?.id;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Contact Management',
            href: route('contact.index'),
        },
        {
            title: isEditMode ? 'Edit Contact' : 'Tambah Contact',
            href: isEditMode ? route('contact.edit', contact.id) : route('contact.create'),
        },
    ];

    const { data, setData, post, put, processing } = useForm<Contact>({
        title: contact?.title || '',
        description: contact?.description || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        address: contact?.address || '',
        business_hours: contact?.business_hours || '',
        gmaps_embed_code: contact?.gmaps_embed_code || '',
        meta_title: contact?.meta_title || '',
        meta_description: contact?.meta_description || '',
        meta_keywords: contact?.meta_keywords || '',
        og_image: contact?.og_image || '',
        image_alt: contact?.image_alt || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('contact.update', contact.id));
        } else {
            post(route('contact.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Contact' : 'Tambah Contact'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Contact' : 'Tambah Contact'}</h1>
                </div>

                <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content">Konten</TabsTrigger>
                        <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                    </TabsList>

                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <TabsContent value="content">
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    ['title', 'Judul Contact', 'Masukkan judul contact'],
                                    ['email', 'Email', 'Masukkan email'],
                                    ['phone', 'Nomor Telepon', 'Masukkan nomor telepon'],
                                    ['address', 'Alamat', 'Masukkan alamat lengkap'],
                                    ['business_hours', 'Jam Operasional', 'Contoh: Senin - Jumat, 08.00 - 17.00'],
                                ].map(([field, label, placeholder]) => (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field}>{label}</Label>
                                        <Input
                                            id={field}
                                            value={(data as any)[field]}
                                            onChange={(e) => setData(field as keyof Contact, e.target.value)}
                                            placeholder={placeholder}
                                        />
                                        <InputError message={(errors || {})[field as string]} />
                                    </div>
                                ))}

                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat"
                                        rows={4}
                                    />
                                    <InputError message={errors?.description} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gmaps_embed_code">Google Maps Embed</Label>
                                    <Textarea
                                        id="gmaps_embed_code"
                                        value={data.gmaps_embed_code}
                                        onChange={(e) => setData('gmaps_embed_code', e.target.value)}
                                        placeholder="Kode embed Google Maps"
                                        rows={3}
                                    />
                                    <InputError message={errors?.gmaps_embed_code} />
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
                            <Button variant="outline" type="button" asChild>
                                <Link href={route('contact.index')}>Batal</Link>
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
