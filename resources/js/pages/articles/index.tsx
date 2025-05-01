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
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ImageOff, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    author: string;
    image_article: string;
    image_alt?: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    articles: Article[];
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Artikel',
        href: '/articles',
    },
];

export default function ArticlesIndex() {
    const { articles, status } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    useEffect(() => {
        const results = articles.filter((article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.summary.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredArticles(results);
    }, [searchTerm, articles]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Artikel" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Artikel</h1>
                    <Button asChild>
                        <Link href={route('articles.create')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Artikel
                        </Link>
                    </Button>
                </div>

                <div className="w-full md:w-1/3">
                    <Input
                        type="text"
                        placeholder="Cari judul, penulis, atau ringkasan..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div>
                    {filteredArticles.length === 0 ? (
                        <EmptyState
                            title={searchTerm ? 'Artikel tidak ditemukan' : 'Belum ada artikel'}
                            description={
                                searchTerm
                                    ? 'Tidak ada artikel yang cocok dengan pencarian Anda.'
                                    : 'Mulai dengan menambahkan artikel baru.'
                            }
                            action={
                                <Button asChild>
                                    <Link href={route('articles.create')}>
                                        <PlusIcon className="mr-2 h-4 w-4" />
                                        Tambah Artikel
                                    </Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Gambar</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Penulis</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredArticles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                {article.image_article ? (
                                                    <img
                                                        src={`/storage/${article.image_article}`}
                                                        alt={article.image_alt || article.title}
                                                        className="h-16 w-24 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-16 w-24">
                                                        <ImageOff className="text-gray-400 h-8 w-8" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{article.title}</div>
                                                <div className="text-sm text-muted-foreground line-clamp-2">{article.summary}</div>
                                            </TableCell>
                                            <TableCell>{article.author}</TableCell>
                                            <TableCell>
                                                {new Date(article.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={route('articles.edit', article.id)}>
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
                                                                Artikel ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction asChild>
                                                                <Link
                                                                    href={route('articles.delete', article.id)}
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
