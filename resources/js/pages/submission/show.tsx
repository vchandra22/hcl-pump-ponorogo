import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, MailIcon, MessageSquareIcon, PhoneIcon, UserIcon } from 'lucide-react';

interface Submission {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at: string;
    updated_at: string;
}

interface ShowProps {
    submission: Submission;
}

export default function Show({ submission }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Submission Management',
            href: route('submission.index'),
        },
        {
            title: 'Detail Submission',
            href: route('submission.show', submission.id),
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Submission" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">Detail Submission</h1>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={route('submission.index')}>
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Kembali
                        </Link>
                    </Button>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Informasi Submission</CardTitle>
                        <CardDescription>
                            Dikirim pada {formatDate(submission.created_at)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center text-muted-foreground">
                                    <UserIcon className="h-4 w-4 mr-2" />
                                    <span>Nama</span>
                                </div>
                                <p className="font-medium text-lg">{submission.name}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center text-muted-foreground">
                                    <MailIcon className="h-4 w-4 mr-2" />
                                    <span>Email</span>
                                </div>
                                <p className="font-medium text-lg">{submission.email}</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center text-muted-foreground">
                                    <PhoneIcon className="h-4 w-4 mr-2" />
                                    <span>Nomor Telepon</span>
                                </div>
                                <p className="font-medium text-lg">{submission.phone}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <div className="space-y-2">
                                <div className="flex items-center text-muted-foreground">
                                    <MessageSquareIcon className="h-4 w-4 mr-2" />
                                    <span>Pesan</span>
                                </div>
                                <div className="p-4  rounded-md">
                                    <p className="whitespace-pre-wrap">{submission.message}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}