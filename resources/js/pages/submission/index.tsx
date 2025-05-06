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
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { EyeIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface Submission {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    submissions: Submission[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Submission Management',
        href: '/submission',
    },
];

export default function Index() {
    const { submissions, status } = usePage().props as unknown as PageProps;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(submissions);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = submissions.filter(item =>
            Object.values(item).some(
                value =>
                    value &&
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredSubmissions(results);
    }, [searchTerm, submissions]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Submission Management" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Submission Management</h1>
                    </div>
                    <Button asChild>
                        <Link href={route('submission.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Submission
                        </Link>
                    </Button>
                </div>

                <div className="w-full md:w-1/3">
                    <Input
                        type="text"
                        placeholder="Cari submission..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="min-h-5/6 flex  items-center justify-center pb-20">
                    {filteredSubmissions.length === 0 ? (
                        <EmptyState
                            title={searchTerm ? "Submission tidak ditemukan" : "Belum ada Submission"}
                            description={searchTerm ?
                                "Tidak ada submission yang sesuai dengan pencarian Anda" :
                                "Mulai dengan menambahkan submission baru"}
                            action={
                                <Button asChild>
                                    <Link href={route('submission.create')}>
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah Submission
                                    </Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead>Pesan</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSubmissions.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.phone}</TableCell>
                                            <TableCell className="max-w-md truncate"> {item.message.length > 50 ? item.message.slice(0, 50) + '...' : item.message}</TableCell>
                                            <TableCell>
                                                {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                        className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                    >
                                                        <Link href={route('submission.show', item.id)}>
                                                            <EyeIcon className="h-4 w-4" />
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
                                                                    Data Submission akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction asChild>
                                                                    <Link
                                                                        href={route('submission.delete', item.id)}
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
                                                </div>
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
