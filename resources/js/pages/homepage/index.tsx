import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Define the Homepage interface
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
}

// Define the props interface
interface HomepageIndexProps {
    homepages: Homepage[];
    message?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Homepage Management',
        href: '/homepage',
    },
];

export default function HomepageIndex({ homepages, message }: HomepageIndexProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Show success message toast if available
    if (message) {
        toast({
            title: 'Notifikasi',
            description: message,
            duration: 3000,
        });
    }

    const confirmDelete = (id: number) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            router.delete(`/homepage/${deleteId}/delete`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setDeleteId(null);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Homepage Management</h1>
                    {homepages.length < 1 && (
                     <Button asChild>
                        <Link href="/homepage/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Homepage
                        </Link>
                    </Button>
                       
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Homepage</CardTitle>
                        <CardDescription>Kelola semua homepage website Anda dari sini.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Tanggal Dibuat</TableHead>
                                    <TableHead>Tanggal Diperbarui</TableHead>
                                    <TableHead className="w-24 text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {homepages.length > 0 ? (
                                    homepages.map((homepage) => (
                                        <TableRow key={homepage.id}>
                                            <TableCell className="font-medium">{homepage.title}</TableCell>
                                            <TableCell className="max-w-md truncate">{homepage.description}</TableCell>
                                            <TableCell>{new Date(homepage.created_at).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell>{new Date(homepage.updated_at).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Buka menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/homepage/${homepage.id}/edit`}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => confirmDelete(homepage.id)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Hapus
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-8 text-center">
                                            Belum ada homepage yang dibuat.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Homepage</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus homepage ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
