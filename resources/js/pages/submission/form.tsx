import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';


interface SubmissionFormProps {
    errors?: Record<string, string>;
}

export default function Form({ errors }: SubmissionFormProps) {
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
            title: 'Tambah Submission',
            href: route('submission.create'),
        },
    ];

    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('submission.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Submission" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">Tambah Submission</h1>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                />
                                <InputError message={errors?.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Masukkan alamat email"
                                />
                                <InputError message={errors?.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Telepon *</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Masukkan nomor telepon"
                                />
                                <InputError message={errors?.phone} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Pesan *</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Masukkan pesan Anda"
                                    rows={5}
                                />
                                <InputError message={errors?.message} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-6">
                            <Button
                                variant="outline"
                                type="button"
                                asChild
                            >
                                <Link href={route('submission.index')}>Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}