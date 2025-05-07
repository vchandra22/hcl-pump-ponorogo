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

interface PrivacyPolicy {
    id: number;
    privacy_policy: string;
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
    privacyPolicy: PrivacyPolicy[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kebijakan Privasi',
        href: '/privacy-policy',
    },
];

export default function PrivacyPolicyIndex() {
    const { privacyPolicy, status } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPolicies, setFilteredPolicies] = useState<PrivacyPolicy[]>(privacyPolicy);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = privacyPolicy.filter((policy) =>
            Object.values(policy).some((value) => {
                if (value && typeof value === 'string') {
                    return value.toLowerCase().includes(searchTerm.toLowerCase());
                }
                return false;
            })
        );
        setFilteredPolicies(results);
    }, [searchTerm, privacyPolicy]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kebijakan Privasi" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Kebijakan Privasi</h1>
                    </div>
                    {privacyPolicy.length < 1 && (
                        <Button asChild>
                            <Link href="/privacy-policy/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Tambah Baru
                            </Link>
                        </Button>
                    )}
                </div>

                <div>
                    {filteredPolicies.length === 0 ? (
                        <div className="flex min-h-svh items-center justify-center pb-20">
                            <EmptyState
                                title={searchTerm ? 'Tidak dapat menemukan kebijakan privasi' : 'Belum ada kebijakan privasi'}
                                description={
                                    searchTerm
                                        ? 'Tidak ada kebijakan privasi yang sesuai dengan pencarian Anda'
                                        : 'Mulai dengan menambahkan kebijakan privasi baru'
                                }
                                action={
                                    <Button asChild>
                                        <Link href="privacy-policy/create">
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
                                        <TableHead>Kebijakan Privasi</TableHead>
                                        <TableHead>Meta Title</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead>Tanggal Diperbarui</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPolicies.map((policy, index) => (
                                        <TableRow key={policy.id}>
                                            <TableCell className="max-w-md truncate">
                                                <div>{ policy.privacy_policy }</div>
                                            </TableCell>
                                            <TableCell>{policy.meta?.meta_title || '-'}</TableCell>
                                            <TableCell>
                                                {new Date(policy.created_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(policy.updated_at).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell className="flex justify-start gap-2">
                                                <Button variant="ghost" size="icon" asChild className="hover:bg-neutral-100">
                                                    <Link href={`/privacy-policy/${policy.id}/edit`}>
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
                                                                Data kebijakan privasi akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={`/privacy-policy/${policy.id}/delete`}
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
