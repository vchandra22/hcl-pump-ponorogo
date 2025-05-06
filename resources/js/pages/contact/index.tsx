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

interface Contact {
    id: number;
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    business_hours: string;
    gmaps_embed_code: string;
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
    contacts: Contact[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contact Management',
        href: '/contacts',
    },
];

export default function ContactIndex() {
    const { contacts, status } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = contacts.filter(contact =>
            Object.values(contact).some(
                value =>
                    value &&
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredContacts(results);
    }, [searchTerm, contacts]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact Management" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Contact Management</h1>
                    </div>
                    {contacts.length < 1 && (
                        <Button asChild>
                            <Link href="/contacts/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Tambah Contact
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="min-h-5/6 flex  items-center justify-center pb-20">
                    {filteredContacts.length === 0 ? (
                        <EmptyState
                            title={searchTerm ? "Contact tidak ditemukan" : "Belum ada contact"}
                            description={searchTerm ?
                                "Tidak ada contact yang sesuai dengan pencarian Anda" :
                                "Mulai dengan menambahkan contact baru"}
                            action={
                                <Button asChild>
                                    <Link href="/contacts/create">
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah Contact
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
                                        <TableHead>Email</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead>Alamat</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredContacts.map((contact) => (
                                        <TableRow key={contact.id}>
                                            <TableCell className="font-medium">{contact.title}</TableCell>
                                            <TableCell>{contact.email}</TableCell>
                                            <TableCell>{contact.phone}</TableCell>
                                            <TableCell className="max-w-md truncate">{contact.address}</TableCell>
                                            <TableCell>
                                                {new Date(contact.created_at).toLocaleDateString('id-ID', {
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
                                                    <Link href={`/contacts/${contact.id}/edit`}>
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
                                                                Data contact akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={`/contacts/${contact.id}/delete`}
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
