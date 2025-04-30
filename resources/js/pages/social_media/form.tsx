import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Image } from 'lucide-react';

interface SocialMedia {
    id: number;
    icon_social_media: string | null;
    platform: string | null;
    title: string | null;
    social_media_link: string | null;
}

interface SocialMediaFormProps {
    social_media?: SocialMedia;
    errors?: Record<string, string>;
}

export default function SocialMediaForm({ social_media, errors }: SocialMediaFormProps) {
    const isEditMode = !!social_media?.id;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Social Media Management',
            href: '/social-media',
        },
        {
            title: isEditMode ? 'Edit Social Media' : 'Tambah Social Media',
            href: isEditMode ? route('social_media.edit', social_media.id) : route('social_media.create'),
        },
    ];

    const { data, setData, post, put, processing } = useForm<SocialMedia>({
        icon_social_media: social_media?.icon_social_media || null,
        platform: social_media?.platform || null,
        title: social_media?.title || null,
        social_media_link: social_media?.social_media_link || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('social_media.update', social_media.id));
        } else {
            post(route('social_media.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Social Media' : 'Tambah Social Media'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Social Media' : 'Tambah Social Media'}</h1>
                    </div>
                </div>

                <div>
                    <form id="social-media-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="icon_social_media">Icon Social Media</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="icon_social_media"
                                        value={data.icon_social_media || ''}
                                        onChange={(e) => setData('icon_social_media', e.target.value)}
                                        placeholder="Icon untuk social media"
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="outline">
                                        <Image className="mr-2 h-4 w-4" />
                                        Upload
                                    </Button>
                                </div>
                                <InputError message={errors?.icon_social_media} />
                                <span className="text-xs text-gray-400">
                                    Format yang didukung: JPEG, PNG, JPG, GIF, SVG. Maksimal 2MB.
                                </span>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform</Label>
                                <Input
                                    id="platform"
                                    value={data.platform || ''}
                                    onChange={(e) => setData('platform', e.target.value)}
                                    placeholder="Masukkan nama platform (misalnya: Instagram, Twitter, Facebook)"
                                />
                                <InputError message={errors?.platform} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul</Label>
                                <Input
                                    id="title"
                                    value={data.title || ''}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Masukkan judul atau nama akun"
                                />
                                <InputError message={errors?.title} />
                                <span className="text-xs text-gray-400">
                                    Judul yang akan ditampilkan (misalnya: @yourusername atau Your Company Name)
                                </span>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="social_media_link">Link Social Media</Label>
                                <Input
                                    id="social_media_link"
                                    value={data.social_media_link || ''}
                                    onChange={(e) => setData('social_media_link', e.target.value)}
                                    placeholder="Masukkan URL lengkap profil social media"
                                />
                                <InputError message={errors?.social_media_link} />
                                <span className="text-xs text-gray-400">
                                    Contoh: https://instagram.com/username atau https://twitter.com/username
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-6">
                            <Button
                                variant="outline"
                                type="button"
                                asChild
                            >
                                <Link href={route('social_media.index')}>Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
