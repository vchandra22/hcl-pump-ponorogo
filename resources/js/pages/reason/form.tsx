import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Reason {
    id?: string;
    title: string;
    description: string;
}

interface ReasonFormProps {
    reason?: Reason;
    errors?: Record<string, string>;
}

export default function ReasonForm({ reason, errors }: ReasonFormProps) {
    const isEditMode = !!reason?.id;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Reason Management',
            href: route('reasons.index'),
        },
        {
            title: isEditMode ? 'Edit Reason' : 'Add Reason',
            href: isEditMode ? route('reasons.edit', reason.id) : route('reasons.create'),
        },
    ];

    const { data, setData, post, put, processing } = useForm({
        title: reason?.title || '',
        description: reason?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('reasons.update', reason.id));
        } else {
            post(route('reasons.store'));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Reason' : 'Add Reason'} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Reason' : 'Add Reason'}</h1>
                    </div>
                </div>

                <div className="rounded-lg border p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter reason title"
                                    className={cn(errors?.title && "border-destructive")}
                                />
                                <InputError message={errors?.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter reason description"
                                    rows={5}
                                    className={cn(errors?.description && "border-destructive")}
                                />
                                <InputError message={errors?.description} />
                            </div>

                            {errors && Object.keys(errors).length > 0 && (
                                <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                                    <div>
                                        <p className="font-medium text-destructive">Please fix the errors before submitting</p>
                                        <p className="text-sm text-muted-foreground">There are validation errors that need to be addressed</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-6">
                            <Button
                                variant="outline"
                                type="button"
                                asChild
                            >
                                <Link href={route('reasons.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}