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
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ImageOff, PencilIcon, PlusIcon, Trash2Icon, CalendarIcon, UserIcon } from 'lucide-react';
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
        const results = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredArticles(results);
    }, [searchTerm, articles]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Artikel" />
            <Toaster />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

                {filteredArticles.length === 0 ? (
                    <div className="flex min-h-5/6 items-center justify-center pb-20">
                        <EmptyState
                            title={searchTerm ? 'Artikel tidak ditemukan' : 'Belum ada artikel'}
                            description={
                                searchTerm ? 'Tidak ada artikel yang cocok dengan pencarian Anda.' : 'Mulai dengan menambahkan artikel baru.'
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
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredArticles.map((article) => (
                            <Card key={article.id} className="overflow-hidden p-0">
                                <div className="h-72 bg-gray-100 relative">
                                    {article.image_article ? (
                                        <img
                                            src={`/storage/${article.image_article}`}
                                            alt={article.image_alt || article.title}
                                            width="100"
                                            height="100"
                                            className="h-full w-full object-cover overflow-hidden"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <ImageOff className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-medium line-clamp-1 text-lg mb-1">{article.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2 text-sm mb-3">{article.summary}</p>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <div className="flex items-center gap-1">
                                            <UserIcon className="h-3 w-3" />
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{formatDate(article.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={route('articles.edit', article.id)}>
                                                <PencilIcon className="h-4 w-4 mr-1" />
                                                Edit
                                            </Link>
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                                    <Trash2Icon className="h-4 w-4 mr-1" />
                                                    Hapus
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
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
