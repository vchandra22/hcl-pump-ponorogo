import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Image as ImageIcon, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SocialMedia {
    id?: number;
    icon_social_media: string | File | null;
    platform: string | null;
    title: string | null;
    social_media_link: string | null;
    icon_social_media_url?: string;
    keep_image?: string;
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

    const { data, setData, post, processing } = useForm<SocialMedia>({
        icon_social_media: social_media?.icon_social_media || null,
        platform: social_media?.platform || null,
        title: social_media?.title || null,
        social_media_link: social_media?.social_media_link || null,
        icon_social_media_url: social_media?.icon_social_media
            ? `/storage/${social_media.icon_social_media}`
            : undefined,
        keep_image: 'true'
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('icon_social_media', file);
            setData('keep_image', 'false');

            const previewUrl = URL.createObjectURL(file);
            setData('icon_social_media_url', previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setData('icon_social_media', null);
        setData('icon_social_media_url', undefined);
        setData('keep_image', 'false');
    };

    const renderImagePreview = () => {
        const url = data.icon_social_media_url;
        const hasFile = data.icon_social_media instanceof File;

        if (data.icon_social_media === null) {
            return (
                <div className="mt-2 p-4 border rounded-md bg-gray-50 text-center">
                    <p className="text-sm text-gray-500">Tidak ada gambar</p>
                </div>
            );
        }

        if (hasFile && url) {
            return (
                <div className="mt-2">
                    <div className="relative rounded-md border overflow-hidden max-w-lg">
                        <img
                            src={url}
                            alt="Social media preview"
                            className="w-full h-auto max-h-72 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                            {data.icon_social_media?.name || 'Preview'}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Preview gambar baru</p>
                </div>
            );
        }

        if (!hasFile && url && isEditMode) {
            return (
                <div className="mt-2">
                    <div className="relative rounded-md border overflow-hidden max-w-lg">
                        <img
                            src={url}
                            alt="Current social media icon"
                            className="w-full h-auto max-h-72 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                            Gambar saat ini
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Gambar yang tersimpan</p>
                </div>
            );
        }

        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        if (data.icon_social_media instanceof File) {
            formData.append('icon_social_media', data.icon_social_media);
        } else if (data.icon_social_media === null) {
            formData.append('keep_image', 'false');
        } else if (isEditMode) {
            formData.append('keep_image', data.keep_image || 'true');
        }

        formData.append('platform', data.platform || '');
        formData.append('title', data.title || '');
        formData.append('social_media_link', data.social_media_link || '');

        if (isEditMode && social_media?.id) {
            post(route('social_media.update', social_media.id), {
                data: formData,
                forceFormData: true,
                preserveScroll: true,
            });
        } else {
            post(route('social_media.store'), {
                data: formData,
                forceFormData: true,
                preserveScroll: true,
            });
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

                            <div className="space-y-2">
                                <Label htmlFor="icon_social_media" className="flex items-center gap-2">
                                    Icon Social Media
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-sm">
                                                <p>Icon utama untuk social media</p>
                                                <p className="text-xs mt-1">Format yang didukung: JPEG, PNG, JPG, WEBP. Maksimal 2MB.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Label>

                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <Input
                                            type="file"
                                            id="icon_social_media"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className={cn(errors?.icon_social_media && "border-destructive")}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('icon_social_media')?.click()}
                                    >
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        {data.icon_social_media_url ? 'Ganti' : 'Upload'}
                                    </Button>
                                    {isEditMode && data.icon_social_media_url && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleRemoveImage}
                                        >
                                            Hapus
                                        </Button>
                                    )}
                                </div>

                                <InputError message={errors?.icon_social_media} />

                                {renderImagePreview()}

                                <span className="text-xs text-gray-400">
                                    {isEditMode ? 'Biarkan kosong untuk mempertahankan gambar saat ini' : 'Icon utama untuk social media'}
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
