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

interface TermsCondition {
    id: number;
    terms_and_condition: string;
    created_at: string;
    updated_at: string;
    meta: {
        meta_title: string | null;
        meta_description: string | null;
        meta_keywords: string | null;
        og_image: string | null;
        image_alt: string | null;
    };
}

interface PageProps {
    termsConditions: TermsCondition[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Terms & Conditions',
        href: '/terms-conditions',
    },
];

export default function TermsIndex() {
    const { termsConditions, status } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTerms, setFilteredTerms] = useState<TermsCondition[]>(termsConditions);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = termsConditions.filter((term) =>
            Object.values(term).some((value) => {
                if (value && typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm.toLowerCase());
                }
                return false;
            })
        );
        setFilteredTerms(results);
    }, [searchTerm, termsConditions]);

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Terms & Conditions" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
                    </div>
                    {termsConditions.length < 1 && (
                        <Button asChild>
                            <Link href="/terms-conditions/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Tambah Baru
                            </Link>
                        </Button>
                    )}
                </div>

                <div>
                    {filteredTerms.length === 0 ? (
                        <div className="flex min-h-svh items-center justify-center pb-20">
                            <EmptyState
                                title={searchTerm ? 'Tidak dapat menemukan terms & conditions' : 'Belum ada terms & conditions'}
                                description={
                                    searchTerm
                                        ? 'Tidak ada terms & conditions yang sesuai dengan pencarian Anda'
                                        : 'Mulai dengan menambahkan terms & conditions baru'
                                }
                                action={
                                    <Button asChild>
                                        <Link href="terms-conditions/create">
                                            <PlusIcon className="mr-2 h-4 w-4" />
                                            Tambah Baru
                                        </Link>
                                    </Button>
                                }
                            />
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Terms & Condition</TableHead>
                                        <TableHead>Meta Title</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead>Tanggal Diperbarui</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTerms.map((term, index) => (
                                        <TableRow key={term.id}>
                                            <TableCell className="w-12">{index + 1}</TableCell>
                                            <TableCell className="max-w-md truncate">{truncateText(term.terms_and_condition)}</TableCell>
                                            <TableCell>{term.meta?.meta_title || '-'}</TableCell>
                                            <TableCell>
                                                {new Date(term.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(term.updated_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell className="flex justify-start gap-2">
                                                <Button variant="ghost" size="icon" asChild className="hover:bg-neutral-100">
                                                    <Link href={`/terms-conditions/${term.id}/edit`}>
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
                                                                Data terms & conditions akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={`/terms-conditions/${term.id}`}
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
