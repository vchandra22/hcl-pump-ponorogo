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
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface Homepage {
    id: number;
    title: string;
    description: string;
    banner_image: string | null;
    created_at: string;
    updated_at: string;
    meta?: {
        meta_title: string | null;
        meta_description: string | null;
        meta_keywords: string | null;
        og_image: string | null;
        image_alt: string | null;
    };
    status: string;
}

interface PageProps {
    homepages: Homepage[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Homepage Management',
        href: '/homepage',
    },
];

export default function HomepageIndex() {
    const { homepages, status } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredHomepages, setFilteredHomepages] = useState<Homepage[]>(homepages);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = homepages.filter((homepage) =>
            Object.values(homepage).some((value) => value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())),
        );
        setFilteredHomepages(results);
    }, [searchTerm, homepages]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Management" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Homepage Management</h1>
                    </div>
                    {homepages.length < 1 && (
                        <Button asChild>
                            <Link href="/homepage/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Tambah Homepage
                            </Link>
                        </Button>
                    )}
                </div>

                <div>
                    {filteredHomepages.length === 0 ? (
                        <EmptyState
                            title={searchTerm ? 'Homepage tidak ditemukan' : 'Belum ada homepage'}
                            description={
                                searchTerm ? 'Tidak ada homepage yang sesuai dengan pencarian Anda' : 'Mulai dengan menambahkan homepage baru'
                            }
                            action={
                                <Button asChild>
                                    <Link href="/homepage/create">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah Homepage
                                    </Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead>Tanggal Diperbarui</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredHomepages.map((homepage) => (
                                        <TableRow key={homepage.id}>
                                            <TableCell className="font-medium">{homepage.title}</TableCell>
                                            <TableCell className="max-w-md truncate">{homepage.description}</TableCell>
                                            <TableCell>
                                                {new Date(homepage.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(homepage.updated_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell className="flex justify-start gap-2">
                                                <Button variant="ghost" size="icon" asChild className="hover:bg-neutral-100">
                                                    <Link href={`/homepage/${homepage.id}/edit`}>
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
                                                                Data homepage akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={`/homepage/${homepage.id}/delete`}
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
