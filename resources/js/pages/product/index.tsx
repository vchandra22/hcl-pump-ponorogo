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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import formatDate from '@/utils/formatDate';
import formatRupiah from '@/utils/formatRupiah';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Produk',
        href: '/products',
    },
];

interface Status {
    success: string;
    failed: string;
}

interface PageProps {
    products: Product[];
    status: Status;
}

export default function ProductIndex({ products, status }: PageProps) {
    
    useEffect(() => {
        if(status.success) toast.success(status.success);
        if(status.failed) toast.success(status.failed);
    }, [status])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Produk" />
            <Toaster/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
                    </div>
                    <Button asChild>
                        <Link href="/products/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Produk
                        </Link>
                    </Button>
                </div>

                {products.length > 0 ? (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Produk</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead>Tanggal Diperbarui</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((item: Product) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell className="max-w-md truncate">{formatRupiah(item.price)}</TableCell>
                                        <TableCell>{formatDate(item.created_at)}</TableCell>
                                        <TableCell>{formatDate(item.updated_at)}</TableCell>
                                        <TableCell>
                                            <Badge variant="default">{item.is_active ? 'Active' : 'Non-active'}</Badge>
                                        </TableCell>
                                        <TableCell className="flex justify-start gap-2">
                                            <Button variant="ghost" size="icon" asChild className="hover:bg-neutral-100">
                                                <Link href={`/products/${item.id}/edit`}>
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700">
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
                                                            <Link href={`/products/${item.id}/delete`} method="delete" as="button" preserveScroll>
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
                ) : (
                    <EmptyState
                        title={'Belum ada produk'}
                        description={'Mulai dengan menambahkan produk baru'}
                        action={
                            <Button asChild>
                                <Link href="/products/create">
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Tambah Produk 
                                </Link>
                            </Button>
                        }
                    />
                )}
            </div>
        </AppLayout>
    );
}
