import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { AlertCircle, Image as ImageIcon, Info } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import QuillEditor from '@/components/custom/quill-editor';
import { useEffect, useState } from 'react';

interface PrivacyPolicy {
    id?: number;
    privacy_policy: string;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image?: File | null;
    og_image_url?: string | null;
    image_alt: string | null;
}

interface PrivacyPolicyFormProps {
    privacyPolicy?: PrivacyPolicy;
    errors?: Record<string, string>;
}

export default function PrivacyPolicyForm({ privacyPolicy, errors }: PrivacyPolicyFormProps) {
    const isEditMode = !!privacyPolicy?.id;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Manajemen Kebijakan Privasi',
            href: route('privacy-policy.index'),
        },
        {
            title: isEditMode ? 'Edit Kebijakan Privasi' : 'Tambah Kebijakan Privasi',
            href: isEditMode ? route('privacy-policy.edit', privacyPolicy.id) : route('privacy-policy.create'),
        },
    ];

    const { data, setData, post, processing } = useForm<PrivacyPolicy>({
        privacy_policy: privacyPolicy?.privacy_policy || '',
        meta_title: privacyPolicy?.meta_title || null,
        meta_description: privacyPolicy?.meta_description || null,
        meta_keywords: privacyPolicy?.meta_keywords || null,
        og_image: null,
        og_image_url: privacyPolicy?.og_image
            ? `/storage/${privacyPolicy.og_image}`
            : null,
        image_alt: privacyPolicy?.image_alt || null,
        og_image_old: privacyPolicy?.og_image
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            post(route('privacy-policy.update', privacyPolicy.id));
        } else {
            post(route('privacy-policy.store'));
        }
    };

    const handleImageChange = (field: 'og_image', e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData(field, file);
            setData(`keep_${field}` as any, 'false');

            const previewUrl = URL.createObjectURL(file);
            setData(`${field}_url` as any, previewUrl);
        }
    };

    const handleRemoveImage = (field: 'og_image') => {
        setData(field, null);
        setData(`${field}_url` as any, undefined);
        setData(`keep_${field}` as any, 'false');
    };

    const renderImagePreview = (field: 'og_image') => {
        const url = data[`${field}_url`];
        const hasFile = data[field] instanceof File;

        if (!url && data[`keep_${field}`] === 'false') {
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
                            alt={`${field} preview`}
                            className="w-full h-auto max-h-72 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                            {data[field]?.name || 'Preview'}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Preview gambar baru</p>
                </div>
            );
        }

        if (url && isEditMode) {
            return (
                <div className="mt-2">
                    <div className="relative rounded-md border overflow-hidden max-w-lg">
                        <img
                            src={url}
                            alt={`Current ${field}`}
                            className="w-full h-auto max-h-72 object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                            }}
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

    const renderImageUpload = (
        field: 'og_image',
        label: string,
        description: string,
        accept = 'image/*'
    ) => {
        const error = errors?.[field];

        return (
            <div className="space-y-2">
                <Label htmlFor={field} className="flex items-center gap-2">
                    {label}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                                <p>{description}</p>
                                <p className="text-xs mt-1">Format yang didukung: JPEG, PNG, JPG, WEBP. Maksimal 2MB.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Label>

                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            type="file"
                            id={field}
                            onChange={(e) => handleImageChange(field, e)}
                            accept={accept}
                            className={cn(error && "border-destructive")}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById(field)?.click()}
                    >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        {data[`${field}_url`] ? 'Ganti' : 'Upload'}
                    </Button>
                    {isEditMode && data[`${field}_url`] && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleRemoveImage(field)}
                        >
                            Hapus
                        </Button>
                    )}
                </div>

                <InputError message={error} />

                {renderImagePreview(field)}

                <span className="text-xs text-gray-400">
                    {isEditMode ? 'Biarkan kosong untuk mempertahankan gambar saat ini' : description}
                </span>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Kebijakan Privasi' : 'Tambah Kebijakan Privasi'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Kebijakan Privasi' : 'Tambah Kebijakan Privasi'}</h1>
                    </div>
                </div>

                {errors && Object.keys(errors).some(key => !['privacy_policy'].includes(key)) && (
                    <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                        <div>
                            <p className="font-medium text-destructive">Harap perbaiki kesalahan di kedua tab sebelum mengirim</p>
                            <p className="text-sm text-muted-foreground">Terdapat kesalahan validasi di tab SEO & Meta</p>
                        </div>
                    </div>
                )}

                <div>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Konten</TabsTrigger>
                            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                        </TabsList>

                        <form id="privacy-policy-form" onSubmit={handleSubmit} className="space-y-6 mt-6">
                            <TabsContent value="content">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="mb-12">
                                        {mounted && (
                                            <QuillEditor
                                                id="privacy_policy"
                                                label="Kebijakan Privasi *"
                                                value={data.privacy_policy}
                                                onChange={(value) => setData('privacy_policy', value)}
                                                placeholder="Masukkan Kebijakan Privasi"
                                                error={errors?.privacy_policy}
                                                height="400px"
                                            />
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="seo">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="meta_title">Judul Meta</Label>
                                            <Input
                                                id="meta_title"
                                                value={data.meta_title || ''}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                className={cn(errors?.meta_title && "border-destructive")}
                                            />
                                            <InputError message={errors?.meta_title} />
                                            <p className="text-sm text-muted-foreground">
                                                Judul untuk mesin pencari (biarkan kosong untuk menggunakan judul default)
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_description">Deskripsi Meta</Label>
                                            <Textarea
                                                id="meta_description"
                                                value={data.meta_description || ''}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                className={cn(errors?.meta_description && "border-destructive")}
                                                rows={3}
                                            />
                                            <InputError message={errors?.meta_description} />
                                            <p className="text-sm text-muted-foreground">
                                                Deskripsi untuk mesin pencari (panjang optimal: 150-160 karakter)
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="meta_keywords">Kata Kunci Meta</Label>
                                            <Input
                                                id="meta_keywords"
                                                value={data.meta_keywords || ''}
                                                onChange={(e) => setData('meta_keywords', e.target.value)}
                                                className={cn(errors?.meta_keywords && "border-destructive")}
                                            />
                                            <InputError message={errors?.meta_keywords} />
                                            <p className="text-sm text-muted-foreground">
                                                Kata kunci untuk SEO yang dipisahkan dengan koma
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="image_alt">Teks Alt Gambar</Label>
                                            <Input
                                                id="image_alt"
                                                value={data.image_alt || ''}
                                                onChange={(e) => setData('image_alt', e.target.value)}
                                                className={cn(errors?.image_alt && "border-destructive")}
                                            />
                                            <InputError message={errors?.image_alt} />
                                            <p className="text-sm text-muted-foreground">
                                                Teks deskriptif untuk aksesibilitas dan SEO
                                            </p>
                                        </div>
                                    </div>

                                    {renderImageUpload(
                                        'og_image',
                                        'Gambar Open Graph',
                                        'Gambar yang ditampilkan saat dibagikan di media sosial'
                                    )}
                                </div>
                            </TabsContent>

                            <div className="flex justify-end gap-2 pt-6">
                                <Button
                                    variant="outline"
                                    type="button"
                                    asChild
                                >
                                    <Link href={route('privacy-policy.index')}>Batal</Link>
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
