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
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface About {
    id: number;
    title: string;
    description: string;
    image_company: string | null | undefined;
    created_at: string;
    updated_at: string;
    meta?: {
        meta_title: string | null | undefined;
        meta_description: string | null | undefined;
        meta_keywords: string | null | undefined;
        og_image: string | null | undefined;
        image_alt: string | null | undefined;
    };
    status: string;
}

interface PageProps {
    about: About[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Informasi Tentang Kami',
        href: '/about-us',
    },
];

export default function AboutUsIndex() {
    const { about, status } = usePage().props as unknown as PageProps;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAbout, setFilteredAbout] = useState<About[]>(about);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = about.filter(item =>
            Object.values(item).some(
                value =>
                    value &&
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredAbout(results);
    }, [searchTerm, about]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Informasi Tentang Kami" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Informasi Tentang Kami</h1>
                    </div>
                    {about.length < 1 && (
                        <Button asChild>
                            <Link href="/about-us/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Tambah About Us
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="min-h-5/6 flex  items-center justify-center pb-20">
                    {filteredAbout.length === 0 ? (
                        <EmptyState
                            title={searchTerm ? "Tidak dapat menemukan data" : "Belum ada Konten Tentang Kami"}
                            description={searchTerm ?
                                "Tidak ada About Us yang sesuai dengan pencarian Anda" :
                                "Mulai dengan menambahkan About Us baru"}
                            action={
                                <Button asChild>
                                    <Link href="/about-us/create">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah About Us
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
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAbout.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell className="max-w-md truncate">{item.description}</TableCell>
                                            <TableCell>
                                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(item.updated_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell className="flex justify-start gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    className="hover:bg-neutral-100"
                                                >
                                                    <Link href={`/about-us/${item.id}/edit`}>
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
                                                                Data About Us akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={`/about-us/${item.id}/delete`}
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
