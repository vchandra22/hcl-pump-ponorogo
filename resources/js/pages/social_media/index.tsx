import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

interface SocialMedia {
    id: number;
    icon_social_media: string;
    platform: string;
    title: string;
    social_media_link: string;
    status: string;
}

interface PageProps {
    social_media: SocialMedia[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Social Media Management',
        href: '/social-media',
    },
];

export default function SocialMediaIndex() {
    const { social_media, status } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSocialMedia, setFilteredSocialMedia] = useState<SocialMedia[]>(social_media);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = social_media.filter((item) =>
            Object.values(item).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredSocialMedia(results);
    }, [searchTerm, social_media]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Media Management" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Social Media Management</h1>
                    <Button asChild>
                        <Link href="/social-media/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Social Media
                        </Link>
                    </Button>
                </div>

                <div className="w-full md:w-1/3">
                    <Input
                        type="text"
                        placeholder="Cari platform, judul, atau link..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div>
                    {filteredSocialMedia.length === 0 ? (
                        <EmptyState
                            title={searchTerm ? 'Social Media tidak ditemukan' : 'Belum ada social media'}
                            description={
                                searchTerm
                                    ? 'Tidak ada data social media yang cocok dengan pencarian Anda.'
                                    : 'Mulai dengan menambahkan social media baru.'
                            }
                            action={
                                <Button asChild>
                                    <Link href="/social-media/create">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah Social Media
                                    </Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Platform</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Link</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSocialMedia.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.platform}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>
                                                <a href={item.social_media_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {item.social_media_link}
                                                </a>
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/social-media/${item.id}/edit`}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                        >
                                                            <Trash2Icon className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Data social media ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={`/social-media/${item.id}/delete`}
                                                                    method="delete"
                                                                    as="button"
                                                                    preserveScroll
                                                                >
                                                                    Hapus
                                                                </Link>
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
